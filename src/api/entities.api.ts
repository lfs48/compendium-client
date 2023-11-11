import { DndClass, Feature, Race, Item, Spell } from '@/types';
import { rootApi } from './root.api';

interface EntitiesRes {
    dnd_classes: DndClass[],
    features: Feature[],
    races: Race[],
    items: Item[],
    spells: Spell[]
}

export const entitiesApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllEntities: builder.query<EntitiesRes, void>({
            query: () => `entities`
        })
    })
});

export const { 
    useGetAllEntitiesQuery,
} = entitiesApi;