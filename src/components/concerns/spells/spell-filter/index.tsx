import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';
import Select from '@/components/common/select';
import Label from '@/components/common/label';
import { SpellAspect } from '@/enums';
import Close from '@/components/common/close';
import Field from '@/components/common/field';
import { handleInput } from '@/utils/component.utils';

interface SpellsFilterProps {
    [prop: string]: any;
}

export default function SpellsFilter({
    ...props
}: SpellsFilterProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {filters} = sidebarState.spells;
    const {rank, rankDir, description, aspects} = filters;

    const handleInput = (field) => (e) => {
        const newState = merge({}, sidebarState);
        newState.spells.filters[field] = e.target.value || undefined;
        setSidebarState(newState);
    }

    const handleSelectAspect = (aspect) => {
        const newState = merge({}, sidebarState);
        const newAspects = merge([],sidebarState.spells.filters.aspects) 
        if (newAspects.includes(aspect)) {
            newState.spells.filters.aspects = newAspects.filter( el => el !== aspect);
        } else {
            newAspects.push(aspect);
            newState.spells.filters.aspects = newAspects;
        }
        setSidebarState(newState);
    }

    const selectedAspects = [...aspects]
    .sort()
    .map( (aspect) => {
        return(
            <S.Aspect
                key={aspect}
            >
                <div>{aspect}</div>
                <Close onClick={()=>handleSelectAspect(aspect)}/>
            </S.Aspect>
        )
    })

    return(
        <S.Root {...props}>
            <Label>Rank</Label>
            <S.Line>
                <Select
                    value={rankDir}
                    options={[
                        {label: '=', value: 0},
                        {label: '>', value: 1},
                        {label: '<', value: -1}
                    ]}
                    onChange={handleInput('rankDir')}
                    disabled={!!!rank}
                />
                <Select
                    value={rank}
                    options={[0,1,2,3,4]}
                    onChange={handleInput('rank')}
                    allowNoneSelection
                />
            </S.Line>
            <Select
                label='Aspects'
                options={Object.values(SpellAspect)}
                onChange={(e) => handleSelectAspect(e.target.value)}
            />
            <S.Aspects>
                {selectedAspects}
            </S.Aspects>
            <Field 
                label='Description'
                type='textarea'
                value={description}
                onChange={handleInput('description')}
            />
        </S.Root>
    )
}