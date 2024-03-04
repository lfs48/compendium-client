import { Chat, Message, PostMessage } from '@/types';
import { rootApi } from './root.api';

export const chatsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getChat: builder.query<Chat, void>({
            query: () => `chats`
        }),
        postMessage: builder.mutation<Message, PostMessage>({
            query: ({...post}) => ({
                url: `/messages`,
                method: 'POST',
                body: post
            })
        })
    })
});

export const { 
    useGetChatQuery,
    usePostMessageMutation
} = chatsApi;