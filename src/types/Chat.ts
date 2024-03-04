export interface Chat {
    id: string;
    title: string;
    messages: Message[];
}

export interface Message {
    id: string;
    body: string;
    kind: 'text' | 'roll';
    chat_id: string;
    user_id: string;
    created_at: string;
}

export interface PostMessage {
    message: {
        body: string;
        kind: 'text' | 'roll';
        chat_id: string;
        user_id: string;
    }
}