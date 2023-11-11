import Loading from '@/components/UI/loading';
import { Route, Routes } from 'react-router-dom';
import FeatureForm from '../concerns/features/feature-form';
import GmRoute from './gm.route';

export default function FeatureRoutes() {

    return(
        <Routes>
            <Route
                path='/features/new'
                element={
                    <GmRoute>
                        <FeatureForm />
                    </GmRoute>
                }
            />
            <Route
                path='/features/edit/:id'
                element={
                    <GmRoute>
                        <FeatureForm editing />
                    </GmRoute>
                }
            />
        </Routes>
    )
}