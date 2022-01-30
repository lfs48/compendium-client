import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import Loading from '@/components/atoms/loading';
import { Route, Routes } from 'react-router-dom';
import ClassForm from '@organisms/class-form';

export default function ClassRoutes() {

    const getClassesQuery = useGetAllClassesQuery ();

    return(
        <Routes>
        <Route
            path='/classes/new'
            element={
                getClassesQuery.isLoading
                    ?
                        <Loading />
                    :
                        <ClassForm />
            }
        />
        <Route
            path='/classes/edit/:id'
            element={
                getClassesQuery.isLoading
                    ?
                        <Loading />
                    :
                        <ClassForm editing/>
            }
        />
        </Routes>
    )
}