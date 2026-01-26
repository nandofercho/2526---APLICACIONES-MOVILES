from pydantic import BaseModel

class ChangeUserEstadoRequest(BaseModel):
    cusuario: int
    estado: int
