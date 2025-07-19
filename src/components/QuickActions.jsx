import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

export default function QuickActions({ onAddFarmer, onRecordLoan, onRecordSavings, onAddCoop }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 }}>
      <Button mode="contained" icon="account-plus" onPress={onAddFarmer} style={{ marginBottom: 8, width: '48%' }}>
        Add Farmer
      </Button>
      <Button mode="contained" icon="cash-plus" onPress={onRecordLoan} style={{ marginBottom: 8, width: '48%' }}>
        Record Loan
      </Button>
      <Button mode="contained" icon="bank-plus" onPress={onRecordSavings} style={{ marginBottom: 8, width: '48%' }}>
        Record Savings
      </Button>
      <Button mode="contained" icon="domain-plus" onPress={onAddCoop} style={{ marginBottom: 8, width: '48%' }}>
        Add Cooperative
      </Button>
    </View>
  );
}