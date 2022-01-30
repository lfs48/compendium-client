import Sidebar from '@/components/organisms/sidebar';
import * as S from './styled';
import PanelsContainer from '@/components/organisms/panels-container';
import Workspace from '@/components/organisms/workspace';
import { Route, Routes } from 'react-router-dom';
import Protected from '@/components/routes/protected';
import ClassForm from '@/components/organisms/class-form';

export default function Dashboard() {

    return(
        <S.Root>
            <Workspace />
            <PanelsContainer />
            <Sidebar />
        </S.Root>
    )
}