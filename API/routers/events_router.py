from datetime import datetime, timezone
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy_utc import utcnow

import models
import schemas
from auth import get_current_user
from constants import ALLOWED_DRINKS
from database import get_db
from schemas import User, EventCreate

router = APIRouter()


@router.get("/list", response_model=List[schemas.Event], description="Only available for admins")
def list_events(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.isadmin:
        raise HTTPException(status_code=401, detail="You have to be an admin to perform this action.")
    return db.query(models.Event).order_by(models.Event.start_date.desc()).all()


@router.get("/", response_model=List[schemas.Event])
def list_current_events(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    res: List[models.Event] = db \
        .query(models.Event) \
        .filter(models.Event.start_date < utcnow()) \
        .filter(models.Event.end_date > utcnow()) \
        .all()

    return res


# This code can and should be simplified by implementing easier navigation in the Drink model
@router.get("/leaderboard/{event_id}/{amount}")
def event_stats(event_id: int, amount: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if event_id == -1:
        return None
    db_event: models.Event = db.query(models.Event).get(event_id)
    if db_event is None:
        return None
    if not (db_event.start_date <= datetime.now(timezone.utc) <= db_event.end_date):
        return None

    user_ids = [drink.user_id for drink in db_event.drinks]
    id_name_mapping = {}

    for user_id in user_ids:
        if user_id in id_name_mapping.keys():
            continue
        user: models.User = db.query(models.User).get(user_id)
        id_name_mapping[user_id] = user.username

    # id_name_mapping is something like {1: 'LieberLois', 2: 'Schokofabi'}
    result = {drink: {id_name_mapping[user_id]: 0 for user_id in user_ids} for drink in ALLOWED_DRINKS}
    # result is something like {'kirschgoiß': {'LieberLois': 0}, 'bier': {'LieberLois': 0}, 'shot': {'LieberLois': 0}}

    for drink in db_event.drinks:
        result[drink.drink][id_name_mapping[drink.user_id]] += 1

    # Now sort descending
    for drink in result.keys():
        sorted_entries = sorted(result[drink].items(), key=lambda x: x[1], reverse=True)[:amount]
        result[drink] = [{"name": key, "amount": value} for [key, value] in sorted_entries if value > 0]

    # result now looks like {'kirschgoiß': [{"name":"LieberLois","amount":1},{"name":"Schokofabi","amount":0}], ... }
    return result


@router.get("/validate/{event_id}")
def validate_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    event: models.Event = db.query(models.Event).get(event_id)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found.")
    if not (event.start_date <= datetime.now(timezone.utc) <= event.end_date):
        return None
    return event


@router.delete("/{event_id}", description="Only available for admins")
def delete_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.isadmin:
        raise HTTPException(status_code=401, detail="You have to be an admin to perform this action.")

    db_event: models.Event = db.query(models.Event).get(event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    if db_event.end_date <= datetime.now(timezone.utc):
        raise HTTPException(status_code=400, detail="Event has already passed")

    for drink in db_event.drinks:  # Cascade delete
        db.delete(drink)

    db.delete(db_event)
    db.commit()


@router.post("/", description="Only available for admins")
def create_event(event: EventCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.isadmin:
        raise HTTPException(status_code=401, detail="You have to be an admin to perform this action.")
    if not event.start_date < event.end_date:
        raise HTTPException(status_code=400, detail="start_date must be before end_date")
    event_dict = event.dict()
    db_event = models.Event(**event_dict)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
