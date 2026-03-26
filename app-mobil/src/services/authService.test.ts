// 🔥 MOCKS (SIEMPRE ARRIBA DE TODO)
jest.mock('react-native', () => ({
    Platform: { OS: 'web' },
}));

jest.mock('expo-secure-store', () => ({
    getItemAsync: jest.fn(),
    setItemAsync: jest.fn(),
    deleteItemAsync: jest.fn(),
}));

jest.mock('@src/services/http.service', () => ({
    httpFetch: jest.fn(),
}));

jest.mock('@src/config/environment', () => ({
    environment: {
        apiUrl: 'http://localhost:8000',
    },
}));

// 👇 DESPUÉS DE LOS MOCKS
import { login } from './auth.service';

// mock global de fetch
global.fetch = jest.fn();

describe('login service', () => {

    test('login exitoso devuelve datos', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                access_token: 'abc123',
                user: { id: 1, email: 'test@mail.com' }
            }),
        });

        const result = await login('test@mail.com', '123456');

        expect(result.access_token).toBe('abc123');
    });

    test('login falla y lanza error del backend', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json: async () => ({
                detail: 'Credenciales inválidas'
            }),
        });

        await expect(
            login('test@mail.com', 'wrong')
        ).rejects.toThrow('Credenciales inválidas');
    });

    test('login falla con error desconocido', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            json: async () => ({}),
        });

        await expect(
            login('test@mail.com', 'wrong')
        ).rejects.toThrow('Error desconocido');
    });

});