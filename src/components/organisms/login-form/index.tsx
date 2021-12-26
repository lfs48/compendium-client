import { useLoginMutation, useRegisterMutation } from '@/api/auth.api';
import Book from '@/components/atoms/book';
import Button from '@/components/atoms/button';
import Link from '@/components/atoms/link';
import ErrorList from '@/components/molecules/error-list';
import { login } from '@/reducers/session.reducer';
import { areAllKeysFilled, handleInput, isAnyKeyFilled } from '@/utils/component.utils';
import Field from '@molecules/field';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styled';

export default function LoginForm() {

    const dispatch = useDispatch();

    const [triggerLogin, {isLoading}] = useLoginMutation();

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const initialErrors = {
        form: [] as string[]
    }

    const [errors, setErrors] = useState(initialErrors);

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
            setErrors(err.data.errors);
        })
    }, [inputs]);

    return(
        <Book>
            <S.Content>
                <S.Top>
                    <S.Header>Compendium</S.Header>
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
                    {isAnyKeyFilled(errors) &&
                        <ErrorList errors={errors.form} />
                    }
                    <Link 
                        block
                        to='/register'
                    >
                        Create an account
                    </Link>
                </S.Top>
            <Button
                block
                disabled={!areAllKeysFilled(inputs)}
                loading={isLoading}
                onClick={handleLogin}
            >
                Sign In
            </Button>
            </S.Content>
        </Book>
    )
}