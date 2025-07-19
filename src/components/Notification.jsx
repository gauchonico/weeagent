import React from 'react';
import { Banner } from 'react-native-paper';


export default function NotificationsBanner({ visible, onDismiss, message }) {
  if (!visible) return null;
  return (
    <Banner
      visible={visible}
      actions={[{ label: 'Dismiss', onPress: onDismiss }]}
      icon="ticket"
  
    >
      {message}
    </Banner>
  );
}