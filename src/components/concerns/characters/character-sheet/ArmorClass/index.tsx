import { scoreToModifierString } from '@/utils/character.utils';
import { BigNumberText } from '../BigNumberText';
import { ProficientIndicator } from '../ProficientIndicator';
import * as S from './styled';
import { capitalize } from 'lodash';

interface ArmorClassProps {
    ac: number;
    [prop: string]: any;
}

export default function ArmorClass({
    ac,
    ...props
}: ArmorClassProps) {
    return(
        <S.Root>
            <S.BorderExtend />
            <S.Shield />
            <S.ScoreBox>
                <BigNumberText>{ac}</BigNumberText>
            </S.ScoreBox>
            <S.LabelBox>
                <BigNumberText>Armor Class</BigNumberText>
            </S.LabelBox>
        </S.Root>
    )
}