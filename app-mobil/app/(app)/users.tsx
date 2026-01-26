import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { Swipeable } from 'react-native-gesture-handler';

import {
    listarUsuarios,
    cambiarEstadoUsuario,
    Usuario,
} from '@src/services/user.service';

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(false);

    /* ---------- CARGAR USUARIOS ---------- */
    const cargarUsuarios = async () => {
        try {
            setCargando(true);
            const data = await listarUsuarios();
            setUsuarios(data);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error al cargar usuarios',
                text2: error.message,
            });
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    /* ---------- ACTIVAR / INACTIVAR ---------- */
    const cambiarEstado = async (item: Usuario) => {
        try {
            const nuevoEstado = item.estado === 1 ? 0 : 1;

            await cambiarEstadoUsuario(item.cusuario, nuevoEstado);

            Toast.show({
                type: 'success',
                text1:
                    nuevoEstado === 1
                        ? 'Usuario activado'
                        : 'Usuario inactivado',
            });

            cargarUsuarios();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
            });
        }
    };

    /* ---------- BOTÓN SWIPE ---------- */
    const renderRightActions = (item: Usuario) => {
        const activo = item.estado === 1;

        return (
            <Pressable
                style={[
                    styles.actionButton,
                    activo ? styles.inactivar : styles.activar,
                ]}
                onPress={() => cambiarEstado(item)}
            >
                <MaterialIcons
                    name={activo ? 'block' : 'check-circle'}
                    size={26}
                    color="#fff"
                />
                <Text style={styles.actionText}>
                    {activo ? 'Inactivar' : 'Activar'}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>USUARIOS</Text>

            <FlatList
                data={usuarios}
                refreshing={cargando}
                onRefresh={cargarUsuarios}
                keyExtractor={(item) => item.cusuario.toString()}
                renderItem={({ item }) => (
                    <Swipeable
                        renderRightActions={() =>
                            renderRightActions(item)
                        }
                    >
                        <View style={styles.card}>
                            {/* ICONO */}
                            <View style={styles.left}>
                                <MaterialIcons
                                    name="person"
                                    size={28}
                                    color={
                                        item.rol === 'admin'
                                            ? '#8b5cf6'
                                            : '#10b981'
                                    }
                                />
                            </View>

                            {/* DATOS */}
                            <View style={styles.center}>
                                <Text style={styles.name}>
                                    {item.nombre} {item.apellido}
                                </Text>
                                <Text style={styles.email}>
                                    {item.email}
                                </Text>
                                <Text style={styles.identificacion}>
                                    CI: {item.identificacion}
                                </Text>
                            </View>

                            {/* ROL / ESTADO */}
                            <View style={styles.right}>
                                <MaterialIcons
                                    name="check"
                                    size={16}
                                    color={
                                        item.rol === 'admin'
                                            ? '#8b5cf6'
                                            : '#000'
                                    }
                                    style={styles.checkIcon}
                                />

                                <Text
                                    style={[
                                        styles.rol,
                                        item.rol === 'admin'
                                            ? styles.admin
                                            : styles.usuario,
                                    ]}
                                >
                                    {item.rol.toUpperCase()}
                                </Text>

                                <Text
                                    style={[
                                        styles.estado,
                                        item.estado === 1
                                            ? styles.activo
                                            : styles.inactivo,
                                    ]}
                                >
                                    {item.estado === 1
                                        ? 'ACTIVO'
                                        : 'INACTIVO'}
                                </Text>
                            </View>
                        </View>
                    </Swipeable>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No existen usuarios
                    </Text>
                }
            />
        </View>
    );
}

/* ---------- ESTILOS ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f8',
        paddingTop: 20,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 15,
        color: '#111',
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 3,
    },

    left: {
        marginRight: 12,
    },

    center: {
        flex: 1,
    },

    name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111',
    },

    email: {
        fontSize: 13,
        color: '#555',
        marginTop: 2,
    },

    identificacion: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },

    right: {
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 90,
    },

    checkIcon: {
        marginBottom: 4,
    },

    rol: {
        fontSize: 11,
        fontWeight: '700',
        marginBottom: 4,
    },

    admin: {
        color: '#8b5cf6',
    },

    usuario: {
        color: '#000',
    },

    estado: {
        fontSize: 11,
        fontWeight: '700',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        color: '#fff',
    },

    activo: {
        backgroundColor: '#10b981',
    },

    inactivo: {
        backgroundColor: '#ef4444',
    },

    empty: {
        textAlign: 'center',
        marginTop: 40,
        color: '#888',
    },

    /* SWIPE */
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 16,
        marginBottom: 12,
        marginRight: 12,
    },

    activar: {
        backgroundColor: '#10b981',
    },

    inactivar: {
        backgroundColor: '#ef4444',
    },

    actionText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 4,
    },
});
