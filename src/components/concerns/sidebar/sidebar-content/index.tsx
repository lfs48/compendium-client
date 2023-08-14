import EntitySidebarContent from '@/components/concerns/entities/entity-sidebar-content';
import SpellsSidebarContent from '@/components/concerns/spells/spells-sidebar-content';
import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';
import { useNavigate } from 'react-router-dom';
import { entityFormPath } from '@/utils/entities.utils';

interface SidebarContentProps {
    [prop: string]: any;
}

export default function SidebarContent({
    ...props
}: SidebarContentProps) {

    const navigate = useNavigate();
    const gm = useSelector( (state:RootState) => state.session.gm);
    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab} = sidebarState;

    const getEntityContent = () => {
        switch(selectedTab) {
            case('spells'):
                return <SpellsSidebarContent />
            default:
                return <EntitySidebarContent entityType={selectedTab}/>
        }
    }

    const handleCreate = () => {
        navigate(`/${entityFormPath(selectedTab)}/new`);
    }

    return(
        <>
        {getEntityContent()}
        {gm && 
            <S.NewButton 
                onClick={handleCreate}
                color='green'
            >
                New +
            </S.NewButton>
        }
        </>
    )
}