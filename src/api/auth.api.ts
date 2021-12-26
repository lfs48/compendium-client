import { User } from '@interfaces/index';
import { rootApi } from './root.api';

interface AuthReqBody {
    user: {
        username: string;
        password: string;
    }
}

interface AuthResponse {
    user: User
    token: string;
}

export const authApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthReqBody>({
            query: (data) => ({
                url: `auth/login`,
                method: 'POST',
                body: data
            })
        }),
        register: builder.mutation<AuthResponse, AuthReqBody>({
            query: (data) => ({
                url: `auth/register`,
                method: 'POST',
                body: data
            })
        })
    }),
    overrideExisting: false
});

export const { 
    useLoginMutation,
    useRegisterMutation
} = authApi;