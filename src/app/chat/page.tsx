"use client";

import { useState } from 'react';
import { UserSearch, type SearchedUser } from '@/components/chat/UserSearch';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { useAuth } from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, MessagesSquare, ArrowLeft } from 'lucide-react';
import { RecentChats } from '@/components/chat/RecentChats';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const { user, loading } = useAuth(); 
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [activeChatPartner, setActiveChatPartner] = useState<SearchedUser | null>(null);

  const handleSelectUser = (searchedUser: SearchedUser) => {
    if (!user) {
      console.error("No logged in user to start chat with.");
      return;
    }
    const uids = [user.uid, searchedUser.uid].sort();
    const chatId = uids.join('_');
    
    setSelectedChatId(chatId);
    setActiveChatPartner(searchedUser);
  };

  const handleBack = () => {
    setSelectedChatId(null);
    setActiveChatPartner(null);
  }

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-4">
        <MessagesSquare className="h-12 w-12 animate-pulse text-primary" />
        <p className="mt-2 text-muted-foreground">Loading your chat experience...</p>
      </div>
    );
  }

  if (!user) {
    return (
       <div className="flex h-full flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
        <p className="text-muted-foreground">
          You need to be logged in to use the chat. Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[350px_1fr] h-full">
      {/* Left Panel: Search and Recent Chats */}
      {/* Hidden on mobile if a chat is active */}
      <div className={`
        ${activeChatPartner ? 'hidden' : 'flex'} 
        md:flex flex-col gap-4 p-4 border-r bg-card overflow-y-auto
      `}>
         <div>
          <h2 className="text-lg font-semibold mb-2 text-foreground">Find a User</h2>
          <UserSearch onSelectUser={handleSelectUser} />
        </div>
        <Separator />
        <div className="flex-1 flex flex-col min-h-0">
          <RecentChats onSelectChat={handleSelectUser} />
        </div>
      </div>

      {/* Right Panel: Chat Window */}
      {/* Hidden on mobile if NO chat is active */}
      <div className={`
        ${!activeChatPartner ? 'hidden' : 'flex'} 
        md:flex flex-col h-full
      `}>
        {activeChatPartner ? (
          <>
            <div className="p-3 border-b bg-secondary shadow-sm flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <p className="text-sm font-semibold text-secondary-foreground truncate">
                Chatting with: <span className="font-bold">{activeChatPartner.email}</span>
              </p>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ChatWindow chatId={selectedChatId} chatPartner={activeChatPartner} />
            </div>
          </>
        ) : (
           <div className="flex-1 items-center justify-center h-full hidden md:flex">
            <p className="text-muted-foreground text-center px-4">
              Select a user or a recent chat to start messaging.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
