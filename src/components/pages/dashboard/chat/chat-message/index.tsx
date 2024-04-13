import { Message } from '@/types';
import * as S from './styled';
import { ForwardedRef, forwardRef } from 'react';

interface ChatMessageProps {
    message: Message;
    [prop: string]: any;
}

const ChatMessage = forwardRef( function({
    message,
    ...props
}: ChatMessageProps, ref:ForwardedRef<any>) {

    const {user, body} = message;
    
    return(
        <S.Root
            ref={ref}
            {...props}
        >
            <S.Name>{user}:</S.Name>
            <S.Body> {body}</S.Body>
        </S.Root>
    )
})

export default ChatMessage;