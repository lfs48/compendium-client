import { Collection, PostCollection, PatchCollection } from '@/types';
import { rootApi } from './root.api';

export const collectionApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUserCollections: builder.query<Collection[], void>({
            query: () => `collections`
        }),
        getCollectionById: builder.query<Collection, string>({
            query: (id) => `collections/${id}`
        }),
        postCollection: builder.mutation<Collection, PostCollection>({
            query: ({...post}) => ({
                url: `/collections`,
                method: 'POST',
                body: post
            })
        }),
        patchCollection: builder.mutation<Collection, PatchCollection>({
            query: ({...patch}) => ({
                url: `/collections/${patch.collection.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteCollection: builder.mutation<Collection, string>({
            query: (id) => ({
                url: `/collections/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetCollectionByIdQuery,
    useGetAllUserCollectionsQuery,
    usePostCollectionMutation,
    usePatchCollectionMutation,
    useDeleteCollectionMutation
} = collectionApi;