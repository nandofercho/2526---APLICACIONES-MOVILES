import { View, Text, Image, StyleSheet } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>

            {/* Contenido central */}
            <View style={styles.content}>
                <Image
                    source={require('../../assets/favicon.png')}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>Bienvenido al Sistema</Text>
                <Text style={styles.subtitle}>
                    Biométrico - Asistencia
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Desarrollado por</Text>
                <Text style={styles.author}>Fernando Zambrano</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f6f8',
        paddingHorizontal: 24,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 150,     // ⬅️ MÁS PEQUEÑA
        height: 150,
        marginBottom: 16,
    },

    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1f2933',
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 6,
    },

    footer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    footerText: {
        fontSize: 12,
        color: '#9ca3af',
    },

    author: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginTop: 2,
        letterSpacing: 0.5,
    },
});
