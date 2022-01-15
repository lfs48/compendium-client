import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import Page from '@/components/atoms/page';
import Sidebar from '@/components/organisms/sidebar';

export default function Dashboard() {

    return(
        <Page>
            <Sidebar />
        </Page>
    )
}