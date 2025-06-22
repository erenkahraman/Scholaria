import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Avatar = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.avatar, style]} {...props} />
  )
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<Image, React.ComponentProps<typeof Image>>(
    ({ style, ...props }, ref) => (
      <Image ref={ref} style={[styles.avatarImage, style]} {...props} />
    )
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<View, React.ComponentProps<typeof View> & {children: React.ReactNode}>(
    ({ style, children, ...props }, ref) => (
      <View ref={ref} style={[styles.avatarFallback, style]} {...props}>
        <Text style={styles.fallbackText}>{children}</Text>
      </View>
    )
);
AvatarFallback.displayName = "AvatarFallback";

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    avatarFallback: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4b5563',
    }
});

export { Avatar, AvatarImage, AvatarFallback }; 