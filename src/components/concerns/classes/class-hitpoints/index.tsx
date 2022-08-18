import { DndClass } from '@/types';
import { DiceRoll } from 'rpg-dice-roller';
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
                {`3${hitdie} at 1st level, plus 1${hitdie} per level after 1st`}
            </p>
            <p>
                <strong>Hit Points at 1st Level: </strong>
                {roll.maxTotal + " + your Constitution score"}
            </p>
            <p>
                <strong>Hit Points at Higher Levels: </strong>
                {Math.ceil(roll.averageTotal) + ` + your Constitution modifier per level after 1st`}
            </p>
            </S.Body>
        </S.Root>
    )
}