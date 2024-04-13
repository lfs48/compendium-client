import { useSelector } from 'react-redux';
import * as S from './styled';
import { RootState } from '@/types';
import ChatMessage from '../chat-message';
import { useEffect, useRef, useState } from 'react';

export default function ChatMessagesContainer() {

    const boxRef = useRef(null)as React.MutableRefObject<null> | React.MutableRefObject<HTMLDivElement>;
    const lastRef = useRef(null) as React.MutableRefObject<null> | React.MutableRefObject<HTMLDivElement>;
    const botRef = useRef(null) as React.MutableRefObject<null> | React.MutableRefObject<HTMLDivElement>;

    const messages = useSelector( (state:RootState) => Object.values(state.entities.messages) );
    const [length, setLength] = useState(messages.length)

    useEffect( () => {
        botRef.current?.scrollIntoView();
    }, [])

    useEffect( () => {
        if (messages.length > length) {
            setLength(messages.length)
        }
    }, [messages])

    useEffect( () => {
        if (boxRef.current && botRef.current && lastRef.current) {
            const box = boxRef.current;
            const bot = botRef.current;
            const last = lastRef.current;
            const isScrolledToBot = box.scrollHeight - box.scrollTop - box.clientHeight <= last.clientHeight + 5;
            if(isScrolledToBot) {
                bot.scrollIntoView();
            }
        }
    }, [length])

    const els = messages.map( (message, i) => (
        <ChatMessage
            key={message.id}
            message={message}
            ref={i === messages.length - 1 ? lastRef : null}
        />
    ))

    return(
        <S.Root ref={boxRef}>
            {els}
            <div key={1} ref={botRef}></div>
        </S.Root>
    )
}