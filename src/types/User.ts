export interface User {
    id: string;
    username: string;
    gm: boolean;
}

export interface PatchUser {
    user: {
        id: string;
        username?: string;
        password?: string;
    }
}