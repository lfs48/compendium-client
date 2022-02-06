import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import Loading from '@atoms/loading';
import { Route, Routes } from 'react-router-dom';
import ClassForm from '@/components/concerns/classes/class-form';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import FeatureForm from '../concerns/features/feature-form';

export default function FeatureRoutes() {

    const getFeaturesQuery = useGetAllFeaturesQuery();

    return(
        <Routes>
        <Route
            path='/features/new'
            element={
                (getFeaturesQuery.isLoading)
                    ?
                        <Loading />
                    :
                        <FeatureForm />
            }
        />
        <Route
            path='/features/edit/:id'
            element={
                (getFeaturesQuery.isLoading)
                    ?
                        <Loading />
                    :
                        <FeatureForm editing />
            }
        />
        </Routes>
    )
}