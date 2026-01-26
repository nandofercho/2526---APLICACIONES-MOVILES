import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const TOKEN_KEY = 'access_token';

export async function guardarToken(token: string) {
    if (Platform.OS === 'web') {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
}

export async function obtenerToken() {
    if (Platform.OS === 'web') {
        return localStorage.getItem(TOKEN_KEY);
    } else {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    }
}

export async function eliminarToken() {
    if (Platform.OS === 'web') {
        localStorage.removeItem(TOKEN_KEY);
    } else {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
}
