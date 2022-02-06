import { useLoginMutation } from '@/api/auth.api';
import Book from '@atoms/book';
import Button from '@atoms/button';
import Link from '@atoms/link';
import ErrorList from '@molecules/error-list';
import { login } from '@/reducers/session.reducer';
import { areAllKeysFilled, handleInput, isAnyKeyFilled } from '@/utils/component.utils';
import Field from '@molecules/field';
import { useCallback, useState } from 'react';
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
            setErrors(initialErrors);
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
                        hasErrors={errors.form.length >= 1}
                    />
                    <Field 
                        label='Password'
                        type='password'
                        value={inputs.password}
                        onChange={(e)=>handleInput(e, 'password', inputs, setInputs)}
                        hasErrors={errors.form.length >= 1}
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