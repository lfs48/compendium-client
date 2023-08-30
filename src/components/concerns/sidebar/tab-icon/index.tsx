import { Entity } from '@/enums';
import * as S from './styled';

interface TabIconProps {
    tab: Entity;
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