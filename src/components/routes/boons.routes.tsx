import Loading from '@atoms/loading';
import { Route, Routes } from 'react-router-dom';
import GmRoute from './gm.route';
import { useGetAllBoonsQuery } from '@/api/boons.api';
import BoonForm from '../concerns/boons/boon-form';

export default function BoonRoutes() {

    const getBoonsQuery = useGetAllBoonsQuery();

    return(
        <Routes>
            <Route
                path='/boons/new'
                element={
                    <GmRoute>
                        {(getBoonsQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <BoonForm />
                        }
                    </GmRoute>
                }
            />
            <Route
                path='/boons/edit/:id'
                element={
                    <GmRoute>
                        {(getBoonsQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <BoonForm editing />
                        }
                    </GmRoute>
                }
            />
        </Routes>
    )
}