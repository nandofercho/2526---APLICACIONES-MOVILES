import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Benefits() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Qué puedes hacer?</Text>

            <Text style={styles.item}>✔ Registrar tus marcaciones</Text>
            <Text style={styles.item}>✔ Consultar tu historial</Text>
            <Text style={styles.item}>✔ Acceder desde cualquier lugar</Text>

            <Pressable
                style={styles.button}
                onPress={() => router.push('/onboarding/permissions')}
            >
                <Text style={styles.buttonText}>Continuar</Text>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        marginTop: 40,
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
