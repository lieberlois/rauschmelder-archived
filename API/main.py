import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine, get_db
from routers import auth_router, drinks_router, throwups_router, events_router

app = FastAPI(debug=True)
models.Base.metadata.create_all(bind=engine)

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router.router,
    prefix="/auth",
    tags=["Authentication"],
    dependencies=[Depends(get_db)]
)

app.include_router(
    events_router.router,
    prefix="/events",
    tags=["Events"],
    dependencies=[Depends(get_db)]
)

app.include_router(
    drinks_router.router,
    prefix="/drinks",
    tags=["Drinks"],
    dependencies=[Depends(get_db)]
)

app.include_router(
    throwups_router.router,
    prefix="/throwups",
    tags=["Throw Ups"],
    dependencies=[Depends(get_db)]
)


if __name__ == '__main__':
    # Use this for debugging purposes only, otherwise start with "uvicorn main:app --reload"
    uvicorn.run(app, host="127.0.0.1", port=8000)
