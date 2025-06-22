import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type ActionCardProps = {
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof FontAwesome5>['name'];
  onPress: () => void;
  color: string;
};

const ActionCard = ({ title, description, iconName, onPress, color }: ActionCardProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <FontAwesome5 name={iconName} size={22} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <FontAwesome5 name="chevron-right" size={14} color="#5f6368" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3c4043',
  },
  description: {
    fontSize: 14,
    color: '#5f6368',
    marginTop: 2,
  },
});

export default ActionCard; 