import * as React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof Pressable> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
  ({ children, style, disabled, loading, ...props }, ref) => {
    return (
      <Pressable
        ref={ref as React.Ref<any>}
        style={({ pressed }) =>
          [
            styles.button,
            (disabled || loading) && styles.disabled,
            pressed && !disabled && !loading && styles.pressed,
            style,
          ] as StyleProp<ViewStyle>
        }
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.text}>{children}</Text>
        )}
      </Pressable>
    );
  }
);
Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#9ca3af',
  },
  pressed: {
    backgroundColor: '#1e40af',
  },
});

export { Button }; 