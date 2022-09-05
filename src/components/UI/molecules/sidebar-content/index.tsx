import EntitySidebarContent from '@/components/concerns/entities/entity-sidebar-content';
import FeatsSidebarContent from '@/components/concerns/feats/feats-sidebar-content';
import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';

interface SidebarContentProps {
    [prop: string]: any;
}

export default function SidebarContent({
    ...props
}: SidebarContentProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab} = sidebarState;

    const getEntityContent = () => {
        switch(selectedTab) {
            case('feats'):
                return <FeatsSidebarContent />
            default:
                return <EntitySidebarContent entityType={selectedTab}/>
        }
    }

    return getEntityContent()
}