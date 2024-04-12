export interface Message {
    id: string;
    body: string;
    kind: 'text' | 'roll';
    user: string;
    created_at: string;
}

export interface PostMessage {
    message: {
        body: string;
        kind: 'text' | 'roll';
        user_id: string;
    }
}