import CharacterSheet from '@/components/concerns/characters/character-sheet';
import BoonRoutes from '@/components/routes/boons.routes';
import ClassRoutes from '@/components/routes/classes.routes';
import FeatRoutes from '@/components/routes/feats.routes';
import FeatureRoutes from '@/components/routes/features.routes';
import RaceRoutes from '@/components/routes/races.routes';
import SpellRoutes from '@/components/routes/spells.routes';
import * as S from './styled';
import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllBoonsQuery } from '@/api/boons.api';
import { useGetAllFeatsQuery } from '@/api/feats.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import { useGetAllRacesQuery } from '@/api/races.api';
import { useGetAllSpellsQuery } from '@/api/spells.api';

export default function Workspace() {

    const queries = {
        dndClasses: useGetAllClassesQuery(),
        features: useGetAllFeaturesQuery(),
        races: useGetAllRacesQuery(),
        feats: useGetAllFeatsQuery(),
        boons: useGetAllBoonsQuery(),
        spells: useGetAllSpellsQuery()
    };

    return(
        <S.Root>
            <BoonRoutes />
            <ClassRoutes />
            <FeatRoutes />
            <FeatureRoutes />
            <RaceRoutes />
            <SpellRoutes />
            {queries.dndClasses.isSuccess &&
            queries.features.isSuccess &&
            queries.races.isSuccess &&
            queries.feats.isSuccess &&
            queries.boons.isSuccess &&
            queries.spells.isSuccess
            }
        </S.Root>
    )
}