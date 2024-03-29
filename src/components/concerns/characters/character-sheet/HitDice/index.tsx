import Button from '@/components/UI/button';
import { BubbleLabel } from '../BubbleLabel';
import { Bubble } from '../styled';
import * as S from './styled';

interface HitDiceProps {
    current: number;
    max: number;
    size: string;
    [prop: string]: any;
}

export default function HitDice({
    current,
    max,
    size,
    ...props
}: HitDiceProps) {
    return(
        <S.Root {...props}>
            <BubbleLabel>HIT DICE {`(${size})`}</BubbleLabel>
            <S.Values>{current}/{max}</S.Values>
            <S.Controls>
                <S.ControlButton fill={false} color='red'>SPEND</S.ControlButton>
                <S.ControlButton fill={false} color='green'>REFILL</S.ControlButton>
            </S.Controls>
        </S.Root>
    )
}