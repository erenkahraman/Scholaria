import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// This is a simplified version for React Native.
// We'll use StyleSheet instead of class-variance-authority for styling.

const badgeStyles = StyleSheet.create({
    base: {
        alignSelf: 'flex-start',
        borderRadius: 999,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginVertical: 2,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
    outline: {
        borderColor: '#e5e7eb',
        backgroundColor: 'transparent',
    },
    outlineText: {
        color: '#4b5563',
    }
});


export interface BadgeProps extends React.ComponentProps<typeof Text>, VariantProps<typeof badgeVariants> {}

function Badge({ style, variant, ...props }: BadgeProps) {
    // For now, only implementing the 'outline' variant as seen in the example
    const variantStyle = badgeStyles.outline;
    const textVariantStyle = badgeStyles.outlineText;
  
    return (
        <Text style={[badgeStyles.base, variantStyle, style]} {...props}>
            <Text style={[badgeStyles.text, textVariantStyle]}>
                {props.children}
            </Text>
        </Text>
    );
}

export { Badge, badgeVariants }; 