import { createContext, useContext, useEffect, useState } from 'react';
import { obtenerToken, eliminarToken } from '@src/services/session.service';

interface Usuario {
    id?: number;
    nombre?: string;
    apellido?: string;
    identificacion?: string;
    email?: string;
    rol?: string;
}

interface AuthContextType {
    usuario: Usuario | null;
    cargando: boolean;
    cerrarSesion: () => Promise<void>;
    setUsuario: (user: Usuario | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        // Al iniciar la app, revisamos si hay sesión
        const cargarSesion = async () => {
            const token = await obtenerToken();

            if (token) {
                // 👉 luego aquí decodificaremos el JWT
                console.log('Token encontrado');
            }

            setCargando(false);
        };

        cargarSesion();
    }, []);

    const cerrarSesion = async () => {
        await eliminarToken();
        setUsuario(null);
    };

    return (
        <AuthContext.Provider
            value={{
                usuario,
                setUsuario,
                cargando,
                cerrarSesion,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar auth fácilmente
export function useAuth() {
    return useContext(AuthContext);
}
