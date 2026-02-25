import React, { createContext, useContext, useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "app";

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const initialAuthState: AuthContextType = {
  currentUser: null,
  isLoading: true,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthContextType>(initialAuthState);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setAuthState({
        currentUser: user,
        isLoading: false,
        isAuthenticated: user !== null,
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
