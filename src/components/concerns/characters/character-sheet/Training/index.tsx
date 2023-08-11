import { BubbleLabel } from '../BubbleLabel';
import * as S from './styled';

interface TrainingProps {
    armor: string;
    weapons: string;
    [prop: string]: any;
}

export default function Training({
    armor,
    weapons,
    ...props
}: TrainingProps) {
    return(
        <S.Root {...props}>
            <BubbleLabel>TRAINING</BubbleLabel>
            <S.Body>
                <div>
                    <S.Label>Armor:</S.Label> {armor.length >= 1 ? armor : 'None'}
                </div>
                <div>
                    <S.Label>Weapons:</S.Label> {weapons.length >= 1 ? weapons : 'None'}
                </div>
            </S.Body>
        </S.Root>
    )
}