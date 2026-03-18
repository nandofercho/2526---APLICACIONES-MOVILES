from pydantic import BaseModel

class MarcacionInsert(BaseModel):
    latitud: float
    longitud: float

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
