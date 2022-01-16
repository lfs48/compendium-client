import TabIcon from '@/components/atoms/tab-icon';
import TabName from '@/components/atoms/tab-name';
import { GameEntity } from '@/types';
import * as S from './styled';

interface SidebarTabSelectProps {
    tab: GameEntity;
    selected: boolean;
    handleSelect: () => void;
    [prop: string]: any;
}

export default function SidebarTabSelect({
    tab,
    selected,
    handleSelect,
    ...props
}: SidebarTabSelectProps) {
    return(
        <S.Root
            $selected={selected}
            onClick={handleSelect}
            {...props}
        >
            <TabIcon 
                tab={tab}
                selected={selected}
            />
            <TabName 
                tab={tab}
            />
        </S.Root>
    )
}