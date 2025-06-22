import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const MOCK_ASSIGNMENTS = [
  { id: '1', title: 'Algebra II - Chapter 5 Quiz', class: '8/B Math', dueDate: 'Tomorrow', status: 'Graded' },
  { id: '2', title: 'Newton\'s Laws Worksheet', class: '9/A Physics', dueDate: 'In 3 days', status: 'In Progress' },
  { id: '3', title: 'The Great Gatsby - Essay', class: '10/C English', dueDate: 'Next Week', status: 'Not Started' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Graded': return '#27ae60';
    case 'In Progress': return '#f39c12';
    default: return '#7f8c8d';
  }
};

const AssignmentItem = ({ item }: { item: typeof MOCK_ASSIGNMENTS[0] }) => (
  <View style={styles.itemContainer}>
    <FontAwesome5 name="file-alt" size={24} color="#5f6368" style={styles.itemIcon} />
    <View style={styles.itemTextContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemSubtitle}>{item.class} • Due: {item.dueDate}</Text>
    </View>
    <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
        <Text style={styles.itemStatus}>{item.status}</Text>
    </View>
  </View>
);

const AssignmentsOverview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Assignments</Text>
      <FlatList
        data={MOCK_ASSIGNMENTS}
        renderItem={({ item }) => <AssignmentItem item={item} />}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c4043',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  itemIcon: {
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#3c4043',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#5f6368',
    marginTop: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginRight: 6,
  },
  itemStatus: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#5f6368',
  }
});

export default AssignmentsOverview; 