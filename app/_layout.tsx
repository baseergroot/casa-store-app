import '../global.css';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { NotoSerif_400Regular } from '@expo-google-fonts/noto-serif';
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold } from '@expo-google-fonts/manrope';

import { useColorScheme } from '@/lib/useColorScheme';
import { Stack } from 'expo-router';
import { configureBoneyard } from 'boneyard-js/native'

  configureBoneyard({
    color: '#e5e7eb',
    darkColor: '#303030'
  })

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export { 
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [loaded, error] = useFonts({
    NotoSerif_400Regular,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />

      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="cart/index" />
        <Stack.Screen name="product/[productId]" />
      </Stack>
    </>
  );
}
