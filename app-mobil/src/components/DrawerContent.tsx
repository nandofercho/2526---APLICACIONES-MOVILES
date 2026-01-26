import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scroll}
      >
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/favicon.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.subtitle}>Aplicación</Text>

        </View>

        {/* MENÚ */}
        <View style={styles.menu}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* LOGOUT */}
      <View style={styles.footer}>
        <Pressable
          style={styles.logoutButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scroll: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },

  /* LOGO */
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
  },

  logo: {
    width: 80,
    height: 80,
  },

  /* MENÚ */
  menu: {
    marginTop: 16,
    paddingHorizontal: 12,
  },

  /* FOOTER */
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fafafa',
  },

  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
