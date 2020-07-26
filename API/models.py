from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
import datetime

from database import Base


class Drink(Base):
    __tablename__ = "drinks"

    id = Column("id", Integer, primary_key=True, index=True)
    user_id = Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
    drink = Column("drink", String)
    timestamp = Column("timestamp", DateTime, default=datetime.datetime.utcnow)


class Throw_Up(Base):
    __tablename__ = "throw_up"

    id = Column("id", Integer, primary_key=True, index=True)
    user_id = Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
    timestamp = Column("timestamp", DateTime, default=datetime.datetime.utcnow)


class User(Base):
    __tablename__ = "users"
    id = Column("id", Integer, primary_key=True, index=True)
    username = Column("username", String, unique=True, nullable=False)
    password = Column("password", String, nullable=False)
