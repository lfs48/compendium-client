import { useSelector } from 'react-redux';
import * as S from './styled';
import { RootState } from '@/types';
import ChatMessage from '../chat-message';
import { useEffect, useRef, useState } from 'react';
import { useGetAllMessagesQuery } from '@/api/messages.api';
import { observe, useInView } from 'react-intersection-observer';

export default function ChatMessagesContainer() {

    const [page, setPage] = useState(1);

    const query = useGetAllMessagesQuery(page);

    const boxRef = useRef(null)as React.MutableRefObject<null | HTMLDivElement>;
    const lastRef = useRef(null) as React.MutableRefObject<null | HTMLDivElement>;
    const botRef = useRef(null) as React.MutableRefObject<null | HTMLDivElement>;

    const [firstRef, inView, entry] = useInView();

    const messages = useSelector( (state:RootState) => Object.values(state.entities.messages) );
    const sortedMessages = messages.sort( (a,b) => a.created_at.localeCompare(b.created_at) )
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
            const isScrolledToBot = box.scrollHeight - box.scrollTop - box.clientHeight <= last.clientHeight + 10;
            if(isScrolledToBot) {
                bot.scrollIntoView();
            }
        }
    }, [length])

    useEffect( () => {
        if (inView) {
            const nextPage = Math.ceil(length / 25) + 1;
            if (nextPage > page) { setPage(nextPage); }
        }
    }, [inView])

    useEffect( () => {
        if (page > 1) {
            entry?.target.scrollIntoView()
        }
    }, [page])

    const els = sortedMessages.map( (message, i) => {
        let ref = null as any;
        if (i === 0) { ref = firstRef }
        if (i === messages.length - 1) { ref = lastRef }
        const node = (
            <ChatMessage
                key={message.id}
                message={message}
                ref={ref}
            />
        )
        return node;
    })

    return(
        <S.Root ref={boxRef}>
            {els}
            <div key={1} ref={botRef}></div>
        </S.Root>
    )
}