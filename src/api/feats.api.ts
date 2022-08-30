import { Feat, PatchFeat, PostFeat } from '@/types';
import { rootApi } from './root.api';

export const featApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFeats: builder.query<Feat[], void>({
            query: () => `feats`
        }),
        getFeatById: builder.query<Feat, string>({
            query: (id) => `feats/${id}`
        }),
        postFeat: builder.mutation<Feat, PostFeat>({
            query: ({...post}) => ({
                url: `/feats/${post.feat.id}`,
                method: 'POST',
                body: post
            })
        }),
        patchFeat: builder.mutation<Feat, PatchFeat>({
            query: ({...patch}) => ({
                url: `/feats/${patch.feat.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteFeat: builder.mutation<Feat, string>({
            query: (id) => ({
                url: `/feats/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetFeatByIdQuery,
    useGetAllFeatsQuery,
    usePostFeatMutation,
    usePatchFeatMutation,
    useDeleteFeatMutation
} = featApi;