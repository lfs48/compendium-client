import Loading from '@atoms/loading';
import { Route, Routes } from 'react-router-dom';
import GmRoute from './gm.route';
import { useGetAllFeatsQuery } from '@/api/feats.api';
import FeatForm from '../concerns/feats/feat-form';

export default function FeatRoutes() {

    const getFeatsQuery = useGetAllFeatsQuery();

    return(
        <Routes>
            <Route
                path='/feats/new'
                element={
                    <GmRoute>
                        {(getFeatsQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <FeatForm />
                        }
                    </GmRoute>
                }
            />
            <Route
                path='/feats/edit/:id'
                element={
                    <GmRoute>
                        {(getFeatsQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <FeatForm editing />
                        }
                    </GmRoute>
                }
            />
        </Routes>
    )
}