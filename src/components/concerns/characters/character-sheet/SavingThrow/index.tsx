import { scoreToModifierString } from '@/utils/character.utils';
import { BigNumberText } from '../BigNumberText';
import { ProficientIndicator } from '../ProficientIndicator';
import * as S from './styled';
import { capitalize } from 'lodash';

interface SavingThrowProps {
    save: string;
    mod: string;
    prof: boolean;
    [prop: string]: any;
}

export default function SavingThrow({
    save,
    mod,
    prof,
    ...props
}: SavingThrowProps) {
    return(
        <S.Root>
            <S.ScoreBox>
                <BigNumberText>{mod}</BigNumberText>
            </S.ScoreBox>
            <S.LabelBox>
                <ProficientIndicator $prof={prof} />
                <BigNumberText>{capitalize(save)}</BigNumberText>
            </S.LabelBox>
        </S.Root>
    )
}