import * as S from './styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/types';
import { toggleDarkmode } from '@/reducers/UI/darkmode.reducer';

export default function DarkMode() {

    const dispatch = useDispatch();

    const active = useSelector( (state:RootState) => state.UI.darkmode);

    useEffect( () => {
        const root = document.getElementById('root');
        if(active) {
            root?.classList.add('dark');
        } else {
            root?.classList.remove('dark');
        }
    }, [active]);

    const handleToggle = () => {
        dispatch({
            type: toggleDarkmode.type
        })
    }

    return(
        <S.Root 
            active={active}
            handleToggle={handleToggle}
        />
    )
}