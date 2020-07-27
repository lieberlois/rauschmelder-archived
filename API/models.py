from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
import datetime

from sqlalchemy.orm import relationship

from database import Base


class Drink(Base):
    __tablename__ = "drinks"

    id = Column("id", Integer, primary_key=True, index=True)
    drink = Column("drink", String)
    timestamp = Column("timestamp", DateTime, default=datetime.datetime.utcnow)
    user_id = Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
    event_id = Column("event_id", Integer, ForeignKey("events.id"), nullable=False)


class Throwup(Base):
    __tablename__ = "throwups"

    id = Column("id", Integer, primary_key=True, index=True)
    user_id = Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
    timestamp = Column("timestamp", DateTime, default=datetime.datetime.utcnow)
    event_id = Column("event_id", Integer, ForeignKey("events.id"), nullable=False)


class User(Base):
    __tablename__ = "users"
    
    id = Column("id", Integer, primary_key=True, index=True)
    username = Column("username", String, unique=True, nullable=False)
    password = Column("password", String, nullable=False)


class Event(Base):
    __tablename__ = "events"

    id = Column("id", Integer, primary_key=True, index=True)
    name = Column("name", String, nullable=False)
    drinks = relationship("Drink", backref="drinks", lazy=False)
    throwups = relationship("Throwup", backref="throwups", lazy=False)



