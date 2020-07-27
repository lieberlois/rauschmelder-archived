import os

from dotenv import find_dotenv, load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

import models
from auth import get_current_user
from database import get_db
from schemas import User

router = APIRouter()
load_dotenv(find_dotenv())
ADMIN_SECRET = os.getenv("RAUSCHMELDER_ADMIN_SECRET")


@router.post("/acquireadmin")
async def acquire_admin_status(
        secret: str,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    if not ADMIN_SECRET == secret:
        raise HTTPException(status_code=401, detail="Invalid secret!")

    db_user: models.User = db.query(models.User).get(current_user.id)
    db_user.isadmin = True
    db.commit()
    db.refresh(db_user)
    return db_user

