import { GameEntity } from '@/types';
import * as S from './styled';
import SpellsSidebarHeader from '../../spells/spell-filter';
import FeatsSidebarHeader from '../../feats/feat-filter';

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
            case('feats'):
                return(
                    <FeatsSidebarHeader />
                )
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