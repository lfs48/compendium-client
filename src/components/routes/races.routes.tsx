import { Route, Routes } from 'react-router-dom';
import RaceForm from '../concerns/races/race-form';
import GmRoute from './gm.route';

export default function RaceRoutes() {

    return(
        <Routes>
            <Route
                path='/races/new'
                element={
                    <GmRoute>
                        <RaceForm />
                    </GmRoute>
                }
            />
            <Route
                path='/races/edit/:id'
                element={
                    <GmRoute>
                        <RaceForm editing />
                    </GmRoute>
                }
            />
        </Routes>
    )
}