from fastapi import APIRouter,  Depends
from app.schemas.auth import LoginRequest, LoginResponse, CreateUserRequest
from app.modules.auth.service import login_service, crear_usuario
from app.utils.jwt import get_current_user
from app.schemas.auth import ChangePasswordRequest
from app.modules.auth.service import cambiar_password

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    return await login_service(data.email, data.password)

@router.post("/change-password")
async def change_password(
    data: ChangePasswordRequest,
    user=Depends(get_current_user)
):
    return await cambiar_password(
        user["cusuario"],
        data.password_actual,
        data.password_nuevo
    )

@router.post("/register")
async def register_user(
    data: CreateUserRequest
):
    return await crear_usuario(
        data.identificacion,
        data.nombre,
        data.apellido,
        data.email,
        data.password,
        data.estado,
        data.crol
    )