import { Spell, PostSpell, PatchSpell } from '@/types';
import { rootApi } from './root.api';

interface IndexRes {
    spells: Spell[];
}

export const spellApi = rootApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSpells: builder.query<IndexRes, void>({
            query: () => `spells`
        }),
        getSpellById: builder.query<Spell, string>({
            query: (id) => `spells/${id}`
        }),
        postSpell: builder.mutation<Spell, PostSpell>({
            query: ({...post}) => ({
                url: `/spells/${post.spell.id}`,
                method: 'POST',
                body: post
            })
        }),
        patchSpell: builder.mutation<Spell, PatchSpell>({
            query: ({...patch}) => ({
                url: `/spells/${patch.spell.id}`,
                method: 'PATCH',
                body: patch
            })
        }),
        deleteSpell: builder.mutation<Spell, string>({
            query: (id) => ({
                url: `/spells/${id}`,
                method: 'DELETE'
            })
        })
    })
});

export const { 
    useGetSpellByIdQuery,
    useGetAllSpellsQuery,
    usePostSpellMutation,
    usePatchSpellMutation,
    useDeleteSpellMutation
} = spellApi;