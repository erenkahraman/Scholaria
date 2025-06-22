import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { useAuth } from '@/lib/SessionProvider';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { LogOut, Settings, HelpCircle, BookOpen, Calendar, FileText, BarChart3, MessageSquare } from 'lucide-react-native';

const sidebarNavItems = [
    { title: 'My Courses', icon: BookOpen, href: '/(student)/dashboard' },
    { title: 'Assignments', icon: FileText, href: '/(student)/dashboard' },
    { title: 'Calendar', icon: Calendar, href: '/(student)/dashboard' },
    { title: 'My Progress', icon: BarChart3, href: '/(student)/dashboard' },
    { title: 'Messages', icon: MessageSquare, href: '/(student)/dashboard' },
];

export default function StudentSidebar() {
  const { profile, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // The SessionProvider will handle the redirect to the login screen
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileContainer}>
          <Avatar>
            <AvatarImage source={{ uri: 'https://github.com/shadcn.png' }} />
            <AvatarFallback>ST</AvatarFallback>
          </Avatar>
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{profile?.full_name || 'Student'}</Text>
            <Text style={styles.profileEmail}>{user?.email || ''}</Text>
          </View>
        </View>

        <View style={styles.navContainer}>
          {sidebarNavItems.map((item, index) => (
            <Pressable key={index} style={styles.navButton} onPress={() => router.push(item.href as any)}>
              <item.icon color="#4b5563" size={20} />
              <Text style={styles.navButtonText}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View>
        <Pressable style={styles.navButton}>
            <Settings color="#4b5563" size={20} />
            <Text style={styles.navButtonText}>Settings</Text>
        </Pressable>
        <Pressable style={styles.navButton}>
            <HelpCircle color="#4b5563" size={20} />
            <Text style={styles.navButtonText}>Help</Text>
        </Pressable>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color="white" size={20} />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: 280,
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'space-between',
        borderRightWidth: 1,
        borderRightColor: '#e5e7eb',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    profileTextContainer: {
        marginLeft: 12,
    },
    profileName: {
        fontSize: 16,
        fontWeight: '600',
    },
    profileEmail: {
        fontSize: 12,
        color: '#6b7280',
    },
    navContainer: {
        gap: 8,
    },
    navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
    },
    navButtonText: {
        marginLeft: 16,
        fontSize: 16,
        color: '#374151',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#ef4444',
        marginTop: 8,
    },
    logoutButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    }
}); 