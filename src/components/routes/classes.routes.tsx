import Loading from '@/components/UI/loading';
import { Route, Routes } from 'react-router-dom';
import ClassForm from '@/components/concerns/classes/class-form';
import GmRoute from './gm.route';

export default function ClassRoutes() {

    return(
        <Routes>
            <Route
                path='/classes/new'
                element={
                    <GmRoute>
                        <ClassForm />
                    </GmRoute>
                }
            />
            <Route
                path='/classes/edit/:id'
                element={
                    <GmRoute>
                        <ClassForm editing/>
                    </GmRoute>
                }
            />
        </Routes>
    )
}