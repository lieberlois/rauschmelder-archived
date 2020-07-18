from sqlalchemy import Column, Integer, String,DateTime
import datetime

from database import Base


class Drink(Base):
    __tablename__ = "drinks"

    id = Column("id", Integer, primary_key=True, index=True)
    name = Column("name",String )
    drink = Column("drink", String)
    timestamp = Column("timestamp", DateTime, default=datetime.datetime.utcnow)
