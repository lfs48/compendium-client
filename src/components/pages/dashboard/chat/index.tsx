import { useGetAllMessagesQuery } from '@/api/messages.api';
import * as S from './styled';
import Loading from '@/components/common/loading';
import ChatSend from './chat-send';
import { ChatSocketManager } from './chat-socket-manager';
import ChatMessagesContainer from './chat-messages-container';

export default function Chat() {

    const {isLoading} = useGetAllMessagesQuery(1);

    return(
        <S.Root>
            <S.Body>
                <ChatSocketManager />
                <ChatMessagesContainer />
                <ChatSend disabled={isLoading}/>
            </S.Body>
        </S.Root>
    )
}