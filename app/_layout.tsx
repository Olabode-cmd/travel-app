// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// // import { useColorScheme } from '@/components/useColorScheme';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ProximaNova: require('../assets/fonts/ProximaNova-Regular.otf'),
//     ProximaNovaBold: require('../assets/fonts/ProximaNova-Bold.otf'),
//     ProximaNovaSemibold: require('../assets/fonts/ProximaNova-Semibold.otf'),
//     Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
//     PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
//     PoppinsSemibold: require('../assets/fonts/Poppins-SemiBold.ttf'),
//     ...FontAwesome.font,
//   });

//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   return (
//     <ThemeProvider value={DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'login',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout(): JSX.Element | null {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ProximaNova: require('../assets/fonts/ProximaNova-Regular.otf'),
    ProximaNovaBold: require('../assets/fonts/ProximaNova-Bold.otf'),
    ProximaNovaSemibold: require('../assets/fonts/ProximaNova-Semibold.otf'),
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsSemibold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
      } catch (err) {
        console.error('Error fetching token:', err);
        setIsAuthenticated(false);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    checkAuth();
  }, []);

  if (!loaded || isAuthenticated === null) {
    return null;
  }

  return <RootLayoutNav isAuthenticated={isAuthenticated} />;
}

interface RootLayoutNavProps {
  isAuthenticated: boolean;
}

function RootLayoutNav({ isAuthenticated }: RootLayoutNavProps): JSX.Element {
  return (
    <ThemeProvider value={DefaultTheme}>
      {isAuthenticated ? (
        <>
          <Stack options={{ headerShown: false}}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="permissions/imagepicker" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </>
      ) : (
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
      )}
    </ThemeProvider>
  );
}