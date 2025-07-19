// weedata/src/app/login.js
import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await login(username.trim(), password);
      if (result.success) {
        router.replace('/(tabs)');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.log('Login error:', error);
      setError('Network error. Please check your connection and try again.');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={{ 
          flexGrow: 1, 
          justifyContent: 'center', 
          padding: 16,
          backgroundColor: '#f5f5f5'
        }}
      >
        <Card style={{ padding: 24, borderRadius: 12, elevation: 4 }}>
          <Card.Content>
            {/* Header */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <IconButton 
                icon="account-circle" 
                size={60} 
                iconColor="#4CAF50"
              />
              <Text variant="headlineSmall" style={{ marginBottom: 8 }}>
                Agent Login
              </Text>
              <Text variant="bodyMedium" style={{ textAlign: 'center', color: '#666' }}>
                Sign in to access the farmer management system
              </Text>
            </View>

            {/* Username Input */}
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              left={<TextInput.Icon icon="account" />}
              style={{ marginBottom: 16 }}
              autoCapitalize="none"
              autoCorrect={false}
              disabled={loading}
            />

            {/* Password Input */}
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon 
                  icon={showPassword ? "eye-off" : "eye"} 
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              secureTextEntry={!showPassword}
              style={{ marginBottom: 16 }}
              disabled={loading}
            />

            {/* Error Message */}
            {error ? (
              <View style={{ 
                backgroundColor: '#ffebee', 
                padding: 12, 
                borderRadius: 8, 
                marginBottom: 16 
              }}>
                <Text style={{ color: '#c62828', textAlign: 'center' }}>
                  {error}
                </Text>
              </View>
            ) : null}

            {/* Login Button */}
            <Button 
              mode="contained" 
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={{ 
                marginTop: 8,
                paddingVertical: 8,
                borderRadius: 8
              }}
              contentStyle={{ paddingVertical: 4 }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            {/* Footer */}
            <View style={{ marginTop: 24, alignItems: 'center' }}>
              <Text variant="bodySmall" style={{ color: '#666', textAlign: 'center' }}>
                Only authorized agents can access this system
              </Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}