import Logout from './logout';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import * as S from './styled';
import DarkMode from './darkmode';
import Collections from './collections';
import AuthLinks from './auth-links';
import UserColor from './user-color';

export default function Navbar() {

    const id = useAppSelector( (state) => state.session.id)
    const user = useAppSelector( (state) => state.entities.users[id || ''])
    const authenticated = !!id;

    return(
        <S.Root>
            <S.Left>
                {(authenticated && user) &&
                    <Collections />
                }
            </S.Left>
            <S.Right>
                {(authenticated && user) ?
                    <>
                    <S.UserInfo>
                        <UserColor />
                        <span>{user.username}</span>
                    </S.UserInfo>
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