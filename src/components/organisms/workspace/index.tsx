import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import ClassRoutes from '@/components/routes/classes.routes';
import FeatureRoutes from '@/components/routes/features.routes';
import * as S from './styled';

export default function Workspace() {

    const getClassesQuery = useGetAllClassesQuery ();

    return(
        <S.Root>
            <ClassRoutes />
            <FeatureRoutes />
        </S.Root>
    )
}