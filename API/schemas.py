from pydantic import BaseModel, Field


class DrinkBase(BaseModel):
    name: str = Field(..., example="Schokofabi")
    drink: str = Field(..., example="Schokogoiß")

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class DrinkCreate(DrinkBase):
    pass


class Drink(DrinkBase):
    id: int

    class Config:
        orm_mode: True


class ThrowUpBase(BaseModel):
    name: str = Field(..., example="Schokofabi")

    class Config:
        min_anystr_length = 1
        max_anystr_length = 99


class ThrowUpCreate(ThrowUpBase):
    pass


class ThrowUp(ThrowUpBase):
    id: int

    class Config:
        orm_mode: True
