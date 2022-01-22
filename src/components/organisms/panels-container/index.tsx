import Panel from '@/components/organisms/panel';
import { DndClass, RootState } from '@/types';
import { useSelector } from 'react-redux';
import Markdown from '@molecules/markdown';
import ClassPanelContent from '@/components/organisms/class-panel-content';
import React, { useEffect, useState } from 'react';
import {merge} from 'lodash';

const PanelsContainer = React.memo( function PanelsContainer() {

    const {panels, entities} = useSelector( (state:RootState) => ({
        panels: state.UI.panels,
        entities: state.entities
    }))

    const [panelIds, setPanelIds] = useState(Object.values(panels).map( ({id}) => id))

    useEffect( () => {
        let newState = panelIds.filter( (id) => Object.keys(panels).includes(id) )
        const newPanels = Object.values(panels)
        .filter( ({id}) => !panelIds.includes(id))
        .map( ({id}) => id);
        newState = newState.concat(newPanels);
        setPanelIds(newState);
    }, [panels])

    const handleSelectPanel = (i) => {
        const newState = merge([], panelIds);
        newState.push(newState.splice(i,1)[0]);
        setPanelIds(newState);
    }

    const panelComponents = panelIds
    .map( (id, i) => {
        if (id in panels) {
            const panel = panels[id];
            const entity = entities[panel.panelType][panel.id];
            return (
                <Panel
                    key={panel.id} 
                    data={entity as any}
                    onMouseDown={()=>handleSelectPanel(i)}
                >
                        {panel.panelType === 'dndClasses' ?
                            <ClassPanelContent 
                                dndClass={entity as DndClass}
                            />
                        :
                            <Markdown>
                                {entity.description}
                            </Markdown>
                        }
                </Panel>
            )
        } else {
            return(<></>)
        }
    })

    return <>{panelComponents}</>;
})

export default PanelsContainer;