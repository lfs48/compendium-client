import { useGetAllRacesQuery } from '@/api/races.api';
import Loading from '@atoms/loading';
import { Route, Routes } from 'react-router-dom';
import RaceForm from '../concerns/races/race-form';
import GmRoute from './gm.route';

export default function RaceRoutes() {

    const getRacesQuery = useGetAllRacesQuery();

    return(
        <Routes>
            <Route
                path='/races/new'
                element={
                    <GmRoute>
                        {(getRacesQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <RaceForm />
                        }
                    </GmRoute>
                }
            />
            <Route
                path='/races/edit/:id'
                element={
                    <GmRoute>
                        {(getRacesQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <RaceForm editing />
                        }
                    </GmRoute>
                }
            />
        </Routes>
    )
}