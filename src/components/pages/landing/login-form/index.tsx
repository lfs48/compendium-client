import { useLoginMutation } from '@/api/auth.api';
import Book from '@/components/common/book';
import Button from '@/components/common/button';
import Link from '@/components/common/link';
import ErrorList from '@/components/common/error-list';
import { areAllKeysFilled, handleInput, isAnyKeyFilled } from '@/utils/component.utils';
import Field from '@/components/common/field';
import { useCallback, useState } from 'react';
import * as S from './styled';
import { isUserError } from '@/utils/errors.utils';
import toast from 'react-hot-toast';
import { ERROR_MESSAGE } from '@/utils/constants.utils';

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
            if (isUserError(err)) {
                setErrors(err.data.errors)
            } else {
                setErrors(initialErrors);
                toast.error(ERROR_MESSAGE);
            }
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