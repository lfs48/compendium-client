import { useRecoilState } from 'recoil';
import * as S from './styled';
import { sidebarAtom } from '@/recoil';
import { merge } from 'lodash';

export default function SidebarHide() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {sidebarOpen} = sidebarState.UI;

    const handleClick = () => {
        const newState = merge({},sidebarState);
        newState.UI.sidebarOpen = !sidebarOpen;
        setSidebarState(newState);
    }

    return(
        <S.Root
            $open={sidebarOpen}
            onClick={handleClick}
        />
    )
}