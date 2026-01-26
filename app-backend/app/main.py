from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db_pool, close_db_pool
from app.middleware.request import LogRequestMiddleware
from app.modules.auth.router import router as auth_router
from app.modules.marcacion.router import router as marcacion_router
from app.modules.user.router import router as user_router

# FastAPI
app = FastAPI(title="Asistencia")
app.add_middleware(LogRequestMiddleware)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(marcacion_router)
app.include_router(user_router)

# Startup / Shutdown
@app.on_event("startup")
async def startup():
    await init_db_pool(settings)

@app.on_event("shutdown")
async def shutdown():
    await close_db_pool()
