import { Route, Routes } from 'react-router-dom';
import GmRoute from './gm.route';
import SpellForm from '@/components/concerns/spells/spell-form';

export default function SpellRoutes() {

    return(
        <Routes>
            <Route
                path='/spells/new'
                element={
                    <GmRoute>
                        <SpellForm />
                    </GmRoute>
                }
            />
            <Route
                path='/spells/edit/:id'
                element={
                    <GmRoute>
                        <SpellForm editing />
                    </GmRoute>
                }
            />
        </Routes>
    )
}