from fastapi import HTTPException, status
from app.modules.marcacion.queries import (
    get_marcacion,
    insertar_marcacion,
    actualizar_marcacion,
    eliminar_marcacion
)

async def listado_marcacion(cusuario: int, finicio: str, ffin: str):
    x = await get_marcacion(cusuario, finicio, ffin)
    print(x)
    return x

async def crear_marcacion(cusuario: int):
    await insertar_marcacion(cusuario)
    return {"mensaje": "Marcación registrada"}

async def modificar_marcacion(cusuario: int, fecha_anterior: str, fecha_nueva: str):
    filas = await actualizar_marcacion(cusuario, fecha_anterior, fecha_nueva)

    if filas == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Marcación no encontrada"
        )

    return {"mensaje": "Marcación actualizada"}

async def borrar_marcacion(cusuario: int, fecha: str):
    filas = await eliminar_marcacion(cusuario, fecha)

    if filas == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Marcación no encontrada"
        )

    return {"mensaje": "Marcación eliminada"}
