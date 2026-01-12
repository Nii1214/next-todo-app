import { useState } from "react";

type MessageType = "success" | "error" | "info";

export function useMessage(){
    const [message, setMessage] = useState<{text: string; type: MessageType} | null > ( null );

    const showMessage = (text: string , type: MessageType) => setMessage({text, type});
    const clearMessage = () => setMessage(null);

    return {message , showMessage , clearMessage} as const;
}