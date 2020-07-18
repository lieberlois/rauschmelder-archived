from sqlalchemy import Numeric, Column, Integer, String, DateTime, CheckConstraint, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from database import Base
import uuid


class Drink(Base):
    __tablename__ = "exams"

    id = Column("id", Integer, primary_key=True, index=True)
    # Add necessary Columns hereP
