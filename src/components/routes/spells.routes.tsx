import Loading from '@atoms/loading';
import { Route, Routes } from 'react-router-dom';
import GmRoute from './gm.route';
import { useGetAllSpellsQuery } from '@/api/spells.api';
import SpellForm from '@/components/concerns/spells/spell-form';

export default function SpellRoutes() {

    const getSpellsQuery = useGetAllSpellsQuery();

    return(
        <Routes>
            <Route
                path='/spells/new'
                element={
                    <GmRoute>
                        {(getSpellsQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <SpellForm />
                        }
                    </GmRoute>
                }
            />
            <Route
                path='/spells/edit/:id'
                element={
                    <GmRoute>
                        {(getSpellsQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <SpellForm editing />
                        }
                    </GmRoute>
                }
            />
        </Routes>
    )
}