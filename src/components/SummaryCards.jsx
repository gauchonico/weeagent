import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://wee.mylivara.com/api/stats-summary/')
      .then(res => res.json())
        .then(data => {
            console.log('API DATA:', data);
            setStats(data);
            setLoading(false);
      })
        .catch((err) => {
            setError('Failed to load stats')
            setLoading(false)
        });
  }, []);

  const data = [
    { title: 'Farmers', value: stats?.total_members ?? '-', icon: 'account-group' },
    { title: 'Cooperatives', value: stats?.total_cooperatives ?? '-', icon: 'domain' },
    { title: 'Loans', value: stats?.total_loans ?? '-', icon: 'cash' },
    { title: 'Collections', value: stats?.total_collection ?? '-', icon: 'bank' },
  ];

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16 }}>
          {data.map((item) => (
            <Card key={item.title} style={{ width: '48%', marginBottom: 8 }}>
              <Card.Content>
                <Text variant="titleMedium">{item.title}</Text>
                <Text variant="headlineMedium">{item.value}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}
      {/* ...other dashboard content... */}
    </ScrollView>
  );
}