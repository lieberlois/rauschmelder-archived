from pydantic import BaseModel, Field


class DrinkBase(BaseModel):
    name: str = Field(..., example="Schokofabi")
    drink: str = Field(..., example="Schokogoiß")


class DrinkCreate(DrinkBase):
    pass


class Drink(DrinkBase):
    id: int

    class Config:
        orm_mode: True


class ThrowUpBase(BaseModel):
    name: str = Field(..., example="Schokofabi")


class ThrowUpCreate(ThrowUpBase):
    pass


class ThrowUp(ThrowUpBase):
    id: int

    class Config:
        orm_mode: True
