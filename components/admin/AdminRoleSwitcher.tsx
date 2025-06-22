import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useAuth } from '@/lib/SessionProvider';
import { Users, GraduationCap } from 'lucide-react-native';

const AdminRoleSwitcher = () => {
  const { effectiveRole, setEffectiveRole } = useAuth();

  if (!setEffectiveRole) return null;

  const isViewingAsTeacher = effectiveRole === 'teacher';

  const handleSwitch = () => {
    setEffectiveRole(isViewingAsTeacher ? 'student' : 'teacher');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Admin View:</Text>
      <Pressable onPress={handleSwitch} style={styles.button}>
        {isViewingAsTeacher ? (
          <GraduationCap size={16} color="#4f46e5" />
        ) : (
          <Users size={16} color="#4f46e5" />
        )}
        <Text style={styles.buttonText}>
          Switch to {isViewingAsTeacher ? 'Student' : 'Teacher'} View
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -150 }],
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 99,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  },
  label: {
    fontWeight: '600',
    marginRight: 10,
    fontSize: 14,
    color: '#374151',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e0e7ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
  },
  buttonText: {
    fontWeight: '600',
    color: '#4f46e5',
    fontSize: 14,
  },
});

export default AdminRoleSwitcher; 