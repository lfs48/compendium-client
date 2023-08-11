import { BubbleLabel } from '../BubbleLabel';
import * as S from './styled';

interface DefensesProps {
    resistances: string;
    immunities: string;
    [prop: string]: any;
}

export default function Defenses({
    resistances,
    immunities,
    ...props
}: DefensesProps) {
    return(
        <S.Root {...props}>
            <BubbleLabel>DEFENSES</BubbleLabel>
            <S.Body>
                <div>
                    <S.Label>Resistances:</S.Label> {resistances.length >= 1 ? resistances : 'None'}
                </div>
                <div>
                    <S.Label>Immunities:</S.Label> {immunities.length >= 1 ? immunities : 'None'}
                </div>
            </S.Body>
        </S.Root>
    )
}