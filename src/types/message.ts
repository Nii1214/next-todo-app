export type MessageType = "success" | "error" | "info";

export type Message = {
    text: string;
    type: MessageType;
};