import Sidebar from '@/components/concerns/sidebar';
import * as S from './styled';
import PanelsContainer from '@organisms/panels-container';
import Workspace from '@organisms/workspace';

export default function Dashboard() {

    return(
        <S.Root>
            <Sidebar />
            <Workspace />
            <PanelsContainer />
        </S.Root>
    )
}