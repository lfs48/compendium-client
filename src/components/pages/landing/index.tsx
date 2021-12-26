import { useLoginMutation, useRegisterMutation } from '@/api/auth.api';
import Button from '@/components/atoms/button';
import LoginForm from '@/components/organisms/login-form';
import { login } from '@/reducers/session.reducer';
import { handleInput } from '@/utils/component.utils';
import Field from '@molecules/field';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styled';

export default function Landing() {

    const dispatch = useDispatch();

    const [triggerLogin, {data, error, isLoading}] = useLoginMutation();

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const handleLogin = useCallback( () => {
        triggerLogin({
            user: inputs
        })
        .unwrap()
        .then( res => {
            const {token, user} = res;
            dispatch({
                type: login.type,
                payload: {
                    jwt: token,
                    id: user.id
                }
            })
        })
        .catch( err => {
            console.log(err)
        })
    }, [inputs])

    return(
        <S.Root>
            <LoginForm />
        </S.Root>
    )
}