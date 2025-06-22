import { Stack } from 'expo-router';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import StudentSidebar from '@/components/student/StudentSidebar';
import AdminRoleSwitcher from '@/components/admin/AdminRoleSwitcher';
import { useAuth } from '@/lib/SessionProvider';

export default function StudentLayout() {
  const { width } = useWindowDimensions();
  const { profile } = useAuth();
  const isTabletOrLarger = width >= 768;

  if (!isTabletOrLarger) {
    // For smaller screens, just show the stack navigator
    return (
        <Stack>
            <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        </Stack>
    );
  }

  return (
    <View style={styles.container}>
      <StudentSidebar />
      <View style={styles.mainContent}>
        <Stack>
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        </Stack>
      </View>
      {profile?.role === 'admin' && <AdminRoleSwitcher />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#f9fafb', // gray-50
  },
}); 