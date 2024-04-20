import { Message } from '@/types';
import * as S from './styled';
import { ForwardedRef, forwardRef } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector.hook';

interface ChatMessageProps {
    message: Message;
    [prop: string]: any;
}

const ChatMessage = forwardRef( function({
    message,
    ...props
}: ChatMessageProps, ref:ForwardedRef<any>) {

    const {user, body} = message;

    const username = useAppSelector( (state) => state.entities.users[user].username)
    const color = useAppSelector( (state) => state.entities.users[user].color)
    
    return(
        <S.Root
            ref={ref}
            {...props}
        >
            <S.Name style={{color: color}}>{username}:</S.Name>
            <S.Body> {body}</S.Body>
        </S.Root>
    )
})

export default ChatMessage;