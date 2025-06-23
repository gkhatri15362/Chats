// src/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'Chats App',
  description: 'Chat with people easily!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}