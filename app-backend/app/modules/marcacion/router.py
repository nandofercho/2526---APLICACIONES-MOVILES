from fastapi import APIRouter, Depends, Query
from app.utils.jwt import get_current_user
from app.schemas.marcacion import (
    MarcacionUpdate,
    MarcacionDelete,
    MarcacionListado
)
from app.modules.marcacion.service import (
    listado_marcacion,
    crear_marcacion,
    modificar_marcacion,
    borrar_marcacion
)

router = APIRouter(prefix="/marcacion", tags=["marcacion"])

@router.post("/listado")
async def post_listado_marcacion(
    data: MarcacionListado,
    user=Depends(get_current_user)
):
    return await listado_marcacion(
        data.cusuario,
        data.finicio,
        data.ffin
    )

@router.post("/insertar")
async def post_marcacion(user=Depends(get_current_user)):
    return await crear_marcacion(user["cusuario"])

@router.put("/modificar")
async def put_marcacion(
    data: MarcacionUpdate,
    user=Depends(get_current_user)
):
    return await modificar_marcacion(
        user["cusuario"],
        data.fecha_anterior,
        data.fecha_nueva
    )

@router.post("/eliminar")
async def delete_marcacion(
    data: MarcacionDelete,
    user=Depends(get_current_user)
):
    return await borrar_marcacion(
        user["cusuario"],
        data.fecha,
        data.hora
    )
