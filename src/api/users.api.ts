import { User, PatchUser } from '@/types';
import { rootApi } from './root.api';

export const userApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<User, string>({
            query: (id) => `users/${id}`
        }),
        updateUser: builder.mutation<User, PatchUser>({
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