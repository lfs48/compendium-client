import EntitySidebarContent from '@/components/concerns/entities/entity-sidebar-content';
import SpellsSidebarContent from '@/components/concerns/spells/spells-sidebar-content';
import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';
import { useNavigate } from 'react-router-dom';
import { entityFormPath } from '@/utils/entities.utils';
import FeaturesSidebarContent from '../../features/features-sidebar-content';
import ItemsSidebarContent from '../../items/items-sidebar-content';
import Button from '@/components/UI/button';

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
            case('features'):
                return <FeaturesSidebarContent />
            case('spells'):
                return <SpellsSidebarContent />
            case('items'):
                return <ItemsSidebarContent />
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
            <S.NewButtonContainer>
                <Button 
                    onClick={handleCreate}
                    color='green'
                >
                    New +
                </Button>
            </S.NewButtonContainer>
        }
        </>
    )
}