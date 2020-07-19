from typing import Optional

from pydantic import BaseModel, Field


class DrinkBase(BaseModel):
    drink: str = Field(..., example="Schokogoiß")

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class DrinkCreate(DrinkBase):
    pass


class Drink(DrinkBase):
    id: int
    name: str

    class Config:
        orm_mode: True


class ThrowUpBase(BaseModel):
    pass


class ThrowUp(ThrowUpBase):
    id: int
    name: str

    class Config:
        orm_mode: True
        min_anystr_length = 1
        max_anystr_length = 99


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class BaseUser(BaseModel):
    username: str = Field(..., example="SampleUser123")


class UserRegister(BaseUser):
    password: str

    class Config:
        min_anystr_length = 4
        max_anystr_length = 99


class UserInDB(BaseUser):
    password: str


class User(BaseUser):
    id: int

    class Config:
        orm_mode = True
