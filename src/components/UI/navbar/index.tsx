import { useGetUserByIdQuery } from '@/api/users.api';
import Logout from './logout';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import DarkMode from './darkmode';
import Collections from './collections';

export default function Navbar() {

    const { authenticated, id } = useSelector( (state:RootState) => state.session);
    
    const { data } = useGetUserByIdQuery(id ?? skipToken);

    return(
        <S.Root>
            <S.Left>
                <Collections />
            </S.Left>
            <S.Right>
                <DarkMode />
                {(authenticated && data) &&
                    <>
                    <span>{data.username}</span>
                    <Logout />
                    </>
                }
            </S.Right>
        </S.Root>
    )
}