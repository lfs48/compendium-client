import * as S from './styled';
import { Link } from 'react-router-dom';

export default function AuthLinks({...props}) {

    return(
        <S.Root {...props}>
            <S.AuthLink to='/login'>Log In</S.AuthLink>
            <S.AuthLink to='/register'>Sign Up</S.AuthLink>
        </S.Root>
    )
}