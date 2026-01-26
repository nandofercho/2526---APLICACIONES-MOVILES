import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CustomDrawerContent from '@src/components/DrawerContent';

export default function AppLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerTitleAlign: 'center',
                drawerItemStyle: {
                    borderRadius: 14, // mismo redondeado
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
                    title: 'Perfíl',
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
