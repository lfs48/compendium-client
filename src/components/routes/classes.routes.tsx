import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import Loading from '@atoms/loading';
import { Route, Routes } from 'react-router-dom';
import ClassForm from '@/components/concerns/classes/class-form';
import { useGetAllFeaturesQuery } from '@/api/features.api';

export default function ClassRoutes() {

    const getClassesQuery = useGetAllClassesQuery ();
    const getFeaturesQuery = useGetAllFeaturesQuery();

    return(
        <Routes>
        <Route
            path='/classes/new'
            element={
                (getClassesQuery.isLoading || getFeaturesQuery.isLoading)
                    ?
                        <Loading />
                    :
                        <ClassForm />
            }
        />
        <Route
            path='/classes/edit/:id'
            element={
                (getClassesQuery.isLoading || getFeaturesQuery.isLoading)
                    ?
                        <Loading />
                    :
                        <ClassForm editing/>
            }
        />
        </Routes>
    )
}