import { GameEntity } from '@/types';
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
            {tabName(tab)}
        </S.Root>
    )
}

function tabName(tab:GameEntity) {
    switch(tab) {
        case('dndClasses'):
            return 'Classes';
        case('features'):
            return 'Features';
        default:
            return '';
    }
}