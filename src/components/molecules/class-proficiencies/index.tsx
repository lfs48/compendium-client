import { DndClass } from '@/types';
import * as S from './styled';

interface ClassHitpointsProps {
    dndClass: DndClass;
    [prop: string]: any;
}

export default function ClassProficiencies({
    dndClass,
    ...props
}: ClassHitpointsProps) {

    const {armor, weapons, tools, saves, skills} = dndClass;

    return(
        <S.Root {...props}>
            <h2>Proficiencies</h2>
            <S.Body>
                <p>
                    <strong>Armor: </strong>
                    {armor}
                </p>
                <p>
                    <strong>Weapons: </strong>
                    {weapons}
                </p>
                <p>
                    <strong>Tools: </strong>
                    {tools}
                </p>
                <p>
                    <strong>Saving Throws: </strong>
                    {saves}
                </p>
                <p>
                    <strong>Skills: </strong>
                    {skills}
                </p>
            </S.Body>
        </S.Root>
    )
}