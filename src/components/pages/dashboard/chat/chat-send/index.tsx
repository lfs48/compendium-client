import * as S from './styled';
import { KeyboardEvent, SyntheticEvent, useState } from 'react';
import Button from '@/components/UI/button';
import { usePostMessageMutation } from '@/api/messages.api';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { RootState } from '@/types';

export default function ChatSend() {

    const [trigger, {isLoading}] = usePostMessageMutation();

    const id = useAppSelector( (state) => state.session.id)
    const authenticated = !!id;

    const [input, setInput] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    }

    const handleSend = () => {
        if (id) {
            setInput('');
            trigger({
                message: {
                    body: input,
                    kind: 'text',
                    user_id: id
                }
            })
        }
    }

    return(
        <S.Root>
            <S.MessageTextfield
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                placeholder={!authenticated ? 'Log in or sign up to send messages' : ''}
                disabled={!authenticated}
            />
            <S.Bottom>
                <Button
                    onClick={handleSend}
                    loading={isLoading}
                    disabled={!authenticated}
                >
                    Send
                </Button>
            </S.Bottom>
        </S.Root>
    )
}