import { Message, PostMessage } from '@/types';
import { rootApi } from './root.api';

interface MessageIndex {
    messages: Message[]
}

export const chatsApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessages: builder.query<MessageIndex, void>({
            query: () => `/messages`
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
    useGetAllMessagesQuery,
    usePostMessageMutation
} = chatsApi;