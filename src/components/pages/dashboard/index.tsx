import Sidebar from './sidebar';
import * as S from './styled';
import PanelsContainer from './panels-container';
import Workspace from './workspace';

export default function Dashboard() {

    return(
        <S.Root>
            <Sidebar />
            <Workspace />
            <PanelsContainer />
        </S.Root>
    )
}