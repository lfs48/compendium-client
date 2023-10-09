import { useLoginMutation } from '@/api/auth.api';
import Book from '@/components/UI/book';
import Button from '@/components/UI/button';
import Link from '@/components/UI/link';
import ErrorList from '@/components/UI/error-list';
import { areAllKeysFilled, handleInput, isAnyKeyFilled } from '@/utils/component.utils';
import Field from '@/components/UI/field';
import { useCallback, useState } from 'react';
import * as S from './styled';

export default function LoginForm() {


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