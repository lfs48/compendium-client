import { Message, PostMessage } from '@/types';
import { rootApi } from './root.api';
import { APIMessage } from '@/types/Message';

interface MessageIndex {
    messages: APIMessage[]
}

export const messagesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessages: builder.query<MessageIndex, number>({
            query: (page) => `/messages?page=${page}`
        }),
        postMessage: builder.mutation<APIMessage, PostMessage>({
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
} = messagesApi;