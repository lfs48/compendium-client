import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { receiveMessage } from '@/reducers/entities/messages.reducer';

const url = import.meta.env.VITE_API_ROOT + '/cable'

export function ChatSocketManager() {

    const dispatch = useDispatch();
    
    const { sendMessage, lastMessage, readyState } = useWebSocket(url);

    useEffect( () => {
        if (readyState === ReadyState.OPEN) {
            const message = JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({
                    channel: 'MessagesChannel'
                })
            })
            sendMessage(message)
        }
    }, [readyState])

    useEffect(() => {
        if (lastMessage && lastMessage.data) {
            const {type, message} = JSON.parse(lastMessage.data);
            if (type === 'welcome') {return}
            if (type === 'ping') {return}
            if (type === 'confirm_subscription') {return}
            if (type === 'reject_subscription') {return}
            if (type === 'disconnect') {return}

            if (message) {
                dispatch({
                    type: receiveMessage.type,
                    payload: message
                })
            }
        }
    }, [lastMessage])

    return <></>;
}