from typing import Optional

from pydantic import BaseModel, Field
from datetime import datetime


class DrinkBase(BaseModel):
    drink: str = Field(..., example="Schokogoiß")
    event_id: int = Field(..., example=1)

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class DrinkCreate(DrinkBase):
    pass


class Drink(DrinkBase):
    id: int
    name: str
    user_id: int = Field(..., example=1)

    class Config:
        orm_mode = True


class ThrowUpBase(BaseModel):
    event_id: int = Field(..., example=1)

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class ThrowUpCreate(ThrowUpBase):
    pass


class ThrowUp(ThrowUpBase):
    id: int
    name: str

    class Config:
        orm_mode = True


class EventBase(BaseModel):
    # TODO: Start and End-Date
    name: str = Field(..., example="Hütte 2020")
    start_date: datetime
    end_date: datetime

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class EventCreate(EventBase):
    pass


class Event(EventBase):
    id: int

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class BaseUser(BaseModel):
    username: str = Field(..., example="SampleUser123")


class UserRegister(BaseUser):
    password: str = Field(..., example="password123")

    class Config:
        min_anystr_length = 4
        max_anystr_length = 99


class UserInDB(BaseUser):
    password: str


class User(BaseUser):
    id: int
    isadmin: bool

    class Config:
        orm_mode = True


class AcquireAdmin(BaseModel):
    secret: str
