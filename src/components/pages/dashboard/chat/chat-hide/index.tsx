import { useRecoilState } from 'recoil';
import * as S from './styled';
import { chatAtom } from '@/recoil';
import { merge } from 'lodash';

export default function ChatHide() {

    const [chatState, setChatState] = useRecoilState(chatAtom);
    const {chatOpen} = chatState;

    const handleClick = () => {
        const newState = merge({},chatState);
        newState.chatOpen = !chatOpen;
        setChatState(newState);
    }

    return(
        <S.Root
            $open={chatOpen}
            onClick={handleClick}
        />
    )
}