import CharacterSheet from '@/components/concerns/characters/character-sheet';
import ClassRoutes from '@/components/routes/classes.routes';
import FeatureRoutes from '@/components/routes/features.routes';
import RaceRoutes from '@/components/routes/races.routes';
import SpellRoutes from '@/components/routes/spells.routes';
import * as S from './styled';
import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import { useGetAllRacesQuery } from '@/api/races.api';
import { useGetAllSpellsQuery } from '@/api/spells.api';
import ItemRoutes from '@/components/routes/items.route';
import { useGetAllItemsQuery } from '@/api/items.api';

export default function Workspace() {

    const queries = {
        dndClasses: useGetAllClassesQuery(),
        features: useGetAllFeaturesQuery(),
        races: useGetAllRacesQuery(),
        spells: useGetAllSpellsQuery(),
        items: useGetAllItemsQuery()
    };

    return(
        <S.Root>
            <ClassRoutes />
            <RaceRoutes />
            <FeatureRoutes />
            <SpellRoutes />
            <ItemRoutes />
            {queries.dndClasses.isSuccess &&
            queries.features.isSuccess &&
            queries.races.isSuccess &&
            queries.spells.isSuccess &&
            queries.items.isSuccess
            }
        </S.Root>
    )
}