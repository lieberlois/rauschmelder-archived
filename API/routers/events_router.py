from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
from auth import get_current_user
from database import get_db
from schemas import User, EventCreate

router = APIRouter()


# TODO: What exactly do we do with events? Enter a code? Select from a list? Also: validation (start/end date)


@router.get("/list")
def list_events(db: Session = Depends(get_db)):
    # TODO: Remove this route
    return db.query(models.Event).all()


@router.get("/")
def list_current_events(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db \
        .query(models.Event) \
        .filter(models.Event.start_date < datetime.now()) \
        .filter(models.Event.end_date > datetime.now()) \
        .all()


@router.get("/{event_id}")
def validate_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    event = db.query(models.Event).get(event_id)
    if event is None:
        raise HTTPException(status_code=404, detail="Event not found.")
    return event


@router.get("/{event_id}")
def drinks_for_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # TODO: Only your own drinks should be shown here, but do we even need this route?
    # A route like "my drinks" would probably be enough for the stats page
    db_event: models.Event = db.query(models.Event).get(event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    return db_event.drinks


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
