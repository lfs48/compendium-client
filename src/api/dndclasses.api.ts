import { DndClass, PostDndClass, PatchDndClass } from '@/types';
import { rootApi } from './root.api';

interface Res {
    dndclass: DndClass;
}

interface GetAllClassesRes {
    dndclasses: DndClass[];
}

export const dndClassApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClasses: builder.query<GetAllClassesRes, void>({
            query: () => `classes`
        }),
        getClassById: builder.query<Res, string>({
            query: (id) => `classes/${id}`
        }),
        postClass: builder.mutation<Res, PostDndClass>({
            query: ({...post}) => ({
                url: `/${post.id}`,
                method: 'POST',
                body: post
            })
        }),
        patchClass: builder.mutation<Res, PatchDndClass>({
            query: ({...patch}) => ({
                url: `/${patch.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteClass: builder.mutation<Res, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetClassByIdQuery,
    useGetAllClassesQuery,
    usePostClassMutation,
    usePatchClassMutation
} = dndClassApi;