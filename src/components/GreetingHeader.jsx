import React from 'react';
import { View } from 'react-native';
import { Text, Avatar } from 'react-native-paper';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function GreetingHeader({ userName = "User" }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <Avatar.Text size={40} label={userName[0]} style={{ marginRight: 12 }} />
      <Text variant="titleLarge">{getGreeting()}, {userName} 👋</Text>
    </View>
  );
}