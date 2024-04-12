import { Message } from '@/types';
import * as S from './styled';

interface ChatMessageProps {
    message: Message;
    [prop: string]: any;
}

export default function ChatMessage({
    message,
    ...props
}: ChatMessageProps) {

    const {user, body} = message;
    
    return(
        <S.Root {...props}>
            <S.Name>{user}:</S.Name>
            <S.Body> {body}</S.Body>
        </S.Root>
    )
}