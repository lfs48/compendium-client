import { useRegisterMutation } from '@/api/auth.api';
import Book from '@atoms/book';
import Button from '@atoms/button';
import { login } from '@/reducers/session.reducer';
import { areAllKeysFilled, handleInput, isAnyKeyFilled } from '@/utils/component.utils';
import Field from '@molecules/field';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styled';
import Link from '@atoms/link';

export default function RegisterForm() {

    const dispatch = useDispatch();

    const [triggerRegister, {data, error, isLoading}] = useRegisterMutation();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const initialErrors = {
        username: [] as string[],
        password: [] as string[],
        confirmPassword: [] as string[]
    }

    const [errors, setErrors] = useState(initialErrors);

    const handleRegister = useCallback( () => {
        const newErrors = validateInputs();
        if ( isAnyKeyFilled(newErrors) ) {
            setErrors(newErrors);
        } else {
            triggerRegister({
                user: {
                    username: inputs.username,
                    password: inputs.password
                }
            })
            .unwrap()
            .then( res => {
                setErrors(initialErrors);
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
        }
    }, [inputs])

    const validateInputs = useCallback( () => {
        const newErrors = initialErrors;
        if (inputs.password !== inputs.confirmPassword) {
            newErrors
            .confirmPassword
            .push('must match password')
        }
        return newErrors;
    }, [inputs])



    return(
        <Book>
            <S.Content>
                <S.Top>
                <S.Header>Compendium</S.Header>
                <S.SubHeader>Create an Account</S.SubHeader>
                <Field 
                    label='Username'
                    value={inputs.username}
                    errors={errors.username}
                    onChange={(e)=>handleInput(e, 'username', inputs, setInputs)}
                />
                <Field 
                    label='Password'
                    type='password'
                    value={inputs.password}
                    errors={errors.password}
                    onChange={(e)=>handleInput(e, 'password', inputs, setInputs)}
                />
                <Field 
                    label='Confirm Password'
                    type='password'
                    value={inputs.confirmPassword}
                    errors={errors.confirmPassword}
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
                disabled={!areAllKeysFilled(inputs)}
                loading={isLoading}
                onClick={handleRegister}
            >
                Sign Up
            </Button>
            </S.Content>
        </Book>
    )
}