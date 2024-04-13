import { useGetAllMessagesQuery } from '@/api/messages.api';
import * as S from './styled';
import Loading from '@/components/UI/loading';
import ChatSend from './chat-send';
import { ChatSocketManager } from './chat-socket-manager';
import ChatMessagesContainer from './chat-messages-container';

export default function Chat() {

    const {isLoading, isSuccess} = useGetAllMessagesQuery(1);

    return(
        <S.Root>
            {isLoading &&
                <Loading />
            }
            {isSuccess &&
                <S.Body>
                    <ChatSocketManager />
                    <ChatMessagesContainer />
                    <ChatSend />
                </S.Body>
            }
        </S.Root>
    )
}