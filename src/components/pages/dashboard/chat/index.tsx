import { useGetAllMessagesQuery } from '@/api/messages.api';
import * as S from './styled';
import Loading from '@/components/common/loading';
import ChatSend from './chat-send';
import { ChatSocketManager } from './chat-socket-manager';
import ChatMessagesContainer from './chat-messages-container';
import { useRecoilState } from 'recoil';
import { chatAtom } from '@/recoil';
import ChatHide from './chat-hide';
import ChatLoading from './chat-loading';

export default function Chat() {

    const {isSuccess} = useGetAllMessagesQuery(1);

    const [{chatOpen}, _] = useRecoilState(chatAtom);


    return(
        <S.Root $open={chatOpen}>
            <S.Body>
                <ChatSocketManager />
                {isSuccess ?
                    <ChatMessagesContainer />
                :
                    <ChatLoading />
                }
                <ChatSend disabled={!isSuccess}/>
            </S.Body>
            <ChatHide />
        </S.Root>
    )
}