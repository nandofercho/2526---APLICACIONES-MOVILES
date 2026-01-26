from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings

def crear_jwt(payload: dict) -> str:
    expiracion = datetime.now(timezone.utc) + timedelta(
        minutes=settings.jwt_exp_minutes
    )

    payload_con_exp = payload.copy()
    payload_con_exp["exp"] = expiracion

    return jwt.encode(
        payload_con_exp,
        settings.jwt_secret,
        algorithm=settings.jwt_algorithm
    )

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token invalido"
        )
