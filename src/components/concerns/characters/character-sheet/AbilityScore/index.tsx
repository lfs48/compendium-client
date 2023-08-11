import { scoreToModifierString } from '@/utils/character.utils';
import { BigNumberText } from '../BigNumberText';
import { BubbleLabel } from '../BubbleLabel';
import * as S from './styled';

interface AbilityScoreProps {
    ability: string;
    score: number;
    [prop: string]: any;
}

export default function AbilityScore({
    ability,
    score,
    ...props
}: AbilityScoreProps) {
    return(
        <S.Root {...props}>
            <BubbleLabel>{ability.toUpperCase()}</BubbleLabel>
            <BigNumberText>{scoreToModifierString(score)}</BigNumberText>
            <S.Score>{score}</S.Score>
        </S.Root>
    )
}