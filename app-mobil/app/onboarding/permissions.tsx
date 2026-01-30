import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Permissions() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Permisos</Text>

            <Text style={styles.text}>
                La aplicación necesita acceso básico para funcionar correctamente.
            </Text>

            <Pressable
                style={styles.button}
                onPress={() => router.push('/onboarding/access')}
            >
                <Text style={styles.buttonText}>Aceptar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#f5f6fa',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#2979ff',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '700',
    },
});
