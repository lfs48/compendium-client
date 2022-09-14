import { Boon, PostBoon, PatchBoon } from '@/types';
import { rootApi } from './root.api';

export const boonApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBoons: builder.query<Boon[], void>({
            query: () => `boons`
        }),
        getBoonById: builder.query<Boon, string>({
            query: (id) => `boons/${id}`
        }),
        postBoon: builder.mutation<Boon, PostBoon>({
            query: ({...post}) => ({
                url: `/boons/${post.boon.id}`,
                method: 'POST',
                body: post
            })
        }),
        patchBoon: builder.mutation<Boon, PatchBoon>({
            query: ({...patch}) => ({
                url: `/boons/${patch.boon.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteBoon: builder.mutation<Boon, string>({
            query: (id) => ({
                url: `/boons/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetBoonByIdQuery,
    useGetAllBoonsQuery,
    usePostBoonMutation,
    usePatchBoonMutation,
    useDeleteBoonMutation
} = boonApi;