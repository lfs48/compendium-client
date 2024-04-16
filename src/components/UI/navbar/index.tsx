import { useGetUserByIdQuery } from '@/api/users.api';
import Logout from './logout';
import { RootState } from '@/types';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import { skipToken } from '@reduxjs/toolkit/query';
import DarkMode from './darkmode';
import Collections from './collections';
import AuthLinks from './auth-links';

export default function Navbar() {

    const id = useAppSelector( (state) => state.session.id)
    const authenticated = !!id;
    
    const { data } = useGetUserByIdQuery(id ?? skipToken);

    return(
        <S.Root>
            <S.Left>
                {(authenticated && data) &&
                    <Collections />
                }
            </S.Left>
            <S.Right>
                {(authenticated && data) ?
                    <>
                    <span>{data.username}</span>
                    <DarkMode />
                    <Logout />
                    </>
                :
                    <>
                    <AuthLinks />
                    <DarkMode />
                    </>
                }
            </S.Right>
        </S.Root>
    )
}