import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useRouter, useSegments } from 'expo-router';
import { Alert } from 'react-native';

type Role = 'student' | 'teacher' | 'admin';

type Profile = {
  role: Role;
  full_name: string;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  effectiveRole?: Role;
  setEffectiveRole?: React.Dispatch<React.SetStateAction<Role>>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [effectiveRole, setEffectiveRole] = useState<Role>('student');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', currentSession.user.id).single();
        setProfile(data);
        setEffectiveRole(data?.role === 'admin' ? 'teacher' : data?.role);
      }
      setLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        const user = newSession?.user ?? null;
        setUser(user);

        if (user) {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .maybeSingle();
          
          if (error) {
            Alert.alert('Error', 'Failed to fetch user profile.');
            console.error(error);
            await supabase.auth.signOut();
          } else if (profileData) {
            setProfile(profileData);
            setEffectiveRole(profileData.role === 'admin' ? 'teacher' : profileData.role);
          } else {
            // This is the case where the user exists in auth but not in profiles
            Alert.alert(
              'Profile Incomplete',
              'Your user profile is missing. Please sign out and register again.',
              [{ text: 'Sign Out', onPress: () => supabase.auth.signOut() }]
            );
          }
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loading || !session || !profile) return;

    const currentGroup = segments[0];

    if ((effectiveRole === 'teacher' || effectiveRole === 'admin') && currentGroup !== '(teacher)') {
      router.replace('/(teacher)/dashboard');
    } else if (effectiveRole === 'student' && currentGroup !== '(student)') {
      router.replace('/(student)/dashboard');
    }
  }, [session, profile, effectiveRole, loading, segments]);

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, effectiveRole, setEffectiveRole }}>
      {children}
    </AuthContext.Provider>
  );
}; 