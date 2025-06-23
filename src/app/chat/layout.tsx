// app/chat/layout.tsx

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Yahan aap nav bar, header ya sidebar bhi daal sakte ho */}
      {children}
    </div>
  );
}