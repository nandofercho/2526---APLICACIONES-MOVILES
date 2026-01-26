from fastapi import APIRouter, Depends
from app.utils.jwt import get_current_user
from app.schemas.user import ChangeUserEstadoRequest
from app.modules.user.service import listado_usuarios, cambiar_estado_usuario

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/listado")
async def listado_user(user=Depends(get_current_user)):
    # luego aquí puedes validar rol admin
    return await listado_usuarios()

@router.put("/estado")
async def cambiar_estado(
    data: ChangeUserEstadoRequest,
    user=Depends(get_current_user)
):
    return await cambiar_estado_usuario(
        data.cusuario,
        data.estado
    )