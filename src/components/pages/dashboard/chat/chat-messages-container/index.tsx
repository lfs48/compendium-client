import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { RootState } from '@/types';
import ChatMessage from '../chat-message';
import { useEffect, useRef, useState } from 'react';
import { useGetAllMessagesQuery } from '@/api/messages.api';
import { observe, useInView } from 'react-intersection-observer';
import ChatLoading from '../chat-loading';

export default function ChatMessagesContainer() {

    const [page, setPage] = useState(1);

    const _ = useGetAllMessagesQuery(page);

    const boxRef = useRef(null)as React.MutableRefObject<null | HTMLDivElement>;
    const lastRef = useRef(null) as React.MutableRefObject<null | HTMLDivElement>;
    const botRef = useRef(null) as React.MutableRefObject<null | HTMLDivElement>;

    const [firstRef, inView, entry] = useInView();

    const messages = useAppSelector( (state) => state.entities.messages );
    const sortedMessages =  Object.values(messages).sort( (a,b) => a.created_at.localeCompare(b.created_at) )
    const [length, setLength] = useState(sortedMessages.length)

    useEffect( () => {
        botRef.current?.scrollIntoView();
    }, [])

    useEffect( () => {
        if (sortedMessages.length > length) {
            setLength(sortedMessages.length)
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
        if (i === sortedMessages.length - 1) { ref = lastRef }
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