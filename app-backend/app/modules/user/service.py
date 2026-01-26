from fastapi import HTTPException, status
from app.modules.user.queries import (
    listar_usuarios,
    existe_usuario_cusuario,
    actualizar_estado_usuario
)

async def listado_usuarios():
    return await listar_usuarios()

async def cambiar_estado_usuario(cusuario: int, estado: int):

    if not await existe_usuario_cusuario(cusuario):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no existe"
        )

    if estado not in (0, 1):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Estado inválido"
        )

    await actualizar_estado_usuario(cusuario, estado)

    return {"mensaje": "Estado del usuario actualizado correctamente"}
