import Loading from '@/components/common/loading';
import { Route, Routes } from 'react-router-dom';
import ItemForm from '@/components/concerns/items/item-form';
import GmRoute from './gm.route';

export default function ItemRoutes() {

    return(
        <Routes>
            <Route
                path='/items/new'
                element={
                    <GmRoute>
                        <ItemForm />
                    </GmRoute>
                }
            />
            <Route
                path='/items/edit/:id'
                element={
                    <GmRoute>
                        <ItemForm editing/>
                    </GmRoute>
                }
            />
        </Routes>
    )
}