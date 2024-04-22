export interface User {
    id: string;
    username: string;
    gm: boolean;
    color: string;
}

export interface PatchUser {
    user: {
        id: string;
        username?: string;
        password?: string;
        color?: string;
    }
}