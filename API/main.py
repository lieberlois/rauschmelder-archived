from typing import List

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
import models
from schemas import DrinkCreate, ThrowUpCreate

app = FastAPI()
models.Base.metadata.create_all(bind=engine)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/drinks")
def list_drinks(db: Session = Depends(get_db)):
    return db.query(models.Drink).all()


@app.get("/drinks/{username}")
def drinks_for_user(username: str, db: Session = Depends(get_db)):
    db_drinks: List[models.Drink] = db.query(models.Drink).filter(models.Drink.name == username).all()
    drinks_per_user = dict()
    for drink in db_drinks:
        if drink.name not in drinks_per_user.keys():
            drinks_per_user[drink.name] = dict()

        if drink.drink in drinks_per_user[drink.name].keys():
            drinks_per_user[drink.name][drink.drink] += 1
        else:
            drinks_per_user[drink.name][drink.drink] = 1

    return drinks_per_user


@app.post("/drinks")
def create_drink(drink: DrinkCreate, db: Session = Depends(get_db)):
    db_drink = models.Drink(**drink.dict())
    db.add(db_drink)
    db.commit()
    db.refresh(db_drink)
    return db_drink


@app.get("/throwups")
def list_throwups(db: Session = Depends(get_db)):
    return db.query(models.Throw_Up).all()


@app.post("/throwups")
def create_throwup(throwup: ThrowUpCreate, db: Session = Depends(get_db)):
    db_throwup = models.Throw_Up(**throwup.dict())
    db.add(db_throwup)
    db.commit()
    db.refresh(db_throwup)
    return db_throwup


if __name__ == '__main__':
    # Use this for debugging purposes only, otherwise start with "uvicorn main:app --reload"
    uvicorn.run(app, host="127.0.0.1", port=8000)
