import { GameEntity } from '@/types';
import * as S from './styled';
import SpellsSidebarHeader from '../../spells/spell-filter';
import FeatureFilters from '../../features/feature-filters';
import ItemFilters from '../../items/item-filters';

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
            case('features'):
                return(
                    <FeatureFilters />
                )
            case('spells'):
                return(
                    <SpellsSidebarHeader />
                )
            case('items'):
                return(
                    <ItemFilters />
                )
            default:
                return(<></>);
        }
    }

    return(
        <S.Root {...props}>
            <S.Header>Filters</S.Header>
            {getTabSpecificComponents()}
        </S.Root>
    )
}