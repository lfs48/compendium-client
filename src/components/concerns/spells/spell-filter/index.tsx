import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';

interface SpellsFilterProps {
    [prop: string]: any;
}

export default function SpellsFilter({
    ...props
}: SpellsFilterProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {filters} = sidebarState.spells

    const handleSelect = (field) => (e) => {
        const newState = merge({}, sidebarState);
        newState.spells.filters[field] = e.target.value || undefined;
        setSidebarState(newState);
    }

    return(
        <S.Root {...props}>
            <EntitySelect
                label='Class'
                value={filters.description}
                entityType='dndClasses'
                onChange={handleSelect('description')}
                allowNoneSelection
            />
        </S.Root>
    )
}