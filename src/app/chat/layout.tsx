'use client';
import { AuthProvider } from '@/contexts/AuthContext'; // make sure path sahi ho

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}