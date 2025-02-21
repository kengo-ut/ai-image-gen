from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.router import imggen_router

app = FastAPI()

app.include_router(imggen_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"],
)
