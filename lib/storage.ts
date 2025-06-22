import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// A simple, platform-aware key-value storage adapter.
// - Uses SecureStore on native for encrypted persistence.
// - Uses localStorage on web for standard browser persistence.
// - Provides a no-op (do nothing) fallback for server-side rendering (SSR).

const createStorage = () => {
  // Check for web platform and the actual availability of localStorage
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
    return {
      getItem: (key: string) => {
        return Promise.resolve(window.localStorage.getItem(key));
      },
      setItem: (key: string, value: string) => {
        window.localStorage.setItem(key, value);
        return Promise.resolve();
      },
      removeItem: (key: string) => {
        window.localStorage.removeItem(key);
        return Promise.resolve();
      },
    };
  }

  // Check for native platforms
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
      return {
        getItem: (key: string) => {
          return SecureStore.getItemAsync(key);
        },
        setItem: (key: string, value: string) => {
          return SecureStore.setItemAsync(key, value);
        },
        removeItem: (key: string) => {
          return SecureStore.deleteItemAsync(key);
        },
      };
  }

  // Fallback for SSR or other environments is a no-op storage
  return {
    getItem: (_key: string) => {
      console.log('Storage (SSR): getItem');
      return Promise.resolve(null);
    },
    setItem: (_key: string, _value: string) => {
      console.log('Storage (SSR): setItem');
      return Promise.resolve();
    },
    removeItem: (_key: string) => {
      console.log('Storage (SSR): removeItem');
      return Promise.resolve();
    },
  };
};

export const storage = createStorage(); 