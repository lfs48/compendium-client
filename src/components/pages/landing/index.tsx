import { useLoginMutation, useRegisterMutation } from '@/api/auth.api';
import Button from '@/components/atoms/button';
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
            Login
            <Field 
                label='Username'
                value={inputs.username}
                onChange={(e)=>handleInput(e, 'username', inputs, setInputs)}
            />
            <Field 
                label='Password'
                value={inputs.password}
                onChange={(e)=>handleInput(e, 'password', inputs, setInputs)}
            />
            <Button
                onClick={handleLogin}
            >
                Login
            </Button>
        </S.Root>
    )
}