import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { Card, CardContent } from '@/components/ui/Card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Picker } from '@react-native-picker/picker';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (value: string) => {
    setEmail('');
    setPassword('');
    setFullName('');
    setLoading(false);
    setActiveTab(value as 'login' | 'register');
  };

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message.includes('Email not confirmed')) {
        Alert.alert(
          'Email Not Confirmed',
          'You must verify your email address before logging in. Please check your inbox for a confirmation link.'
        );
      } else {
        Alert.alert('Login Error', error.message);
      }
    }
    // On success, the SessionProvider will handle the redirect.
    setLoading(false);
  }

  async function handleRegister() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });

    if (error) {
      Alert.alert('Registration Error', error.message);
    } else {
      Alert.alert(
        'Registration Successful',
        'Please check your email and click the confirmation link to activate your account.'
      );
      handleTabChange('login');
    }
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Scholaria</Text>
        <Text style={styles.subtitle}>
          The tablet-friendly learning platform for students and teachers.
        </Text>
      </View>

      <Card style={styles.card}>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <View style={styles.formContainer}>
                <Input
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />
                <Button loading={loading} onPress={handleLogin} style={{ marginTop: 16 }}>
                  Sign In
                </Button>
                <Text style={styles.termsText}>
                  By signing in, you agree to Scholaria&apos;s Terms of Use
                </Text>
              </View>
            </TabsContent>

            <TabsContent value="register">
              <View style={styles.formContainer}>
                <Input
                  label="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                />
                <Input
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <Input
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  secureTextEntry
                />
                 <View>
                    <Text style={styles.label}>I am a...</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={role}
                        onValueChange={(itemValue: 'student' | 'teacher') => setRole(itemValue)}
                      >
                        <Picker.Item label="Student" value="student" />
                        <Picker.Item label="Teacher" value="teacher" />
                      </Picker>
                    </View>
                  </View>
                <Button loading={loading} onPress={handleRegister} style={{ marginTop: 16 }}>
                  Create Account
                </Button>
                <Text style={styles.termsText}>
                  By creating an account, you accept Scholaria&apos;s Terms
                </Text>
              </View>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d4ed8',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 450,
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      native: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }
    })
  },
  formContainer: {
    marginTop: 24,
    gap: 16,
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: 216,
      },
    }),
  },
}); 