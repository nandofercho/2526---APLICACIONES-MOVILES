import { httpFetch } from '@src/services/http.service';

/* ---------- TIPOS ---------- */
export interface Marcacion {
    id: number;
    fecha: string;
    hora: string;
}

/* ---------- LISTADO ---------- */
export async function listarMarcaciones(
    cusuario: number,
    finicio: string,
    ffin: string
): Promise<Marcacion[]> {
    return await httpFetch('/marcacion/listado', {
        method: 'POST',
        body: JSON.stringify({
            cusuario,
            finicio,
            ffin,
        }),
    });
}

/* ---------- INSERTAR ---------- */
export async function registrarMarcacionApi(
    latitud: number,
    longitud: number
): Promise<void> {
    return await httpFetch('/marcacion/insertar', {
        method: 'POST',
        body: JSON.stringify({
            latitud,
            longitud,
        }),
    });
}

/* ---------- ELIMINAR ---------- */
export async function eliminarMarcacionApi(
    fecha: string,
    hora: string
): Promise<void> {
    return await httpFetch('/marcacion/eliminar', {
        method: 'POST',
        body: JSON.stringify({
            fecha,
            hora,
        }),
    });
}
