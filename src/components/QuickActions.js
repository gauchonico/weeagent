import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function QuickActions() {
  const router = useRouter();

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 }}>
      <Button mode="contained" icon="account-plus" onPress={() => router.push('/add-farmer')} style={{ marginBottom: 8, width: '48%' }}>
        Add Farmer
      </Button>
      <Button mode="contained" icon="cash-plus" onPress={() => router.push('/record-loan')} style={{ marginBottom: 8, width: '48%' }}>
        Record Loan
      </Button>
      <Button mode="contained" icon="bank-plus" onPress={() => router.push('/record-saving')} style={{ marginBottom: 8, width: '48%' }}>
        Record Savings
      </Button>
      <Button mode="contained" icon="domain-plus" onPress={() => router.push('/add-cooperative')} style={{ marginBottom: 8, width: '48%' }}>
        Add Cooperative
      </Button>
    </View>
  );
} 