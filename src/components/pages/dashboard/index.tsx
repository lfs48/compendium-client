import Sidebar from './sidebar';
import * as S from './styled';
import PanelsContainer from '@/components/UI/panels-container';
import Workspace from '@/components/UI/workspace';

export default function Dashboard() {

    return(
        <S.Root>
            <Sidebar />
            <Workspace />
            <PanelsContainer />
        </S.Root>
    )
}