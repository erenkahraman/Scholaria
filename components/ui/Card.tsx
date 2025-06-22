import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View
      ref={ref}
      style={[styles.card, style]}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardContent = React.forwardRef<View, React.ComponentProps<typeof View>>(
    ({ style, ...props }, ref) => (
      <View ref={ref} style={[styles.cardContent, style]} {...props} />
    )
);
CardContent.displayName = "CardContent";

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        shadowColor: '#d3d3d3',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    cardContent: {
        padding: 20,
    }
});

export { Card, CardContent }; 