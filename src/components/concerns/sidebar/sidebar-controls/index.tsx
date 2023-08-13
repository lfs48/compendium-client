import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import Button from '@atoms/button';
import Search from '@molecules/search';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { entityFormPath } from '@/utils/entities.utils';
import FeatsSidebarHeader from '@/components/concerns/feats/feat-sidebar-header';
import SpellsSidebarHeader from '@/components/concerns/spells/spell-sidebar-header';

interface SidebarControlsProps {
    [prop: string]: any;
}

export default function SidebarControls({
    ...props
}: SidebarControlsProps) {

    const navigate = useNavigate();

    const gm = useSelector( (state:RootState) => state.session.gm);

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab, searchInputs} = sidebarState;

    const handleNameInput = (e) => {
        const newState = merge({}, sidebarState);
        newState.searchInputs[selectedTab].name = e.target.value;
        setSidebarState(newState);
    }

    const handleClearNameInput = () => {
        const newState = merge({}, sidebarState);
        newState.searchInputs[selectedTab].name = '';
        setSidebarState(newState);
    }

    const getTabSpecificComponents = () => {
        switch(selectedTab) {
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
            {getTabSpecificComponents()}
            <S.Bottom>
                <Search
                    value={searchInputs[selectedTab].name}
                    onChange={handleNameInput}
                    handleClearSearch={handleClearNameInput}
                />
            </S.Bottom>
        </S.Root>
    )
}