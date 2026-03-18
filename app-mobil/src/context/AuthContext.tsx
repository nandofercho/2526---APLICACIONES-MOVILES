import { createContext, useContext, useEffect, useState } from 'react';
import { obtenerToken, eliminarToken } from '@src/services/session.service';
import { jwtDecode } from 'jwt-decode';

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
        const cargarSesion = async () => {
            try {
                const token = await obtenerToken();

                if (token) {
                    console.log('Token encontrado');

                    const decoded: any = jwtDecode(token);

                    setUsuario({
                        id: decoded.cusuario,
                        nombre: decoded.nombre,
                        apellido: decoded.apellido,
                        identificacion: decoded.identificacion,
                        email: decoded.email,
                        rol: decoded.rol,
                    });
                }
            } catch (error) {
                console.log('Error cargando sesión', error);
            } finally {
                setCargando(false);
            }
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

export function useAuth() {
    return useContext(AuthContext);
}