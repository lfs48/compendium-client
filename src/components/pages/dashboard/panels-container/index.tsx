import Panel from '@/components/common/panel';
import { RootState } from '@/types';
import { useAppSelector } from '@/hooks/useAppSelector.hook';
import Markdown from '@/components/common/markdown';
import ClassPanelContent from '@/components/concerns/classes/class-panel-content';
import React, { useEffect, useState } from 'react';
import {merge} from 'lodash';
import FeaturePanelContent from '@/components/concerns/features/feature-panel-content';
import RacePanelContent from '@/components/concerns/races/race-panel-content';
import SpellPanelContent from '@/components/concerns/spells/spell-panel-content';
import ItemPanelContent from '@/components/concerns/items/item-panel-content';
import { Entity } from '@/enums';

const PanelsContainer = React.memo( function PanelsContainer() {

    const panels = useAppSelector( (state) =>state.UI.panels )
    const entities = useAppSelector( (state) => state.entities )

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
            if (id in entities[panel.panelType]) {
                const entity = entities[panel.panelType][panel.id];
                return (
                    <Panel
                        key={panel.id} 
                        title={entity.name}
                        entity={entity as any}
                        onMouseDown={()=>handleSelectPanel(i)}
                    >
                        {panelContentComponent(panel.panelType, entity)}
                    </Panel>
                )
            }
        }
    })

    return <>{panelComponents}</>;
})

export default PanelsContainer;

function panelContentComponent(panelType:Entity, entity:any) {
    switch(panelType) {
        case('dndClasses'):
            return <ClassPanelContent dndClass={entity} />
        case('features'):
            return <FeaturePanelContent feature={entity} />
        case('races'):
            return <RacePanelContent race={entity} />
        case('spells'):
            return <SpellPanelContent spell={entity} />
        case('items'):
            return <ItemPanelContent item={entity} />
        default:
            return (
                <Markdown>
                    {entity.description}
                </Markdown>
            )
    }
}