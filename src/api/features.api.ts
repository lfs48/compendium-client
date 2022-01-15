import { DndClass, PostDndClass, PatchDndClass, Feature } from '@/types';
import { PatchFeature, PostFeature } from '@/types/Feature';
import { rootApi } from './root.api';

interface Res {
    feature: Feature;
}

interface GetAllFeaturesRes {
    features: Feature[];
}

export const featureApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFeatures: builder.query<GetAllFeaturesRes, void>({
            query: () => `features`
        }),
        getFeatureById: builder.query<Res, string>({
            query: (id) => `features/${id}`
        }),
        postFeature: builder.mutation<Res, PostFeature>({
            query: ({...post}) => ({
                url: `/features/${post.id}`,
                method: 'POST',
                body: post
            })
        }),
        patchFeature: builder.mutation<Res, PatchFeature>({
            query: ({...patch}) => ({
                url: `/features/${patch.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteFeature: builder.mutation<Res, string>({
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