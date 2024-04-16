import { useGetUserByIdQuery } from '@/api/users.api';
import Logout from './logout';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';
import { skipToken } from '@reduxjs/toolkit/query';
import DarkMode from './darkmode';
import Collections from './collections';
import AuthLinks from './auth-links';

export default function Navbar() {

    const { authenticated, id } = useSelector( (state:RootState) => state.session);
    
    const { data } = useGetUserByIdQuery(id ?? skipToken);

    return(
        <S.Root>
            <S.Left>
                {(authenticated && data) &&
                    <Collections />
                }
            </S.Left>
            <S.Right>
                <DarkMode />
                {(authenticated && data) ?
                    <>
                    <span>{data.username}</span>
                    <Logout />
                    </>
                :
                    <AuthLinks />
                }
            </S.Right>
        </S.Root>
    )
}