import Sidebar from '@/components/organisms/sidebar';
import * as S from './styled';
import PanelsContainer from '@/components/organisms/panels-container';

export default function Dashboard() {

    return(
        <S.Root>
            <PanelsContainer />
            <Sidebar />
        </S.Root>
    )
}