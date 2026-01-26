import { Stack } from 'expo-router';
import { AuthProvider } from '@src/context/AuthContext';
import Toast, { BaseToast } from 'react-native-toast-message';

export default function Layout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />

      <Toast
        position="top"
        topOffset={20}
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{
                borderLeftColor: '#2979ff',
                alignSelf: 'flex-end',
                marginRight: 20,
                width: 320,
              }}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              text1Style={{
                fontSize: 14,
                fontWeight: '600',
              }}
              text2Style={{
                fontSize: 12,
                color: '#6b7280',
              }}
            />
          ),
        }}
      />

    </AuthProvider>
  );
}
