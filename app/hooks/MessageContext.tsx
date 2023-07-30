"use client";
import { createContext, useState } from "react";

interface Message {
  status: string;
  message: string;
  continue: boolean;
}

export const initialMessage: Message = {
  status: "",
  message: "",
  continue: false,
};
export const MessageData = createContext({
  message: initialMessage,
  setMessage: (newMessage: Message) => {},
});

const MessageContext = ({ children }: any) => {
  const [message, setMessage] = useState<Message>(initialMessage);

  return <MessageData.Provider value={{ message, setMessage }}>{children}</MessageData.Provider>;
};

export default MessageContext;
