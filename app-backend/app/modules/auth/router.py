from fastapi import APIRouter
from app.schemas.auth import LoginRequest, LoginResponse
from app.modules.auth.service import login_service

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    return await login_service(data.email, data.password)
