import { Character } from '@/types';
import { calcCarryingCapacity } from '@/utils/character.utils';
import { useState } from 'react';
import Inventory from '../Inventory';
import { capitalize } from 'lodash';
import * as S from './styled';
import Features from '../Features';
import Spells from '../Spells';

interface TabBoxProps {
    character: Character;
    [prop: string]: any;
}

export default function TabBox({
    character,
    ...props
}: TabBoxProps) {

    const [selectedTab, setSelectedTab] = useState('inventory');

    const tabs = ['attacks', 'inventory', 'features', 'spells'].map( (tab) =>
        <S.Tab
            key={tab}
            $selected={selectedTab === tab}
            onClick={()=>setSelectedTab(tab)}
        >
            {tab.toUpperCase()}
        </S.Tab>
    );

    const tabContent = () => {
        switch(selectedTab) {
            case('inventory'):
                return(
                    <Inventory
                        slots={character.inventory}
                        capacity={calcCarryingCapacity(character)}
                        currency={character.currency}
                    />
                );
            case('features'):
                return(
                    <Features
                        feature_ids={character.feature_ids}
                    />
                );
            case('spells'):
                return(
                    <Spells
                        spell_ids={character.spell_ids}
                    />
                );
            default:
                return <></>
        }
    }

    return(
        <S.Root>
            <S.Tabs>
                {tabs}
            </S.Tabs>
            <S.Body>
                {tabContent()}
            </S.Body>
        </S.Root>
    )
}