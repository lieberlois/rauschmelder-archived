import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db
import models
from schemas import DrinkCreate

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


@app.get("/")
def list_drinks(db: Session = Depends(get_db)):
    return db.query(models.Drink).all()


@app.post("/")
def create_drink(drink: DrinkCreate, db: Session = Depends(get_db)):
    db_drink = models.Drink(**drink.dict())
    db.add(db_drink)
    db.commit()
    db.refresh(db_drink)
    return db_drink


if __name__ == '__main__':
    # Use this for debugging purposes only, otherwise start with "uvicorn main:app --reload"
    uvicorn.run(app, host="127.0.0.1", port=8000)
