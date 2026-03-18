import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useAuth } from '@src/context/AuthContext';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
    subirImagenApi,
    obtenerImagenApi
} from '@src/services/user.service';

export default function Profile() {
    const { usuario } = useAuth();

    const [imagen, setImagen] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);
    const [cargandoImagen, setCargandoImagen] = useState(true);

    /* ---------- CARGAR IMAGEN SOLO CUANDO HAY USUARIO ---------- */
    useEffect(() => {
        if (usuario?.id) {
            cargarImagen();
        }
    }, [usuario?.id]);

    const cargarImagen = async () => {
        try {
            setCargandoImagen(true);

            const res = await obtenerImagenApi();

            if (res?.imagen) {
                setImagen(`data:image/jpeg;base64,${res.imagen}`);
            } else {
                setImagen(null);
            }

        } catch (error) {
            console.log('Error cargando imagen', error);
            setImagen(null);
        } finally {
            setCargandoImagen(false);
        }
    };

    /* ---------- SELECCIONAR ---------- */
    const seleccionarImagen = () => {
        abrirCamara();
    };

    /* ---------- CÁMARA ---------- */
    const abrirCamara = async () => {
        const permiso = await ImagePicker.requestCameraPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert('Permiso requerido', 'Debes permitir acceso a la cámara');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setImagen(result.assets[0].uri); // preview inmediato
        }
    };

    /* ---------- GALERÍA ---------- */
    const abrirGaleria = async () => {
        const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert('Permiso requerido', 'Debes permitir acceso a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
    };

    /* ---------- SUBIR A API ---------- */
    const subirImagen = async () => {
        if (!imagen || !usuario?.id) return;

        try {
            setCargando(true);

            const formData = new FormData();

            if (imagen.startsWith('blob:') || imagen.startsWith('data:')) {
                const response = await fetch(imagen);
                const blob = await response.blob();

                formData.append('imagen', blob, `${usuario.id}.jpg`);
            } else {
                formData.append('imagen', {
                    uri: imagen,
                    name: `${usuario.id}.jpg`,
                    type: 'image/jpeg',
                } as any);
            }

            await subirImagenApi(formData);

            // recargar desde backend (fuente real)
            await cargarImagen();

            Toast.show({
                type: 'success',
                text1: 'Foto actualizada',
            });

        } catch (error: any) {
            console.log('error:', error);

            Toast.show({
                type: 'error',
                text1: 'No se pudo subir la imagen',
                text2: error.message,
            });
        } finally {
            setCargando(false);
        }
    };

    /* ---------- LOADING USUARIO ---------- */
    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>
                    Cargando perfil...
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Pressable onPress={seleccionarImagen}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={
                                imagen
                                    ? { uri: imagen }
                                    : require('../../assets/login.png')
                            }
                            style={styles.avatar}
                        />

                        <View style={styles.editIcon}>
                            <MaterialIcons name="camera-alt" size={20} color="#fff" />
                        </View>
                    </View>
                </Pressable>

                {/* BOTÓN SOLO SI HAY CAMBIO Y NO ESTÁ CARGANDO */}
                {imagen && !cargandoImagen && (
                    <Pressable
                        style={styles.saveButton}
                        onPress={subirImagen}
                        disabled={cargando}
                    >
                        <Text style={styles.saveText}>
                            {cargando ? 'SUBIENDO...' : 'GUARDAR FOTO'}
                        </Text>
                    </Pressable>
                )}

                <Text style={styles.name}>
                    {usuario.nombre} {usuario.apellido}
                </Text>

                <Text style={styles.role}>
                    {usuario.rol?.toUpperCase()}
                </Text>
            </View>

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

    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#8b5cf6',
        borderRadius: 20,
        padding: 6,
    },

    saveButton: {
        marginBottom: 10,
        backgroundColor: '#8b5cf6',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },

    saveText: {
        color: '#fff',
        fontWeight: '700',
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