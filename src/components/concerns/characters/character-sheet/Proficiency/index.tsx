import { scoreToModifierString } from '@/utils/character.utils';
import { BigNumberText } from '../BigNumberText';
import { BubbleLabel } from '../BubbleLabel';
import * as S from './styled';

interface ProficiencyProps {
    prof: number;
    [prop: string]: any;
}

export default function Proficiency({
    prof,
    ...props
}: ProficiencyProps) {
    return(
        <S.Root {...props}>
            <BubbleLabel>PROF</BubbleLabel>
            <BigNumberText>+{prof}</BigNumberText>
        </S.Root>
    )
}