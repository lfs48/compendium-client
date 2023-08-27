import { useGetAllItemsQuery } from '@/api/items.api';
import Loading from '@atoms/loading';
import { Route, Routes } from 'react-router-dom';
import ItemForm from '@/components/concerns/items/item-form';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import GmRoute from './gm.route';

export default function ItemRoutes() {

    const getItemesQuery = useGetAllItemsQuery ();
    const getFeaturesQuery = useGetAllFeaturesQuery();

    return(
        <Routes>
            <Route
                path='/items/new'
                element={
                    <GmRoute>
                        {(getItemesQuery.isLoading || getFeaturesQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <ItemForm />
                        }
                    </GmRoute>
                }
            />
            <Route
                path='/items/edit/:id'
                element={
                    <GmRoute>
                        {(getItemesQuery.isLoading || getFeaturesQuery.isLoading)
                            ?
                                <Loading />
                            :
                                <ItemForm editing/>
                        }
                    </GmRoute>
                }
            />
        </Routes>
    )
}