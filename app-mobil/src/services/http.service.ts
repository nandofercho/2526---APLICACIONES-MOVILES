import { obtenerToken, eliminarToken } from '@src/services/session.service';
import { environment } from '@src/config/environment';
import Toast from 'react-native-toast-message';

export async function httpFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = await obtenerToken();

    const isFormData = options.body instanceof FormData;

    const headers: any = {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(options.headers || {}),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${environment.apiUrl}${url}`, {
        ...options,
        headers,
        body: isFormData
            ? options.body
            : typeof options.body === 'string'
                ? options.body
                : options.body
                    ? JSON.stringify(options.body)
                    : undefined,
    });

    let data: any = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    /* 🚨 MANEJO GLOBAL 401 */
    if (response.status === 401) {

        Toast.show({
            type: 'error',
            text1: 'Sesión expirada',
        });

        // limpiar sesión
        await eliminarToken();

        throw new Error('Sesión expirada');
    }

    if (!response.ok) {
        throw new Error(data?.detail || 'Error en la solicitud');
    }

    return data;
}