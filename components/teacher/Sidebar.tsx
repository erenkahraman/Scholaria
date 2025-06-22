import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/lib/SessionProvider';
import { supabase } from '@/lib/supabase';
import {
  ClipboardList,
  BookOpen,
  Users,
  Presentation,
  BarChart2,
  MessageCircle,
  Calendar,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react-native';

const Sidebar = () => {
  const { profile } = useAuth();
  const nameParts = profile?.full_name?.split(' ');
  const fallback = nameParts ? (nameParts[0]?.[0] ?? '') + (nameParts[1]?.[0] ?? '') : 'T';

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <Avatar>
            {/* The user avatar image is not yet in the DB, so we use a fallback */}
            <AvatarFallback>{fallback.toUpperCase()}</AvatarFallback>
          </Avatar>
          <View>
            <Text style={styles.profileName}>{profile?.full_name ?? 'Teacher'}</Text>
            <Text style={styles.profileEmail}>{profile?.role ?? 'Role'}</Text>
          </View>
        </View>

        <View style={styles.navContainer}>
          <Pressable style={styles.navButton}><ClipboardList size={16} color="#4b5563" /><Text style={styles.navText}>Assignments</Text></Pressable>
          <Pressable style={styles.navButton}><BookOpen size={16} color="#4b5563" /><Text style={styles.navText}>My Courses</Text></Pressable>
          <Pressable style={styles.navButton}><Users size={16} color="#4b5563" /><Text style={styles.navText}>My Classes</Text></Pressable>
          <Pressable style={styles.navButton}><Presentation size={16} color="#4b5563" /><Text style={styles.navText}>Workshops</Text></Pressable>
          <Pressable style={styles.navButton}><BarChart2 size={16} color="#4b5563" /><Text style={styles.navText}>Analytics</Text></Pressable>
          <Pressable style={styles.navButton}><MessageCircle size={16} color="#4b5563" /><Text style={styles.navText}>Messages</Text></Pressable>
          <Pressable style={styles.navButton}><Calendar size={16} color="#4b5563" /><Text style={styles.navText}>Calendar</Text></Pressable>
        </View>

        <View style={styles.labelsContainer}>
          <Text style={styles.labelsTitle}>Labels</Text>
          <View style={styles.badgeContainer}>
            <Badge variant="outline">Course Design</Badge>
            <Badge variant="outline">Assessment</Badge>
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Pressable style={styles.navButton}><Settings size={16} color="#4b5563" /><Text style={styles.navText}>System Settings</Text></Pressable>
        <Pressable style={styles.navButton}><HelpCircle size={16} color="#4b5563" /><Text style={styles.navText}>Help Center</Text></Pressable>
        <Pressable style={styles.logoutButton} onPress={() => supabase.auth.signOut()}>
            <LogOut size={16} color="#4b5563" />
            <Text style={styles.navText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    padding: 16,
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  profileEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  navContainer: {
    gap: 8,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  navText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  labelsContainer: {
    marginTop: 32,
  },
  labelsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  badgeContainer: {
      gap: 4,
      paddingHorizontal: 8,
  },
  footerContainer: {
      gap: 8,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  }
});

export default Sidebar; 