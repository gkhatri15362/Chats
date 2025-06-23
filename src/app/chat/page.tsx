'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome to Chats App 👋</h1>
      <p>
        Go to <Link href="/chat">Chat Page</Link>
      </p>
    </main>
  );
}