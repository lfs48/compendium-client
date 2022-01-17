import { DndClass } from '@/types';
import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import * as S from './styled';

interface ClassHitpointsProps {
    dndClass: DndClass;
    [prop: string]: any;
}

export default function ClassHitpoints({
    dndClass,
    ...props
}: ClassHitpointsProps) {

    const {hitdie, name} = dndClass;

    const roll = new DiceRoll(hitdie);

    return(
        <S.Root {...props}>
            <h2>Hit Points</h2>
            <S.Body>
            <p>
                <strong>Hit Dice: </strong>
                {hitdie + ` per ${name.toLowerCase()} level`}
            </p>
            <p>
                <strong>Hit Points at 1st Level: </strong>
                {roll.maxTotal + " + plus your Constitution modifier"}
            </p>
            <p>
                <strong>Hit Points at Higher Levels: </strong>
                {Math.ceil(roll.averageTotal) + ` + plus your Constitution modifier per ${name.toLowerCase()} level after 1st`}
            </p>
            </S.Body>
        </S.Root>
    )
}