import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Pressable } from 'react-native';
import Sidebar from '@/components/teacher/Sidebar';
import { Card, CardContent } from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, ClipboardList, FileText, Activity } from 'lucide-react-native';
import AdminRoleSwitcher from '@/components/admin/AdminRoleSwitcher';
import { useAuth } from '@/lib/SessionProvider';

const overviewCards = [
    { title: "Active Classes", action: "Manage", colors: ["#d1f9ff", "#e3fdfd"], icon: "🏫" },
    { title: "Total Assignments", action: "View", colors: ["#e5ddff", "#f3efff"], icon: "📝" },
    { title: "Students Enrolled", action: "See List", colors: ["#ffeccc", "#fff4e6"], icon: "👨‍🎓" },
    { title: "Upcoming Workshops", action: "Prepare", colors: ["#cfe4ff", "#e6f0ff"], icon: "🛠️" },
];

const quickAccess = [
    { title: "Grade Submissions", icon: ClipboardList, link: "#" },
    { title: "Create Assignment", icon: FileText, link: "#" },
    { title: "Analytics", icon: Activity, link: "#" },
];

const upcomingEvents = [
    { date: "June 24, 2025", title: "Parent Meeting", time: "14:00" },
    { date: "June 26, 2025", title: "Final Exam - Class 8B", time: "10:00" },
    { date: "June 30, 2025", title: "Workshop: AI in Education", time: "16:00" },
];

const TeacherDashboard = () => {
    const { profile } = useAuth();
    return (
        <View style={styles.container}>
            <Sidebar />
            <ScrollView style={styles.mainContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Teaching Dashboard</Text>
                    <Pressable style={styles.notificationButton}>
                        <Bell size={18} color="white" />
                        <Text style={styles.notificationButtonText}>Notifications</Text>
                    </Pressable>
                </View>

                {/* Overview Cards */}
                <FlatList
                    data={overviewCards}
                    numColumns={4}
                    scrollEnabled={false}
                    columnWrapperStyle={{ gap: 24 }}
                    contentContainerStyle={{ marginBottom: 40 }}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <LinearGradient colors={item.colors as any} style={styles.overviewCard}>
                            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                <View style={styles.overviewCardHeader}>
                                    <Text style={styles.overviewCardIcon}>{item.icon}</Text>
                                    <Text style={styles.overviewCardTitle}>{item.title}</Text>
                                </View>
                                <Pressable>
                                    <Text style={styles.overviewCardAction}>{item.action} →</Text>
                                </Pressable>
                            </View>
                        </LinearGradient>
                    )}
                />

                {/* Quick Access */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Access</Text>
                    <View style={styles.quickAccessContainer}>
                        {quickAccess.map(({ title, icon: Icon }, i) => (
                            <Card key={i} style={styles.quickAccessCard}>
                                <CardContent style={styles.quickAccessContent}>
                                    <Icon size={20} color="#0284c7" />
                                    <Text style={styles.quickAccessText}>{title}</Text>
                                </CardContent>
                            </Card>
                        ))}
                    </View>
                </View>

                {/* Upcoming Events */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Events</Text>
                    <View style={styles.eventsContainer}>
                        {upcomingEvents.map((event, i) => (
                            <Card key={i} style={styles.eventCard}>
                                <CardContent style={styles.eventContent}>
                                    <Text style={styles.eventDate}>{event.date}</Text>
                                    <Text style={styles.eventTitle}>{event.title}</Text>
                                    <Text style={styles.eventTime}>{event.time}</Text>
                                </CardContent>
                            </Card>
                        ))}
                    </View>
                </View>
            </ScrollView>
            {profile?.role === 'admin' && <AdminRoleSwitcher />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', flex: 1, backgroundColor: '#f8fafc' },
    mainContent: { flex: 1, padding: 32 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    headerTitle: { fontSize: 24, fontWeight: '600', color: '#1e293b' },
    notificationButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
    notificationButtonText: { color: 'white', fontWeight: '500' },
    overviewCard: { flex: 1, borderRadius: 16, padding: 20, height: 140, shadowColor: '#9ca3af', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
    overviewCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    overviewCardIcon: { fontSize: 24 },
    overviewCardTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b', flexShrink: 1 },
    overviewCardAction: { fontSize: 14, fontWeight: '500', color: '#0284c7' },
    section: { marginBottom: 40 },
    sectionTitle: { fontSize: 20, fontWeight: '600', color: '#1e293b', marginBottom: 12 },
    quickAccessContainer: { flexDirection: 'row', gap: 16 },
    quickAccessCard: { flex: 1, borderRadius: 12 },
    quickAccessContent: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 },
    quickAccessText: { fontSize: 14, fontWeight: '500', color: '#334155' },
    eventsContainer: { flexDirection: 'row', gap: 16 },
    eventCard: { flex: 1, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#3b82f6', backgroundColor: 'white' },
    eventContent: { padding: 16 },
    eventDate: { fontSize: 12, color: '#64748b', marginBottom: 4 },
    eventTitle: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
    eventTime: { fontSize: 12, color: '#64748b', marginTop: 2 }
});

export default TeacherDashboard; 