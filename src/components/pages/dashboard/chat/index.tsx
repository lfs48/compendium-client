import { useGetAllMessagesQuery } from '@/api/messages.api';
import * as S from './styled';
import Loading from '@/components/UI/loading';
import ChatMessage from './chat-message';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';

export default function Chat() {

    const {isLoading, isSuccess} = useGetAllMessagesQuery();

    const messages = useSelector( (state:RootState) => Object.values(state.entities.messages) )

    return(
        <S.Root>
            {isLoading &&
                <Loading />
            }
            {isSuccess &&
                messages.map( (message) => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                    />
                ))
            }
        </S.Root>
    )
}