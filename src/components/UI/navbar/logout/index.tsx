import { logout } from '@/reducers/session.reducer';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styled';

export default function Logout({...props}) {

    const dispatch = useDispatch();

    const handleLogout = useCallback( () => {
        dispatch({
            type: logout.type
        });
    }, [])

    return(
        <S.Root 
            onClick={handleLogout}
            {...props}
        >
            <S.Tooltip
                dir='bottom'
            >Log out</S.Tooltip>
        </S.Root>
    )
}