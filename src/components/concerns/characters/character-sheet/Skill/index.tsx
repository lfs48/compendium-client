import Select from '@/components/common/select';
import { modifierToString } from '@/utils/character.utils';
import { snakeCaseToWords } from '@/utils/functions.utils';
import { ProficientIndicator } from '../ProficientIndicator';
import * as S from './styled';

interface SkillProps {
    skill: string;
    prof: boolean;
    mod: number;
    [prop: string]: any;
}

export default function Skill({
    skill,
    prof,
    mod,
    ...props
}: SkillProps) {
    return(
        <S.Root>
        <S.Left>
            <ProficientIndicator $prof={prof} />
            <Select
                options={['(Str)', '(Dex)', '(Con)', '(Int)', '(Awa)', '(Cha)']}
                onChange={()=>{}}
                selectClasses={S.AbilitySelectClasses}
            />
            <span>{snakeCaseToWords(skill)}</span>
        </S.Left>
        <S.Mod>{modifierToString(mod)}</S.Mod>
    </S.Root>
    )
}
