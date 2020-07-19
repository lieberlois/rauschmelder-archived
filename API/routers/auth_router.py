from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from starlette import status

from auth import authenticate_user, ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, \
    create_user, get_current_user
from database import get_db
from schemas import Token, UserRegister, User

router = APIRouter()


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        user = await authenticate_user(db, form_data.username, form_data.password)
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=error.__str__(),
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post("/register")
async def register_user(user_data: UserRegister, db: Session = Depends(get_db)):
    try:
        user = await create_user(db, user_data)
    except IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
