import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TeacherLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerLargeTitle: true,
          headerRight: () => (
            <Pressable onPress={() => router.push('/(auth)/profile')}>
              <FontAwesome5 name="user-circle" size={24} color="#34495e" style={{ marginRight: 15 }} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
} 