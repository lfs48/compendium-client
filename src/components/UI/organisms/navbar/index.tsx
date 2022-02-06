import { useGetUserByIdQuery } from '@/api/users.api';
import Logout from '@atoms/logout';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import * as S from './styled';

export default function Navbar() {

    const { authenticated, id } = useSelector( (state:RootState) => state.session);
    
    const { data } = useGetUserByIdQuery(id);

    return(
        <S.Root>
            <S.Left></S.Left>
            <S.Right>
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