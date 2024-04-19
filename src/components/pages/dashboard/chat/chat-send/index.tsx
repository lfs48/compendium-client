import * as S from './styled';
import { KeyboardEvent, SyntheticEvent, useState } from 'react';
import Button from '@/components/common/button';
import { usePostMessageMutation } from '@/api/messages.api';
import { useAppSelector } from '@/hooks/useAppSelector.hook';

interface ChatLoadingProps {
    disabled?: boolean;
    [prop:string]: any;
}

export default function ChatSend({
    disabled=false,
    ...props
}:ChatLoadingProps) {

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
        <S.Root {...props}>
            <S.MessageTextfield
                value={input}
                onKeyDown={handleKeyDown}
                onChange={(e) => setInput(e.target.value)}
                placeholder={!authenticated ? 'Log in or sign up to send messages' : ''}
                disabled={!authenticated || disabled}
            />
            <S.Bottom>
                <Button
                    onClick={handleSend}
                    loading={isLoading}
                    disabled={!authenticated || disabled}
                >
                    Send
                </Button>
            </S.Bottom>
        </S.Root>
    )
}