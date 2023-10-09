import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import Loading from '@/components/UI/loading';
import { Route, Routes } from 'react-router-dom';
import ClassForm from '@/components/concerns/classes/class-form';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import FeatureForm from '../concerns/features/feature-form';
import GmRoute from './gm.route';

export default function FeatureRoutes() {

    const getFeaturesQuery = useGetAllFeaturesQuery();

    return(
        <Routes>
            <Route
                path='/features/new'
                element={
                    <GmRoute>
                        {(getFeaturesQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <FeatureForm />
                        }
                    </GmRoute>
                }
            />
            <Route
                path='/features/edit/:id'
                element={
                    <GmRoute>
                        {(getFeaturesQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <FeatureForm editing />
                        }
                    </GmRoute>
                }
            />
        </Routes>
    )
}