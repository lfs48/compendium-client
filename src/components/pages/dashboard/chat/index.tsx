import { useGetAllMessagesQuery } from '@/api/messages.api';
import * as S from './styled';
import Loading from '@/components/UI/loading';
import ChatMessage from './chat-message';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';
import ChatSend from './chat-send';
import { ChatSocketManager } from './chat-socket-manager';
import { useEffect, useRef } from 'react';
import ChatMessagesContainer from './chat-messages-container';

export default function Chat() {

    const {isLoading, isSuccess} = useGetAllMessagesQuery();

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