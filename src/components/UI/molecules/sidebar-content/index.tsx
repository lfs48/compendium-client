import BoonsSidebarContent from '@/components/concerns/boons/boons-sidebar-content';
import EntitySidebarContent from '@/components/concerns/entities/entity-sidebar-content';
import FeatsSidebarContent from '@/components/concerns/feats/feats-sidebar-content';
import SpellsSidebarContent from '@/components/concerns/spells/spells-sidebar-content';
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
            case('boons'):
                return <BoonsSidebarContent />
            case('feats'):
                return <FeatsSidebarContent />
            case('spells'):
                return <SpellsSidebarContent />
            default:
                return <EntitySidebarContent entityType={selectedTab}/>
        }
    }

    return getEntityContent()
}