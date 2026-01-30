import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingWelcome() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido 👋</Text>
            <Text style={styles.text}>
                Esta aplicación te permite registrar y consultar tus marcaciones
                de forma segura y rápida.
            </Text>

            <Pressable
                style={styles.button}
                onPress={() => router.push('/onboarding/benefits')}
            >
                <Text style={styles.buttonText}>Siguiente</Text>
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
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    text: {
        fontSize: 15,
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
        fontSize: 15,
    },
});
