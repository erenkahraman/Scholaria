import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a <Tabs> component.');
  }
  return context;
};

// Tabs Container
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
}) => {
  const [internalActiveTab, setInternalActiveTab] = React.useState(
    defaultValue || ''
  );

  const activeTab = value !== undefined ? value : internalActiveTab;

  const setActiveTab = (newValue: string) => {
    if (!value) {
      setInternalActiveTab(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <View>{children}</View>
    </TabsContext.Provider>
  );
};

// Tabs List
const TabsList = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.tabsList}>{children}</View>
);

// Tabs Trigger
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children }) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <Pressable
      style={[styles.trigger, isActive && styles.activeTrigger]}
      onPress={() => setActiveTab(value)}
    >
      <Text style={[styles.triggerText, isActive && styles.activeTriggerText]}>
        {children}
      </Text>
    </Pressable>
  );
};

// Tabs Content
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  return <View>{children}</View>;
};

const styles = StyleSheet.create({
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
    padding: 4,
  },
  trigger: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  activeTrigger: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeTriggerText: {
    color: '#1d4ed8',
  },
});

export { Tabs, TabsList, TabsTrigger, TabsContent }; 