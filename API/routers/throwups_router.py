from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
from auth import get_current_user
from database import get_db
from schemas import User

router = APIRouter()


@router.get("/list")
def list_throwups(db: Session = Depends(get_db)):
    return db.query(models.Throw_Up).all()


@router.post("/")
def create_throwup(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_throwup = models.Throw_Up(user_id=current_user.id)
    db.add(db_throwup)
    db.commit()
    db.refresh(db_throwup)
    return db_throwup


@router.get("/")
def throwup_count_for_user(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.Throw_Up).filter(models.Throw_Up.id == current_user.id).count()
