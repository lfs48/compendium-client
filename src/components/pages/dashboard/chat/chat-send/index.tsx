import * as S from './styled';
import { KeyboardEvent, SyntheticEvent, useState } from 'react';
import Button from '@/components/UI/button';
import { usePostMessageMutation } from '@/api/messages.api';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';

export default function ChatSend() {

    const [trigger, {isLoading}] = usePostMessageMutation();

    const user_id = useSelector( (state:RootState) => state.session.id) || ''

    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    }

    const handleSend = () => {
        setInput('');
        trigger({
            message: {
                body: input,
                kind: 'text',
                user_id: user_id
            }
        })
    }

    return(
        <S.Root>
            <S.MessageTextfield
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                onEnter
            />
            <S.Bottom>
                <Button
                    onClick={handleSend}
                    loading={isLoading}
                >
                    Send
                </Button>
            </S.Bottom>
        </S.Root>
    )
}