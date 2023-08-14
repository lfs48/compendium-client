import { GameEntity } from '@/types';
import * as S from './styled';
import SpellsSidebarHeader from '../../spells/spell-filter';

interface SidebarFilterProps {
    tab: GameEntity;
    [prop:string]: any;
}

export default function SidebarFilters({
    tab,
    ...props
}: SidebarFilterProps) {

    const getTabSpecificComponents = () => {
        switch(tab) {
            case('spells'):
                return(
                    <SpellsSidebarHeader />
                )
            default:
                return(<></>);
        }
    }

    return(
        <S.Root {...props}>
            Filters
            {getTabSpecificComponents()}
        </S.Root>
    )
}