import { RootState, WorkspaceComponent } from '@/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ClassForm from '../class-form';
import * as S from './styled';

export default function Workspace() {

    const {component, data} = useSelector( (state:RootState) => state.UI.workspace)

    return(
        <S.Root>
            {component !== null &&
                <S.Page>
                    {getWorkspaceComponent(component, data)}
                </S.Page>
            }
        </S.Root>
    )
}

function getWorkspaceComponent(component:WorkspaceComponent, data?) {
    switch(component) {
        case('classForm') :
            return <ClassForm />
        default:
            return <></>
    }
}