import { GameEntity } from '@/types';
import * as S from './styled';

interface TabIconProps {
    tab: GameEntity;
    selected: boolean;
    [prop: string]: any;
}

export default function TabIcon({
    tab,
    selected,
    ...props
}: TabIconProps) {
    return(
        <S.Root 
            $tab={tab}
            $selected={selected}
            {...props}
        >

        </S.Root>
    )
}