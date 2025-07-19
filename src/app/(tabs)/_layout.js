import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.onSurfaceVariant,
      }}
    >
      <Tabs.Screen name="index" options={{
              title: '',
        tabBarIcon: ({ color }) => (
          <AntDesign name="home" color={color} size={24} />
        ),
      }} />
      <Tabs.Screen name="settings" options={{
              title: 'Setting',
              headerShown: false,
        tabBarIcon: ({ color }) => (
          <AntDesign name="setting" color={color} size={24} />
        ),
          }} />
          <Tabs.Screen name="bulk-upload" options={{
            headerShown: false,
            title: 'Bulk Upload',
        tabBarIcon: ({ color }) => (
          <AntDesign name="upload" color={color} size={24} />
        ),
          }} />

    </Tabs>
  )
}