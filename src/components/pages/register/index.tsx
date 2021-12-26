import { useRegisterMutation } from '@/api/auth.api';
import Book from '@atoms/book';
import Button from '@atoms/button';
import { login } from '@/reducers/session.reducer';
import { handleInput } from '@/utils/component.utils';
import Field from '@molecules/field';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as S from './styled';
import Page from '@/components/atoms/page';
import RegisterForm from '@/components/organisms/register-form';

export default function Register() {

    const dispatch = useDispatch();

    const [triggerRegister, {data, error, isLoading}] = useRegisterMutation();

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const handleRegister = useCallback( () => {
        triggerRegister({
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
        <Page>
            <RegisterForm />
        </Page>
    )
}