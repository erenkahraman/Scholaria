import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressProps {
  value: number; // 0 to 100
  indicatorClassName?: string;
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <View style={styles.background}>
      <View style={[styles.indicator, { width: `${Math.max(0, Math.min(100, value || 0))}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 8,
    width: '100%',
    backgroundColor: '#e5e7eb', // gray-200
    borderRadius: 4,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    backgroundColor: '#1d4ed8', // blue-700
    borderRadius: 4,
  },
});

export { Progress }; 