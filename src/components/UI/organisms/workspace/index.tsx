import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import BoonRoutes from '@/components/routes/boons.routes';
import ClassRoutes from '@/components/routes/classes.routes';
import FeatRoutes from '@/components/routes/feats.routes';
import FeatureRoutes from '@/components/routes/features.routes';
import RaceRoutes from '@/components/routes/races.routes';
import SpellRoutes from '@/components/routes/spells.routes';
import * as S from './styled';

export default function Workspace() {

    const getClassesQuery = useGetAllClassesQuery ();

    return(
        <S.Root>
            <BoonRoutes />
            <ClassRoutes />
            <FeatRoutes />
            <FeatureRoutes />
            <RaceRoutes />
            <SpellRoutes />
        </S.Root>
    )
}