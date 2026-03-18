import base64
import os
from fastapi import APIRouter, Depends, UploadFile, File, Form
from app.utils.jwt import get_current_user
from app.schemas.user import ChangeUserEstadoRequest
from app.modules.user.service import listado_usuarios, cambiar_estado_usuario

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/listado")
async def listado_user(
    user=Depends(get_current_user)
):
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

@router.get("/imagen")
async def obtener_imagen(
    user=Depends(get_current_user)
):
    # Nombre del archivo basado en el ID del usuario
    filename = f"{user["cusuario"]}.jpg"

    # Ruta donde se almacena la imagen
    filepath = os.path.join("uploads/users", filename)

    # Si no existe la imagen, se retorna null
    if not os.path.exists(filepath):
        return {
            "imagen": None
        }

    # Leer el archivo en binario
    with open(filepath, "rb") as f:
        contenido = f.read()

    # Convertir el contenido a Base64
    base64_str = base64.b64encode(contenido).decode("utf-8")

    # Retornar la imagen codificada
    return {
        "imagen": base64_str
    }

@router.post("/imagen")
async def subir_imagen(
    imagen: UploadFile = File(...),
    user=Depends(get_current_user)
):
    print(imagen.content_type)
    print(imagen.filename)
    
    # nombre archivo
    filename = imagen.filename

    # leer contenido
    contenido = await imagen.read()
    
    # guardar archivo (ejemplo local)
    with open(f"uploads/users/{filename}", "wb") as f:
        f.write(contenido)

    return {
        "mensaje": "Estado del usuario actualizado correctamente"
    }