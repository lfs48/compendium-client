import Sidebar from '@/components/organisms/sidebar';
import * as S from './styled';
import PanelsContainer from '@/components/organisms/panels-container';
import Workspace from '@/components/organisms/workspace';

export default function Dashboard() {

    return(
        <S.Root>
            <PanelsContainer />
            <Workspace />
            <Sidebar />
        </S.Root>
    )
}