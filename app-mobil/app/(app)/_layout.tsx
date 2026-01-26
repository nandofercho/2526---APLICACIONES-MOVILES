import { Drawer } from 'expo-router/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import CustomDrawerContent from '@src/components/DrawerContent';
import { useAuth } from '@src/context/AuthContext';

export default function AppLayout() {
    const { usuario } = useAuth();

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerTitleAlign: 'center',
                drawerItemStyle: {
                    borderRadius: 14,
                },
                drawerActiveBackgroundColor: '#e0ecff',
                drawerActiveTintColor: '#2563eb',
            }}
        >
            <Drawer.Screen
                name="home"
                options={{
                    title: 'Inicio',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="check-in"
                options={{
                    title: 'Marcación',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="fingerprint" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="historial"
                options={{
                    title: 'Historial',
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="list" size={size} color={color} />
                    ),
                }}
            />

            {/* SOLO ADMIN */}
            {usuario?.rol === 'admin' && (
                <Drawer.Screen
                    name="users"
                    options={{
                        title: 'Usuarios',
                        drawerIcon: ({ color, size }) => (
                            <MaterialIcons
                                name="supervisor-account"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            )}

            <Drawer.Screen
                name="settings"
                options={{
                    title: 'Configuración',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}
