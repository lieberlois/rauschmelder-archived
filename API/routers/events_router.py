from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
import schemas
from auth import get_current_user
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
        .filter(models.Event.start_date < datetime.now()) \
        .filter(models.Event.end_date > datetime.now()) \
        .all()

    return res


@router.get("/validate/{event_id}")
def validate_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    event: models.Event = db.query(models.Event).get(event_id)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found.")
    if not event.start_date <= datetime.now() <= event.end_date:
        return None
    return event


@router.delete("/{event_id}", description="Only available for admins")
def delete_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.isadmin:
        raise HTTPException(status_code=401, detail="You have to be an admin to perform this action.")

    db_event: models.Event = db.query(models.Event).get(event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    if db_event.end_date < datetime.now():
        raise HTTPException(status_code=400, detail="Event has already passed")

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
