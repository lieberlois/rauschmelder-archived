from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
from auth import get_current_user
from database import get_db
from schemas import User, ThrowUpCreate

router = APIRouter()


@router.get("/list")
def list_throwups(db: Session = Depends(get_db)):
    return db.query(models.Throwup).all()


@router.post("/")
def create_throwup(throwup: ThrowUpCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_event: models.Event = db.query(models.Event).get(throwup.event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    db_throwup = models.Throwup(user_id=current_user.id, event_id=db_event.id)
    db.add(db_throwup)
    db.commit()
    db.refresh(db_throwup)
    return db_throwup


@router.get("/")
def throwup_count_for_user(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.Throwup).filter(models.Throwup.id == current_user.id).count()
