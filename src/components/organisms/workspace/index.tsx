import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import ClassRoutes from '@/components/routes/classes.routes';
import * as S from './styled';

export default function Workspace() {

    const getClassesQuery = useGetAllClassesQuery ();

    return(
        <S.Root>
            <ClassRoutes />
        </S.Root>
    )
}