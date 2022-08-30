import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { clearInput, handleInput } from '@/utils/component.utils';
import Button from '@atoms/button';
import Search from '@molecules/search';
import { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { entityFormPath } from '@/utils/entities.utils';

interface SidebarHeaderProps {
    [prop: string]: any;
}

export default function SidebarHeader({
    ...props
}: SidebarHeaderProps) {

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

    const handleCreate = () => {
        navigate(`/${entityFormPath(selectedTab)}/new`);
    }

    return(
        <S.Root {...props}>
            <Search
                value={searchInputs[selectedTab].name}
                onChange={handleNameInput}
                handleClearSearch={handleClearNameInput}
            />
            {gm &&
                <Button
                    onClick={handleCreate}
                >
                    New
                </Button>
            }
        </S.Root>
    )
}