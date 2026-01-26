import { obtenerToken } from '@src/services/session.service';
import { environment } from '@src/config/environment';

export async function httpFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = await obtenerToken();

    const headers: any = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${environment.apiUrl}${url}`, {
        ...options,
        headers,
    });

    // Leer body siempre
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || 'Error en la solicitud');
    }

    return data;
}
