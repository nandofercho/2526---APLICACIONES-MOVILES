import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { useAuth } from '@src/context/AuthContext';
import { listarMarcaciones } from '@src/services/marcacion.service';

/* ---------- CONFIG ---------- */
dayjs.locale('es');

/* ---------- TIPOS ---------- */
interface Marcacion {
    id: number;
    fecha: string;
    hora: string;
}

export default function Historial() {
    const { usuario } = useAuth();

    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [marcaciones, setMarcaciones] = useState<Marcacion[]>([]);
    const [cargando, setCargando] = useState(false);

    /* ---------- VALIDACIONES ---------- */
    const formatoValido = (fecha: string) =>
        dayjs(fecha, 'YYYY-MM-DD', true).isValid();

    const botonHabilitado =
        fechaInicio.length === 10 && fechaFin.length === 10;

    /* ---------- BUSCAR ---------- */
    const buscarMarcaciones = async () => {
        if (!usuario?.id) return;

        // Validar formato
        if (!formatoValido(fechaInicio) || !formatoValido(fechaFin)) {
            Toast.show({
                type: 'error',
                text1: 'Formato inválido',
                text2: 'Use el formato YYYY-MM-DD',
            });
            return;
        }

        // Validar rango
        if (dayjs(fechaInicio).isAfter(dayjs(fechaFin))) {
            Toast.show({
                type: 'error',
                text1: 'Rango inválido',
                text2: 'La fecha inicio no puede ser mayor a la fecha fin',
            });
            return;
        }

        try {
            setCargando(true);

            const data = await listarMarcaciones(
                usuario.id,
                fechaInicio,
                fechaFin
            );

            setMarcaciones(data);

            if (data.length === 0) {
                Toast.show({
                    type: 'info',
                    text1: 'Sin resultados',
                    text2: 'No hay marcaciones en ese rango',
                });
            }
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Error al buscar',
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
                <Text style={styles.title}>HISTORIAL DE MARCACIONES</Text>
            </View>

            {/* FILTROS */}
            <View style={styles.filters}>

                <TextInput
                    placeholder="Fecha inicio (YYYY-MM-DD)"
                    value={fechaInicio}
                    onChangeText={setFechaInicio}
                    style={styles.input}
                    maxLength={10}
                />

                <TextInput
                    placeholder="Fecha fin (YYYY-MM-DD)"
                    value={fechaFin}
                    onChangeText={setFechaFin}
                    style={styles.input}
                    maxLength={10}
                />

                <Pressable
                    style={[
                        styles.searchButton,
                        !botonHabilitado && styles.disabledButton,
                    ]}
                    disabled={!botonHabilitado || cargando}
                    onPress={buscarMarcaciones}
                >
                    <MaterialIcons name="search" size={22} color="#fff" />
                    <Text style={styles.searchText}>
                        {cargando ? 'BUSCANDO...' : 'BUSCAR'}
                    </Text>
                </Pressable>
            </View>

            {/* LISTADO */}
            <FlatList
                contentContainerStyle={styles.list}
                data={marcaciones}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
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
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        Ingrese un rango de fechas y presione buscar
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
        paddingTop: 30,
        paddingBottom: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },

    filters: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },

    input: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 14,
    },

    searchButton: {
        backgroundColor: '#8b5cf6',
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        elevation: 3,
    },

    disabledButton: {
        backgroundColor: '#c4b5fd',
    },

    searchText: {
        marginLeft: 8,
        color: '#fff',
        fontWeight: '700',
        letterSpacing: 1,
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
        marginTop: 40,
        color: '#8b8b8b',
    },
});
