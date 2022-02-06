import Sidebar from '@organisms/sidebar';
import * as S from './styled';
import PanelsContainer from '@organisms/panels-container';
import Workspace from '@organisms/workspace';

export default function Dashboard() {

    return(
        <S.Root>
            <Workspace />
            <PanelsContainer />
            <Sidebar />
        </S.Root>
    )
}