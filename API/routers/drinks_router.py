from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
from auth import get_current_user
from database import get_db
from schemas import DrinkCreate, User

router = APIRouter()


@router.get("/list")
def list_drinks(db: Session = Depends(get_db)):
    # TODO: Remove this route
    return db.query(models.Drink).all()


@router.get("/")
def drinks_for_user(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # TODO: This is very very ugly!
    db_events: List[models.Event] = db.query(models.Event).all()
    res = []
    for event in db_events:
        drinks_per_user = dict()
        for drink in event.drinks:
            if drink.user_id == current_user.id:
                if drink.drink in drinks_per_user.keys():
                    drinks_per_user[drink.drink] += 1
                else:
                    drinks_per_user[drink.drink] = 1

        result = []
        for key in drinks_per_user.keys():
            result.append({"drink": key, "amount": drinks_per_user[key]})
        if len(result) > 0:
            res.append({"event_id": event.id, "event_name": event.name, "drinks": result})

    return res


@router.post("/")
def create_drink(drink: DrinkCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_event = db.query(models.Event).get(drink.event_id)
    if db_event is None:
        raise HTTPException(status_code=404, detail="Event not found")

    drink_dict = drink.dict()
    drink_dict["user_id"] = current_user.id
    db_drink = models.Drink(**drink_dict)
    db.add(db_drink)
    db.commit()
    db.refresh(db_drink)
    return db_drink
