import { View, Text, TextInput, Pressable, Image, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { login } from '@src/services/auth.service';
import { guardarToken } from '@src/services/session.service';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@src/context/AuthContext';
import type { JwtPayload } from 'jwt-decode';

interface TokenData extends JwtPayload {
    cusuario: number;
    nombre: string;
    apellido: string;
    identificacion: string;
    email: string;
    rol: string;
}

export default function Login() {
    const router = useRouter();
    const { setUsuario } = useAuth();

    // -------- ESTADOS --------
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);

    // -------- FUNCIÓN LOGIN --------
    const iniciarSesion = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Campos obligatorios',
                text2: 'Ingrese email y contraseña',
            });
            return;
        }

        try {
            setCargando(true);
            const data = await login(email, password);
            await guardarToken(data.access_token);
            const decoded = jwtDecode<TokenData>(data.access_token);

            setUsuario({
                id: decoded.cusuario,
                nombre: decoded.nombre,
                apellido: decoded.apellido,
                identificacion: decoded.identificacion,
                email: decoded.email,
                rol: decoded.rol,
            });

            Toast.show({
                type: 'success',
                text1: 'Inicio de Sesión exitoso',
                text2: 'Bienvenido al Sistema',
            });

            setTimeout(() => {
                router.replace('/home');
            }, 1000);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error Autenticación',
                text2: error.message,
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* Imagen / Logo */}
            <Image
                source={require('../../assets/login.png')}
                style={styles.image}
                resizeMode="contain"
            />

            {/* Título */}
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Aplicación</Text>

            {/* Input email */}
            <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            {/* Input contraseña */}
            <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />

            {/* Botón */}
            <Pressable
                style={[styles.button, cargando && { opacity: 0.7 }]}
                onPress={iniciarSesion}
                disabled={cargando}
            >
                <Text style={styles.buttonText}>
                    {cargando ? 'INGRESANDO...' : 'LOGIN'}
                </Text>
            </Pressable>

            {/* Link */}
            <Link href="/register" style={styles.link}>
                ¿No tienes cuenta? Regístrate
            </Link>

        </View>
    );
}

// -------- ESTILOS --------
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    image: {
        width: 140,
        height: 140,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        backgroundColor: '#2979ff',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    link: {
        marginTop: 18,
        color: '#2979ff',
        fontSize: 14,
    },
});
