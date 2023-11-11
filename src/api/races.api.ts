import { Race, PostRace, PatchRace } from '@/types';
import { rootApi } from './root.api';

interface IndexRes {
    races: Race[];
}

export const raceApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRaces: builder.query<IndexRes, void>({
            query: () => `races`
        }),
        getRaceById: builder.query<Race, string>({
            query: (id) => `races/${id}`
        }),
        postRace: builder.mutation<Race, PostRace>({
            query: ({...post}) => ({
                url: `/races`,
                method: 'POST',
                body: post
            })
        }),
        patchRace: builder.mutation<Race, PatchRace>({
            query: ({...patch}) => ({
                url: `/races/${patch.race.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteRace: builder.mutation<Race, string>({
            query: (id) => ({
                url: `/races/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetRaceByIdQuery,
    useGetAllRacesQuery,
    usePostRaceMutation,
    usePatchRaceMutation,
    useDeleteRaceMutation
} = raceApi;