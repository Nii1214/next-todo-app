import { useState } from "react";
import { Message, MessageType } from "@/types/message";

export function useMessage() {
    const [message, setMessage] = useState<Message | null>(null);

    const showMessage = (text: string, type: MessageType) => setMessage({ text, type });
    const clearMessage = () => setMessage(null);

    return { message, showMessage, clearMessage } as const;
}