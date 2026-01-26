from pydantic import BaseModel

class MarcacionListado(BaseModel):
    cusuario: int
    finicio: str
    ffin: str

class MarcacionUpdate(BaseModel):
    fecha_anterior: str
    fecha_nueva: str

class MarcacionDelete(BaseModel):
    fecha: str
    hora: str
