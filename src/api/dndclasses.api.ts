import { DndClass, PostDndClass, PatchDndClass } from '@/types';
import { rootApi } from './root.api';

interface IndexRes {
    dnd_classes: DndClass[];
}

export const dndClassApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllClasses: builder.query<IndexRes, void>({
            query: () => `classes`
        }),
        getClassById: builder.query<DndClass, string>({
            query: (id) => `classes/${id}`
        }),
        postClass: builder.mutation<DndClass, PostDndClass>({
            query: ({...post}) => ({
                url: `/classes`,
                method: 'POST',
                body: post
            })
        }),
        patchClass: builder.mutation<DndClass, PatchDndClass>({
            query: ({...patch}) => ({
                url: `/classes/${patch.dndclass.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteClass: builder.mutation<DndClass, string>({
            query: (id) => ({
                url: `/classes/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetClassByIdQuery,
    useGetAllClassesQuery,
    usePostClassMutation,
    usePatchClassMutation,
    useDeleteClassMutation
} = dndClassApi;