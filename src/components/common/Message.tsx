'use client'

import { Message as MessageType } from "@/types/message";

type Props = MessageType;

export default function Message({ text, type }: Props) {
    let colorClass = "";
    switch (type) {
        case "success": colorClass = "text-green-600"; break;
        case "error": colorClass = "text-red-600"; break;
        case "info": colorClass = "text-blue-600"; break;
    }

    return <p className={colorClass}>{text}</p>;
}
