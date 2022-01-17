import { Feature } from '@/types';
import { PatchFeature, PostFeature } from '@/types/Feature';
import { rootApi } from './root.api';

export const featureApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFeatures: builder.query<Feature[], void>({
            query: () => `features`
        }),
        getFeatureById: builder.query<Feature, string>({
            query: (id) => `features/${id}`
        }),
        postFeature: builder.mutation<Feature, PostFeature>({
            query: ({...post}) => ({
                url: `/features/${post.id}`,
                method: 'POST',
                body: post
            })
        }),
        patchFeature: builder.mutation<Feature, PatchFeature>({
            query: ({...patch}) => ({
                url: `/features/${patch.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteFeature: builder.mutation<Feature, string>({
            query: (id) => ({
                url: `/features/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetFeatureByIdQuery,
    useGetAllFeaturesQuery,
    usePostFeatureMutation,
    usePatchFeatureMutation
} = featureApi;