import '../global.css';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';

import { NAV_THEME } from '@/theme';
import { useColorScheme } from '@/lib/useColorScheme';
import { Stack } from 'expo-router';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <Stack screenOptions={{
          headerShown: false
        }}  >

          <Stack.Screen name="index" />
          <Stack.Screen name="cart/index" />
          <Stack.Screen name="product/[productId]" />
        </Stack>

      </NavThemeProvider>
    </>
  );
}