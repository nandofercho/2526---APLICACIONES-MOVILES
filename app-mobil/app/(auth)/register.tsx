import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { register } from '@src/services/auth.service';

export default function Register() {
    const router = useRouter();

    const [identificacion, setIdentificacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);

    const formularioValido =
        identificacion &&
        nombre &&
        apellido &&
        email &&
        password;

    const registrarUsuario = async () => {
        if (!formularioValido) return;

        try {
            setCargando(true);

            await register(
                identificacion,
                nombre,
                apellido,
                email,
                password
            );

            Toast.show({
                type: 'success',
                text1: 'Registro exitoso',
                text2: 'Ahora puedes iniciar sesión',
            });

            router.replace('/login');
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
            });
        } finally {
            setCargando(false);
        }
    };

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <MaterialIcons name="person-add" size={48} color="#2979ff" />
                <Text style={styles.title}>Crear cuenta</Text>
                <Text style={styles.subtitle}>Registro de usuario</Text>
            </View>

            {/* FORM */}
            <TextInput
                placeholder="Identificación"
                value={identificacion}
                onChangeText={setIdentificacion}
                style={styles.input}
            />

            <TextInput
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />

            <TextInput
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
                style={styles.input}
            />

            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />

            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />

            <Pressable
                style={[
                    styles.button,
                    !formularioValido && styles.disabledButton,
                ]}
                disabled={!formularioValido || cargando}
                onPress={registrarUsuario}
            >
                <Text style={styles.buttonText}>
                    {cargando ? 'REGISTRANDO...' : 'REGISTRARSE'}
                </Text>
            </Pressable>

            {/* VOLVER */}
            <Pressable onPress={() => router.back()}>
                <Text style={styles.link}>Volver al login</Text>
            </Pressable>

        </View>
    );
}

/* ---------- ESTILOS ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        paddingHorizontal: 24,
    },

    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        marginTop: 10,
        color: '#111',
    },

    subtitle: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 14,
    },

    button: {
        backgroundColor: '#2979ff',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 10,
    },

    disabledButton: {
        backgroundColor: '#9bbcff',
    },

    buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 1,
    },

    link: {
        marginTop: 18,
        color: '#2979ff',
        textAlign: 'center',
    },
});
