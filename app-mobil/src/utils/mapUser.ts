// src/utils/mapUser.ts
export const mapUser = (apiUser: any) => {
  return {
    id: apiUser.id,
    nombre: apiUser.nombre,
    edad: calcularEdad(apiUser.fnacimiento),
  };
};

function calcularEdad(fecha: string): number {
  const nacimiento = new Date(fecha);
  const hoy = new Date();
  return hoy.getFullYear() - nacimiento.getFullYear();
}