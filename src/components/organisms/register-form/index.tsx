import { useRegisterMutation } from '@/api/auth.api';
import Book from '@atoms/book';
import Button from '@atoms/button';
import { login } from '@/reducers/session.reducer';
import { areInputsFilled, handleInput } from '@/utils/component.utils';
import Field from '@molecules/field';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styled';
import Link from '@/components/atoms/link';

export default function RegisterForm() {

    const dispatch = useDispatch();

    const [triggerRegister, {data, error, isLoading}] = useRegisterMutation();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleRegister = useCallback( () => {
        triggerRegister({
            user: {
                username: inputs.username,
                password: inputs.password
            }
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
        <Book>
            <S.Content>
                <S.Top>
                <S.Header>Create an Account</S.Header>
                <Field 
                    label='Username'
                    value={inputs.username}
                    onChange={(e)=>handleInput(e, 'username', inputs, setInputs)}
                />
                <Field 
                    label='Password'
                    type='password'
                    value={inputs.password}
                    onChange={(e)=>handleInput(e, 'password', inputs, setInputs)}
                />
                <Field 
                    label='Confirm Password'
                    type='password'
                    value={inputs.confirmPassword}
                    onChange={(e)=>handleInput(e, 'confirmPassword', inputs, setInputs)}
                />
                <Link
                    to='/'
                    block
                >
                    Already have an account? Log In
                </Link>
            </S.Top>
            <Button
                block
                disabled={!areInputsFilled(inputs)}
                loading={isLoading}
                onClick={handleRegister}
            >
                Sign Up
            </Button>
            </S.Content>
        </Book>
    )
}