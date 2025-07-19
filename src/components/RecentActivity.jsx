import React from 'react';
import { List } from 'react-native-paper';

const activities = [
  { title: 'Farmer John added', description: 'Today, 9:00 AM' },
  { title: 'Loan #123 approved', description: 'Yesterday, 3:00 PM' },
  { title: 'Savings recorded for Mary', description: 'Yesterday, 1:00 PM' },
];

export default function RecentActivity() {
  return (
    <List.Section title="Recent Activity">
      {activities.map((item, idx) => (
        <List.Item
          key={idx}
          title={item.title}
          description={item.description}
          left={props => <List.Icon {...props} icon="history" />}
        />
      ))}
    </List.Section>
  );
}