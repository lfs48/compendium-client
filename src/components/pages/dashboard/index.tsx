import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import Page from '@/components/atoms/page';
import Panel from '@/components/organisms/panel';
import Sidebar from '@/components/organisms/sidebar';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import Markdown from '@molecules/markdown';

export default function Dashboard() {

    const {panels, entities} = useSelector( (state:RootState) => ({
        panels: state.UI.panels,
        entities: state.entities
    }))

    const panelComponents = panels.map( (panel) => {
        const entity = entities[panel.panelType][panel.id];
        return (
            <Panel 
                key={panel.id} 
                data={entity} 
            >
                <Markdown>
                    {entity.description}
                </Markdown>
            </Panel>
        )
    })

    return(
        <Page>
            {panelComponents}
            <Sidebar />
        </Page>
    )
}