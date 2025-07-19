import { Stack } from "expo-router";
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import {
  MD3LightTheme,
  MD3DarkTheme,
} from 'react-native-paper';
import Colors from '../constants/Colors';
import { useColorScheme, ActivityIndicator, View } from 'react-native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark'
    ? {...MD3DarkTheme, colors: Colors.dark}
    : {...MD3LightTheme, colors: Colors.light};

  return (
    <AuthProvider>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider value={paperTheme}>
          <AppContent />
          </ThemeProvider>
    </PaperProvider>
    </AuthProvider>
  );
}
