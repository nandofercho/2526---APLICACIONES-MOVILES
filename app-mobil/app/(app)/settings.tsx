import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useState } from 'react';

import { changePassword } from '@src/services/auth.service';

export default function Configuracion() {
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNuevo, setPasswordNuevo] = useState('');
    const [cargando, setCargando] = useState(false);

    const botonHabilitado =
        passwordActual.length > 0 && passwordNuevo.length > 0;

    const cambiarPassword = async () => {
        if (!botonHabilitado) return;

        try {
            setCargando(true);

            await changePassword(passwordActual, passwordNuevo);

            Toast.show({
                type: 'success',
                text1: 'Contraseña actualizada',
                text2: 'Se cambió correctamente',
            });

            setPasswordActual('');
            setPasswordNuevo('');
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
            <View style={styles.header}>
                <MaterialIcons name="settings" size={40} color="#8b5cf6" />
                <Text style={styles.title}>CONFIGURACIÓN</Text>
                <Text style={styles.subtitle}>Cambiar contraseña</Text>
            </View>

            <TextInput
                placeholder="Contraseña actual"
                secureTextEntry
                value={passwordActual}
                onChangeText={setPasswordActual}
                style={styles.input}
            />

            <TextInput
                placeholder="Nueva contraseña"
                secureTextEntry
                value={passwordNuevo}
                onChangeText={setPasswordNuevo}
                style={styles.input}
            />

            <Pressable
                style={[
                    styles.button,
                    !botonHabilitado && styles.disabledButton,
                ]}
                disabled={!botonHabilitado || cargando}
                onPress={cambiarPassword}
            >
                <MaterialIcons name="lock-reset" size={22} color="#fff" />
                <Text style={styles.buttonText}>
                    {cargando ? 'GUARDANDO...' : 'GUARDAR'}
                </Text>
            </Pressable>
        </View>
    );
}

/* ---------- ESTILOS ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f8',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 13,
        color: '#8b8b8b',
        marginTop: 4,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#8b5cf6',
        paddingVertical: 14,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        elevation: 3,
    },
    disabledButton: {
        backgroundColor: '#c4b5fd',
    },
    buttonText: {
        marginLeft: 8,
        color: '#fff',
        fontWeight: '700',
        letterSpacing: 1,
    },
});
