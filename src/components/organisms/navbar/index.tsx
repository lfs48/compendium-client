import { useGetUserByIdQuery } from '@/api/users.api';
import Logout from '@/components/atoms/logout';
import { RootState } from '@/types/interfaces';
import { useSelector } from 'react-redux';
import * as S from './styled';

export default function Navbar() {

    const { authenticated, id } = useSelector( (state:RootState) => state.session);
    
    const { data, error, isLoading } = useGetUserByIdQuery(id);

    return(
        <S.Root>
            <S.Left></S.Left>
            <S.Right>
                {(authenticated && data) &&
                    <>
                    <span>{data.user.username}</span>
                    <Logout />
                    </>
                }
            </S.Right>
        </S.Root>
    )
}