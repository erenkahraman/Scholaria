import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Calendar, BookOpen, FileText, Bell } from 'lucide-react-native';
import { useAuth } from '@/lib/SessionProvider';

const overviewCards = [
    { title: "My Courses", action: "View All", icon: "📘", bgColor: '#ECFDF5', borderColor: '#6EE7B7' },
    { title: "Upcoming Deadlines", action: "Track", icon: "⏰", bgColor: '#FFF7ED', borderColor: '#FCD34D' },
    { title: "My Certificates", action: "Download", icon: "🎓", bgColor: '#EFF6FF', borderColor: '#93C5FD' },
    { title: "Performance Score", action: "Check", icon: "⭐", bgColor: '#FFF1F8', borderColor: '#F9A8D4' },
];

const quickAccess = [
    { title: "Assignments", icon: FileText, href: "#" },
    { title: "Calendar", icon: Calendar, href: "#" },
    { title: "Course Materials", icon: BookOpen, href: "#" },
];

const upcomingItems = [
    { date: "June 24, 2025", title: "Math Assignment Due", time: "23:59" },
    { date: "June 26, 2025", title: "Science Quiz", time: "10:00" },
    { date: "June 30, 2025", title: "English Project Presentation", time: "14:00" },
];

export default function StudentDashboard() {
    const { profile } = useAuth();
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Student Dashboard</Text>
                <Button style={styles.notificationButton}>
                    <Bell color="white" size={16} />
                    <Text style={styles.notificationButtonText}>Notifications</Text>
                </Button>
            </View>

            {/* Overview Cards */}
            <View style={styles.cardGrid}>
                {overviewCards.map((card, i) => (
                    <View key={i} style={[styles.overviewCard, {backgroundColor: card.bgColor, borderColor: card.borderColor}]}>
                        <View style={styles.overviewCardHeader}>
                            <Text style={styles.overviewCardIcon}>{card.icon}</Text>
                            <Text style={styles.overviewCardTitle}>{card.title}</Text>
                        </View>
                        <Pressable>
                            <Text style={styles.overviewCardAction}>{card.action} →</Text>
                        </Pressable>
                    </View>
                ))}
            </View>

            {/* Sections */}
            <View style={styles.sectionsContainer}>
                {/* Left Section */}
                <View style={styles.leftSection}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Quick Access</Text>
                        <View style={styles.quickAccessContainer}>
                            {quickAccess.map(({ title, icon: Icon }, i) => (
                                <Card key={i} style={styles.quickAccessCard}>
                                    <CardContent style={styles.quickAccessContent}>
                                        <Icon color="#4338ca" size={22} />
                                        <Text style={styles.quickAccessText}>{title}</Text>
                                    </CardContent>
                                </Card>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Continue Learning</Text>
                        <Card>
                            <CardContent style={{padding: 16}}>
                                <Text style={{fontWeight: '600', fontSize: 16}}>Advanced Calculus</Text>
                                <Text style={{fontSize: 12, color: '#6b7280', marginVertical: 4}}>Chapter 4: Integration</Text>
                                <Progress value={75} />
                            </CardContent>
                        </Card>
                    </View>
                </View>

                {/* Right Section */}
                <View style={styles.rightSection}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
                        <View style={{gap: 12}}>
                            {upcomingItems.map((item, i) => (
                                <Card key={i} style={styles.upcomingTaskCard}>
                                    <CardContent style={styles.upcomingTaskContent}>
                                        <Text style={styles.upcomingTaskDate}>{item.date}</Text>
                                        <Text style={styles.upcomingTaskTitle}>{item.title}</Text>
                                        <Text style={styles.upcomingTaskDate}>{item.time}</Text>
                                    </CardContent>
                                </Card>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb' },
    contentContainer: { padding: 24 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    headerTitle: { fontSize: 28, fontWeight: 'bold' },
    notificationButton: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#1d4ed8', paddingHorizontal: 16 },
    notificationButtonText: { color: 'white', fontWeight: '600' },
    
    cardGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 32 },
    overviewCard: { 
        borderRadius: 16, 
        padding: 20,
        flex: 1,
        minWidth: 150,
        minHeight: 140,
        justifyContent: 'space-between',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    overviewCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    overviewCardIcon: { fontSize: 24 },
    overviewCardTitle: { fontSize: 16, fontWeight: '600', flexShrink: 1 },
    overviewCardAction: { color: '#1d4ed8', fontWeight: '600', marginTop: 16 },

    sectionsContainer: { flexDirection: 'row', gap: 24, flexWrap: 'wrap' },
    leftSection: { flex: 2, gap: 24, minWidth: 300 },
    rightSection: { flex: 1, minWidth: 250 },
    section: {},
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },

    quickAccessContainer: { flexDirection: 'row', gap: 16 },
    quickAccessCard: { flex: 1, borderRadius: 12 },
    quickAccessContent: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
    quickAccessText: { fontSize: 14, fontWeight: '600' },

    upcomingTaskCard: { borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#4338ca' },
    upcomingTaskContent: { padding: 16 },
    upcomingTaskDate: { fontSize: 12, color: '#6b7280' },
    upcomingTaskTitle: { fontSize: 14, fontWeight: '600', marginVertical: 4 },
}); 