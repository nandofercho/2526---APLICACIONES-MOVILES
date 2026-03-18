import { httpFetch } from '@src/services/http.service';

/* ---------- TIPOS ---------- */
export interface Usuario {
    cusuario: number;
    identificacion: string;
    nombre: string;
    apellido: string;
    email: string;
    estado: number;
    rol: string;
}

/* ---------- FOTO ---------- */
export const obtenerImagenApi = async () => {
     return await httpFetch(`/user/imagen`, {
        method: 'GET',
    });
}

export async function subirImagenApi(formData: FormData): Promise<void> {
    return await httpFetch('/user/imagen', {
        method: 'POST',
        body: formData,
    });
}

/* ---------- LISTADO ---------- */
export async function listarUsuarios(): Promise<Usuario[]> {
    return await httpFetch('/user/listado', {
        method: 'GET',
    });
}

/* ---------- ACTIVAR / INACTIVAR ---------- */
export async function cambiarEstadoUsuario(
    cusuario: number,
    estado: number
): Promise<void> {
    return await httpFetch('/user/estado', {
        method: 'PUT',
        body: JSON.stringify({
            cusuario,
            estado,
        }),
    });
}
