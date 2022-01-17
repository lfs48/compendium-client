import React from 'react';
import { DndClass } from '@/types';
import * as S from './styled';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import Divider from '@/components/atoms/divider';
import StartingEquipment from '@/components/molecules/starting-equipment';
import ClassHitpoints from '@/components/molecules/class-hitpoints';
import ClassProficiencies from '@/components/molecules/class-proficiencies';
import ClassFeatures from '@/components/molecules/class-features';

interface ClassPanelContentProps {
    dndClass: DndClass;
    [prop: string]: any;
}

const ClassPanelContent = React.memo(function ClassPanelContent({
    dndClass,
    ...props
}: ClassPanelContentProps) {

    return(
        <S.Root {...props}>
            <S.Description>
                {dndClass.description}
            </S.Description>
            <Divider />
            <div>
                <h1>Class Features</h1>
                <p>{`As a ${dndClass.name.toLowerCase()}, you get the following class features.`}</p>
            </div>
            <ClassHitpoints
                dndClass={dndClass}
            />
            <ClassProficiencies 
                dndClass={dndClass}
            />
            <StartingEquipment 
                equipmentList={dndClass.equipment}
            />
            <ClassFeatures
                dndClass={dndClass}
            />
        </S.Root>
    )
})

export default ClassPanelContent;