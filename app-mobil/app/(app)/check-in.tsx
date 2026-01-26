import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import { useAuth } from '@src/context/AuthContext';

/* ---------- TIPOS ---------- */
interface Marcacion {
    id: number;
    fecha: string;
    hora: string;
}

export default function CheckIn() {
    const { usuario } = useAuth();

    const [marcaciones, setMarcaciones] = useState<Marcacion[]>([
        { id: 1, fecha: '2026-01-20', hora: '08:05' },
        { id: 2, fecha: '2026-01-20', hora: '17:12' },
    ]);

    const registrarMarcacion = () => {
        const ahora = new Date();

        const nueva: Marcacion = {
            id: marcaciones.length + 1,
            fecha: ahora.toISOString().split('T')[0],
            hora: ahora.toLocaleTimeString().slice(0, 5),
        };

        setMarcaciones([nueva, ...marcaciones]);

        Toast.show({
            type: 'success',
            text1: 'Marcación registrada',
            text2: `Marcación #${nueva.id} • ${nueva.hora}`,
        });
    };

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/favicon.png')}
                    style={styles.avatar}
                />

                <Text style={styles.title}>MARCACIÓN</Text>
                <Text style={styles.subtitle}>
                    {usuario?.nombre} {usuario?.apellido}
                </Text>
            </View>

            {/* BOTÓN MARCAR */}
            <View style={styles.buttonWrapper}>
                <Pressable style={styles.button} onPress={registrarMarcacion}>
                    <MaterialIcons name="fingerprint" size={26} color="#fff" />
                    <Text style={styles.buttonText}>MARCAR</Text>
                </Pressable>
            </View>

            {/* LISTADO */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>HISTORIAL DE MARCACIONES</Text>
            </View>

            <FlatList
                contentContainerStyle={styles.list}
                data={marcaciones}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.cardLeft}>
                            <MaterialIcons name="check-circle" size={22} color="#8b5cf6" />
                            <Text style={styles.cardTitle}>
                                Marcación #{item.id}
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
        paddingTop: 50,
        paddingBottom: 20,
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

    subtitle: {
        fontSize: 13,
        color: '#8b5cf6',
        marginTop: 4,
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
});
