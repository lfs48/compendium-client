import { GameEntity } from '@/types';
import { entityName } from '@/utils/entities.utils';
import * as S from './styled';

interface TabNameProps {
    tab: GameEntity;
    [prop: string]: any;
}

export default function TabName({
    tab,
    ...props
}: TabNameProps) {
    return(
        <S.Root 
            {...props}
        >
            {entityName(tab)}
        </S.Root>
    )
}