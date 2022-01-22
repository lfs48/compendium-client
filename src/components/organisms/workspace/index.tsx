import { RootState, WorkspaceComponent } from '@/types';
import { useSelector } from 'react-redux';
import ClassForm from '../class-form';
import * as S from './styled';

export default function Workspace() {

    const {component, data} = useSelector( (state:RootState) => state.UI.workspace)
    return(
        <S.Root>
            {getWorkspaceComponent(component, data)}
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