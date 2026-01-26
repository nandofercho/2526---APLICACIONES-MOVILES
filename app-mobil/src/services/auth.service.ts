import { httpFetch } from '@src/services/http.service';
import { environment } from '@src/config/environment';

/* ---------- LOGIN ---------- */
export async function login(email: string, password: string) {
    const response = await fetch(`${environment.apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || 'Error desconocido');
    }

    return data;
}

/* ---------- REGISTRO ---------- */
export async function register(
    identificacion: string,
    nombre: string,
    apellido: string,
    email: string,
    password: string
): Promise<void> {

    const response = await fetch(`${environment.apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            identificacion,
            nombre,
            apellido,
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || 'Error al registrar usuario');
    }
}

/* ---------- CAMBIAR PASSWORD ---------- */
export async function changePassword(
    passwordActual: string,
    passwordNuevo: string
): Promise<void> {
    return await httpFetch('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({
            password_actual: passwordActual,
            password_nuevo: passwordNuevo,
        }),
    });
}
