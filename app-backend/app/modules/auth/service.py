from fastapi import HTTPException, status
from app.modules.auth.queries import (
    get_usuario_by_email,
    get_usuario_password,
    actualizar_password,
    existe_usuario_email,
    existe_usuario_identificacion,
    insertar_usuario_con_rol
)
from app.utils.security import verify_password, hash_password
from app.utils.jwt import crear_jwt

async def login_service(email: str, password: str) -> dict:
    usuario = await get_usuario_by_email(email)

    if not usuario:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    if usuario["estado"] != 1:
        raise HTTPException(status_code=403, detail="Usuario inactivo")

    if not verify_password(password, usuario["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    payload = {
        "cusuario": usuario["cusuario"],
        "nombre": usuario["nombre"],
        "apellido": usuario["apellido"],
        "identificacion": usuario["identificacion"],
        "email": usuario["email"],
        "rol": usuario["rol"]
    }

    return {
        "access_token": crear_jwt(payload)
    }

async def cambiar_password(cusuario: int, password_actual: str, password_nuevo: str):
    usuario = await get_usuario_password(cusuario)

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )

    if not verify_password(password_actual, usuario["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Contraseña actual incorrecta"
        )

    nuevo_hash = hash_password(password_nuevo)

    await actualizar_password(cusuario, nuevo_hash)

    return {"mensaje": "Contraseña actualizada correctamente"}

async def crear_usuario(
    identificacion: str,
    nombre: str,
    apellido: str,
    email: str,
    password: str,
    estado: int,
    crol: int
):

    if await existe_usuario_identificacion(identificacion):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="la identificación ya existe"
        )

    if await existe_usuario_email(email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="el email ya existe"
        )

    password_hash = hash_password(password)

    cusuario = await insertar_usuario_con_rol(
        identificacion,
        nombre,
        apellido,
        email,
        password_hash,
        estado,
        crol
    )

    return {
        "mensaje": "Usuario creado correctamente",
        "cusuario": cusuario
    }