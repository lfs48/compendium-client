import CharacterSheet from '@/components/concerns/characters/character-sheet';
import ClassRoutes from '@/components/routes/classes.routes';
import FeatureRoutes from '@/components/routes/features.routes';
import RaceRoutes from '@/components/routes/races.routes';
import SpellRoutes from '@/components/routes/spells.routes';
import * as S from './styled';
import ItemRoutes from '@/components/routes/items.route';
import { useGetAllEntitiesQuery } from '@/api/entities.api';

export default function Workspace() {

    const {isSuccess} = useGetAllEntitiesQuery();

    return(
        <S.Root>
            {isSuccess &&
                <>
                <ClassRoutes />
                <RaceRoutes />
                <FeatureRoutes />
                <SpellRoutes />
                <ItemRoutes />
                </>
            }
        </S.Root>
    )
}