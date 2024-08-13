"use client";

import {
  InitialChatRoomMessages,
  markMessagesAsRead,
  saveMessage,
} from "@/actions/chats";
import { SUPABASE_URL, SUPABASE_KEY } from "@/constants/config";
import { formatToTimeAgo } from "@/lib/utils";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "../common/SubmitButton";

interface IChatMessagesProps {
  initialMessages: InitialChatRoomMessages;
  userId: number;
  username: string;
  avatar: string;
  chatRoomId: string;
}

export default function ChatMessages({
  initialMessages,
  userId,
  username,
  avatar,
  chatRoomId,
}: IChatMessagesProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);
  const channel = useRef<RealtimeChannel>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // 채팅방 둘이 동시에 있으면 서로에게 isRead: true,
    const isRead = onlineUsers > 1;
    const newMessage = {
      id: Date.now(),
      payload: message,
      created_at: new Date(),
      userId,
      user: {
        username,
        avatar,
      },
      isRead,
    };
    setMessages((prevMsgs) => [...prevMsgs, newMessage]);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: newMessage,
    });
    await saveMessage(message, chatRoomId, isRead);
    setMessage("");
  };

  // 브라우저 뒤로가기 이후 다시 접속했을 때 바뀐 부모의 DB 값을 반영하기 위한 함수
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    const client = createClient(String(SUPABASE_URL), String(SUPABASE_KEY));
    channel.current = client.channel(`chatRoom-${chatRoomId}`, {
      config: {
        presence: {
          key: String(userId),
        },
      },
    });
    // 이 함수는 채팅방에 접속해있는 모든 이에게 적용
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .on("presence", { event: "sync" }, () => {
        const newState = channel.current!.presenceState();
        const onlineUsers = Object.keys(newState).length;
        if (onlineUsers > 1) {
          markMessagesAsRead(chatRoomId);
        }
        setOnlineUsers(onlineUsers);
      })
      .subscribe();

    // Presence 상태 추적
    channel.current.track({
      online_at: new Date().toISOString(),
      userId,
    });

    markMessagesAsRead(chatRoomId);

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId, userId]);

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
      {messages.map((message, index) => {
        const isLastMessage = index === messages.length - 1;
        return (
          <div
            key={message.id}
            className={`flex gap-2 items-start ${
              message.userId === userId ? "justify-end" : ""
            }`}
          >
            {message.userId === userId ? null : (
              <Image
                src={message.user.avatar!}
                alt={message.user.username}
                width={50}
                height={50}
                className="size-8 rounded-full"
              />
            )}
            <div
              className={`flex flex-col gap-1 ${
                message.userId === userId ? "items-end" : ""
              }`}
            >
              <span
                className={`${
                  message.userId === userId
                    ? "bg-emerald-500"
                    : "bg-neutral-500"
                } p-2.5 rounded-md`}
              >
                {message.payload}
              </span>
              <div className="flex gap-2">
                <span className="text-xs">
                  {formatToTimeAgo(message.created_at.toString())}
                </span>
                {isLastMessage && (
                  <span className="text-xs">
                    {message.isRead ? "읽음" : "읽지 않음"}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="메시지 보내기..."
        />
        <SubmitButton variant="none" size="icon" className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-primary transition-colors hover:text-primary-hover" />
        </SubmitButton>
      </form>
    </div>
  );
}
