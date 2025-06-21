"use client";

import type { ReactNode } from 'react';
import React, { createContext, useEffect, useState } from 'react';
import type { User as FirebaseUser, AuthError } from 'firebase/auth';
import { 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  type UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { z } from 'zod';
import type { loginSchema, signupSchema } from '@/lib/schemas';

type User = FirebaseUser | null;

interface AuthResult {
  success: boolean;
  error?: string;
  user?: FirebaseUser; 
}

interface AuthContextType {
  user: User;
  loading: boolean;
  signUp: (values: z.infer<typeof signupSchema>) => Promise<AuthResult>;
  logIn: (values: z.infer<typeof loginSchema>) => Promise<AuthResult>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (values: z.infer<typeof signupSchema>): Promise<AuthResult> => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: authError.message };
    }
  };

  const logIn = async (values: z.infer<typeof loginSchema>): Promise<AuthResult> => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      const authError = error as AuthError;
      return { success: false, error: authError.message };
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error signing out: ", authError.message);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
