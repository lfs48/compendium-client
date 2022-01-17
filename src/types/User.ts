export interface User {
    id: string;
    username: string;
}

export interface PatchUser {
    user: {
        id: string;
        username?: string;
        password?: string;
    }
}