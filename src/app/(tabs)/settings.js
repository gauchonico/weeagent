import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Avatar, 
  Divider, 
  List, 
  IconButton,
  ActivityIndicator 
} from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import TopTable from '../../components/TopCollections';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const [agentStats, setAgentStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with real API calls
  const mockAgentStats = {
    commission: 125000,
    farmersProfiled: 45,
    loansProcessed: 12,
    collectionsMade: 8,
    totalSavings: 2500000,
    pendingRequests: 3
  };

  useEffect(() => {
    // Simulate API call for agent stats
    setTimeout(() => {
      setAgentStats(mockAgentStats);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const handleChangePassword = () => {
    // TODO: Navigate to change password screen
    console.log('Change password');
  };

  const handleViewProfile = () => {
    // TODO: Navigate to profile screen
    console.log('View profile');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5', marginTop:80 }}>
      {/* Agent Profile Header */}
      <Card style={{ margin: 16, borderRadius: 12 }}>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Avatar.Text 
              size={60} 
              label={`${user?.first_name?.[0] || 'A'}${user?.last_name?.[0] || 'G'}`} 
              style={{ marginRight: 16 }}
            />
            <View style={{ flex: 1 }}>
              <Text variant="titleLarge">
                {user?.first_name} {user?.last_name}
              </Text>
              <Text variant="bodyMedium" style={{ color: '#666' }}>
                {user?.email}
              </Text>
              <Text variant="bodySmall" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                Agent • {user?.groups?.[0] || 'Active'}
              </Text>
            </View>
            <IconButton 
              icon="account-edit" 
              onPress={handleViewProfile}
              size={24}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Quick Stats */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <Text variant="titleMedium" style={{ marginBottom: 12 }}>Your Performance</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Card style={{ width: '48%', marginBottom: 8 }}>
            <Card.Content style={{ alignItems: 'center', padding: 12 }}>
              <Text variant="headlineSmall" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                {agentStats?.commission?.toLocaleString()}
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'center' }}>Commission (UGX)</Text>
            </Card.Content>
          </Card>
          <Card style={{ width: '48%', marginBottom: 8 }}>
            <Card.Content style={{ alignItems: 'center', padding: 12 }}>
              <Text variant="headlineSmall" style={{ color: '#2196F3', fontWeight: 'bold' }}>
                {agentStats?.farmersProfiled}
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'center' }}>Farmers Profiled</Text>
            </Card.Content>
          </Card>
          <Card style={{ width: '48%', marginBottom: 8 }}>
            <Card.Content style={{ alignItems: 'center', padding: 12 }}>
              <Text variant="headlineSmall" style={{ color: '#FF9800', fontWeight: 'bold' }}>
                {agentStats?.loansProcessed}
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'center' }}>Loans Processed</Text>
            </Card.Content>
          </Card>
          <Card style={{ width: '48%', marginBottom: 8 }}>
            <Card.Content style={{ alignItems: 'center', padding: 12 }}>
              <Text variant="headlineSmall" style={{ color: '#9C27B0', fontWeight: 'bold' }}>
                {agentStats?.collectionsMade}
              </Text>
              <Text variant="bodySmall" style={{ textAlign: 'center' }}>Collections Made</Text>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* Quick Actions */}
      
      {/* Tables Section */}
     

      {/* Your existing tables */}
      

      {/* Logout Button */}
      <View style={{ padding: 16, marginBottom: 32 }}>
        <Button 
          mode="outlined" 
          onPress={handleLogout}
          icon="logout"
          style={{ borderColor: '#f44336' }}
          textColor="#f44336"
        >
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}