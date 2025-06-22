import * as React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

export interface InputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ label, style, ...props }, ref) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor="#9ca3af"
          {...props}
        />
      </View>
    );
  }
);
Input.displayName = 'Input';

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    input: {
        height: 48,
        width: '100%',
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#1f2937',
    },
});

export { Input }; 