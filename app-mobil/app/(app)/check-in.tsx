import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import * as Location from 'expo-location';

import { useAuth } from '@src/context/AuthContext';
import {
    listarMarcaciones,
    registrarMarcacionApi,
    eliminarMarcacionApi,
} from '@src/services/marcacion.service';

/* ---------- CONFIG FECHAS ---------- */
dayjs.locale('es');
const fecha = dayjs().format('YYYY-MM-DD');

/* ---------- TIPOS ---------- */
interface Marcacion {
    id: number;
    fecha: string;
    hora: string;
}

export default function CheckIn() {
    const { usuario } = useAuth();
    const [marcaciones, setMarcaciones] = useState<Marcacion[]>([]);
    const [cargando, setCargando] = useState(false);

    /* ---------- UBICACIÓN ---------- */
    const obtenerUbicacion = async () => {
        try {
            const enabled = await Location.hasServicesEnabledAsync();
            if (!enabled) {
                throw new Error('Activa el GPS');
            }

            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                throw new Error('Permiso de ubicación denegado');
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            return {
                latitud: location.coords.latitude,
                longitud: location.coords.longitude,
            };
        } catch (error: any) {
            throw new Error(
                error.message || 'No se pudo obtener ubicación'
            );
        }
    };

    /* ---------- CARGAR LISTADO ---------- */
    const cargarMarcaciones = async () => {
        if (!usuario?.id) return;

        try {
            setCargando(true);
            const data = await listarMarcaciones(
                usuario.id,
                fecha,
                fecha
            );
            setMarcaciones(data);
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error al cargar marcaciones',
                text2: error.message,
            });
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarMarcaciones();
    }, []);

    /* ---------- REGISTRAR ---------- */
    const registrarMarcacion = async () => {
        try {
            setCargando(true);

            // 📍 Obtener ubicación
            const ubicacion = await obtenerUbicacion();

            await registrarMarcacionApi(ubicacion.latitud, ubicacion.longitud);

            Toast.show({
                type: 'success',
                text1: 'Marcación registrada',
            });

            cargarMarcaciones();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error al registrar',
                text2: error.message,
            });
        } finally {
            setCargando(false);
        }
    };

    /* ---------- ELIMINAR ---------- */
    const eliminarMarcacion = async (item: Marcacion) => {
        try {
            await eliminarMarcacionApi(
                item.fecha,
                item.hora
            );

            Toast.show({
                type: 'success',
                text1: 'Marcación eliminada',
            });

            cargarMarcaciones();
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error al eliminar',
                text2: error.message,
            });
        }
    };

    /* ---------- BOTÓN SWIPE ---------- */
    const renderRightActions = (item: Marcacion) => (
        <Pressable
            style={styles.deleteButton}
            onPress={() => eliminarMarcacion(item)}
        >
            <MaterialIcons name="delete" size={26} color="#fff" />
            <Text style={styles.deleteText}>Eliminar</Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/favicon.png')}
                    style={styles.avatar}
                />

                <Text style={styles.title}>MARCACIÓN</Text>
            </View>

            {/* BOTÓN MARCAR */}
            <View style={styles.buttonWrapper}>
                <Pressable
                    style={styles.button}
                    onPress={registrarMarcacion}
                    disabled={cargando}
                >
                    <MaterialIcons name="fingerprint" size={26} color="#fff" />
                    <Text style={styles.buttonText}>
                        {cargando ? 'PROCESANDO...' : 'MARCAR'}
                    </Text>
                </Pressable>
            </View>

            {/* LISTADO */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    HISTORIAL DE MARCACIONES
                </Text>
            </View>

            <FlatList
                contentContainerStyle={styles.list}
                data={marcaciones}
                refreshing={cargando}
                onRefresh={cargarMarcaciones}
                renderItem={({ item, index }) => (
                    <Swipeable
                        renderRightActions={() => renderRightActions(item)}
                    >
                        <View style={styles.card}>
                            <View style={styles.cardLeft}>
                                <MaterialIcons
                                    name="check-circle"
                                    size={22}
                                    color="#8b5cf6"
                                />
                                <Text style={styles.cardTitle}>
                                    Marcación #{index + 1}
                                </Text>
                            </View>

                            <View style={styles.cardRight}>
                                <Text style={styles.cardFecha}>{item.fecha}</Text>
                                <Text style={styles.cardHora}>{item.hora}</Text>
                            </View>
                        </View>
                    </Swipeable>
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        No hay marcaciones registradas
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
    },

    header: {
        alignItems: 'center',
        paddingTop: 25,
    },

    avatar: {
        width: 90,
        height: 90,
        marginBottom: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },

    buttonWrapper: {
        alignItems: 'center',
        marginVertical: 20,
    },

    button: {
        backgroundColor: '#8b5cf6',
        paddingVertical: 16,
        paddingHorizontal: 60,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },

    buttonText: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 1,
    },

    sectionHeader: {
        paddingHorizontal: 24,
        marginBottom: 10,
    },

    sectionTitle: {
        fontSize: 12,
        letterSpacing: 1,
        color: '#8b5cf6',
        fontWeight: '700',
    },

    list: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
    },

    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    cardTitle: {
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 14,
        color: '#111',
    },

    cardRight: {
        alignItems: 'flex-end',
    },

    cardFecha: {
        fontSize: 12,
        color: '#8b8b8b',
    },

    cardHora: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
    },

    empty: {
        textAlign: 'center',
        marginTop: 30,
        color: '#8b8b8b',
    },

    deleteButton: {
        backgroundColor: '#ef4444',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        borderRadius: 16,
        marginBottom: 12,
    },

    deleteText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 4,
        fontWeight: '600',
    },
});
