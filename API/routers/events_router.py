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


@router.get("/{event_id}")
def drinks_for_event(event_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_event: models.Event = db.query(models.Event).get(event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    return db_event.drinks


@router.post("/")
def create_event(event: EventCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.isadmin:
        raise HTTPException(status_code=401, detail="You have to be an admin to perform this action.")
    event_dict = event.dict()
    db_event = models.Event(**event_dict)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event
