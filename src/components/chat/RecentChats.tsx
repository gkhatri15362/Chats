"use client";

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Users } from 'lucide-react';
import type { SearchedUser } from './UserSearch';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecentChat {
  chatId: string;
  partner: SearchedUser;
}

interface RecentChatsProps {
  onSelectChat: (user: SearchedUser) => void;
}

export function RecentChats({ onSelectChat }: RecentChatsProps) {
  const { user } = useAuth();
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef,
      where('users', 'array-contains', user.uid),
      orderBy('lastMessageTimestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats: RecentChat[] = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        const partnerUid = data.users.find((uid: string) => uid !== user.uid);
        if (partnerUid && data.userEmails && data.userEmails[partnerUid]) {
          chats.push({
            chatId: doc.id,
            partner: {
              uid: partnerUid,
              email: data.userEmails[partnerUid],
            },
          });
        }
      });
      setRecentChats(chats);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching recent chats: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-2 text-foreground flex items-center gap-2">
        <Users className="h-5 w-5" /> Recent Chats
      </h2>
      
      {isLoading && (
        <div className="space-y-2 pt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 rounded-md p-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && recentChats.length === 0 && (
         <div className="flex-1 flex items-center justify-center">
            <p className="text-center text-sm text-muted-foreground p-4">
                No recent chats.
            </p>
        </div>
      )}

      {!isLoading && recentChats.length > 0 && (
        <ScrollArea className="flex-1 rounded-md border">
          <div className="p-2 space-y-1">
            {recentChats.map(({ chatId, partner }) => (
              <li key={chatId} className="list-none">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-2"
                  onClick={() => onSelectChat(partner)}
                >
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback>{partner.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-normal truncate">{partner.email}</span>
                </Button>
              </li>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
      }
