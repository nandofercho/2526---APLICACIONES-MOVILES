from fastapi import HTTPException
from app.modules.auth.queries import get_usuario_by_email
from app.utils.security import verify_password
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