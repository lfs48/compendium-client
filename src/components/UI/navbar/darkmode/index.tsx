import * as S from './styled';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import { toggleDarkmode } from '@/reducers/UI/darkmode.reducer';

export default function DarkMode() {

    const dispatch = useDispatch();

    const active = useAppSelector( (state) => state.UI.darkmode);

    useEffect( () => {
        const root = document.getElementById('root');
        if(active) {
            root?.classList.add('dark');
            localStorage.setItem('darkmode','true');
        } else {
            root?.classList.remove('dark');
            localStorage.setItem('darkmode','false');
        }
    }, [active]);

    const handleToggle = () => {
        dispatch({
            type: toggleDarkmode.type
        })
    }

    return(
        <S.Root
            $dark={active}
            onClick={handleToggle}
        >
            <S.Tooltip
                dir='bottom'
            >
                {active ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
            </S.Tooltip>
        </S.Root>
    )
}