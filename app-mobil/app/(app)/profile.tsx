import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@src/context/AuthContext';

export default function Profile() {
    const { usuario } = useAuth();

    if (!usuario) return null;

    return (
        <View style={styles.container}>

            {/* HEADER / AVATAR */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/login.png')}
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.name}>
                    {usuario.nombre} {usuario.apellido}
                </Text>

                <Text style={styles.role}>
                    {usuario.rol?.toUpperCase()}
                </Text>
            </View>

            {/* INFO */}
            <View style={styles.infoHeader}>
                <Text style={styles.infoTitle}>DATOS INFORMATIVOS</Text>
            </View>

            <View style={styles.card}>
                <InfoItem label="IDENTIFICACIÓN" value={usuario.identificacion} />
                <InfoItem label="NOMBRE" value={usuario.nombre} />
                <InfoItem label="APELLIDO" value={usuario.apellido} />
                <InfoItem label="EMAIL" value={usuario.email} />
            </View>
        </View>
    );
}

/* ---------- ITEM ---------- */
function InfoItem({ label, value }: { label: string; value?: string }) {
    return (
        <View style={styles.item}>
            <Text style={styles.itemLabel}>{label}</Text>
            <Text style={styles.itemValue}>{value}</Text>
        </View>
    );
}

/* ---------- STYLES ---------- */
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

    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },

    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },

    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111',
    },

    role: {
        fontSize: 14,
        color: '#8b5cf6',
        marginTop: 4,
    },

    infoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: 30,
        marginBottom: 10,
    },

    infoTitle: {
        fontSize: 12,
        letterSpacing: 1,
        color: '#8b5cf6',
        fontWeight: '700',
    },

    card: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },

    item: {
        marginBottom: 18,
    },

    itemLabel: {
        fontSize: 12,
        color: '#a3a3a3',
        letterSpacing: 1,
        marginBottom: 4,
    },

    itemValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
    },
});
