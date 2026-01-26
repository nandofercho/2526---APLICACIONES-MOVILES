from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    access_token: str

class ChangePasswordRequest(BaseModel):
    password_actual: str
    password_nuevo: str

class CreateUserRequest(BaseModel):
    identificacion: str
    nombre: str
    apellido: str
    email: EmailStr
    password: str
    estado: int = 1
    crol: int = 2
