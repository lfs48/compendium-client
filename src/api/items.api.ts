import { Item } from '@/types';
import { PatchItem, PostItem } from '@/types/Item';
import { rootApi } from './root.api';

interface IndexRes {
    items: Item[];
}

export const itemApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query<IndexRes, void>({
            query: () => `items`
        }),
        getItemById: builder.query<Item, string>({
            query: (id) => `items/${id}`
        }),
        postItem: builder.mutation<Item, PostItem>({
            query: ({...post}) => ({
                url: `/items/${post.item.id}`,
                method: 'POST',
                body: post
            })
        }),
        patchItem: builder.mutation<Item, PatchItem>({
            query: ({...patch}) => ({
                url: `/items/${patch.item.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteItem: builder.mutation<Item, string>({
            query: (id) => ({
                url: `/items/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetItemByIdQuery,
    useGetAllItemsQuery,
    usePostItemMutation,
    usePatchItemMutation,
    useDeleteItemMutation
} = itemApi;