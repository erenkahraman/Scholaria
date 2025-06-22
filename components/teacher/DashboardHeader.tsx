import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/lib/SessionProvider';

const DashboardHeader = () => {
  const { profile } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {profile?.full_name?.split(' ')[0] ?? 'Teacher'}</Text>
      <Text style={styles.subtitle}>Here&apos;s a look at your day. Let&apos;s make it a great one.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3c4043',
  },
  subtitle: {
    fontSize: 16,
    color: '#5f6368',
    marginTop: 4,
  },
});

export default DashboardHeader; 