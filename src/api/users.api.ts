import { User } from '@/types';
import { rootApi } from './root.api';

interface PatchUser {
    user: {
        id: string;
        username?: string;
        password?: string;
    }
}

interface UserResponse {
    user: User,
    token?: string;
}

export const userApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<UserResponse, string>({
            query: (id) => `users/${id}`
        }),
        updateUser: builder.mutation<UserResponse, PatchUser>({
            query: ({...patch}) => ({
                url: `/${patch.user.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
    })
});

export const { 
    useGetUserByIdQuery, 
    useUpdateUserMutation 
} = userApi;