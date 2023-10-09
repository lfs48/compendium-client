import * as S from './styled';
import SpellsSidebarHeader from '../../../../concerns/spells/spell-filter';
import FeatureFilters from '../../../../concerns/features/feature-filters';
import ItemFilters from '../../../../concerns/items/item-filters';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import { merge } from 'lodash';
import Close from '@/components/UI/close';
import { Entity } from '@/enums';

interface SidebarFilterProps {
    tab: Entity;
    [prop:string]: any;
}

export default function SidebarFilters({
    tab,
    ...props
}: SidebarFilterProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {filterOpen} = sidebarState.UI;

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

    const handleClose = () => {
        const newState = merge({}, sidebarState);
        newState.UI.filterOpen = false;
        setSidebarState(newState);
    }

    return(
        <S.Root
            $open={filterOpen}
            {...props}
        >
            <S.Header>
                <div>Filters</div>
                <Close
                    onClick={handleClose}
                />
            </S.Header>
            {getTabSpecificComponents()}
        </S.Root>
    )
}