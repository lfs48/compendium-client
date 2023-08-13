import { sidebarAtom } from '@/recoil';
import { RootState } from '@/types';
import { useSelector } from 'react-redux';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';

interface FeatsFilterProps {
    [prop: string]: any;
}

export default function FeatsFilter({
    ...props
}: FeatsFilterProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);

    const handleSelect = (e) => {
        const newState = merge({}, sidebarState);
        newState.searchInputs.feats.dndClass = e.target.value || undefined;
        setSidebarState(newState);
    }

    return(
        <S.Root {...props}>
            <EntitySelect
                label='Class'
                value={sidebarState.searchInputs.feats.dndClass}
                entityType='dndClasses'
                onChange={handleSelect}
                allowNoneSelection
            />
        </S.Root>
    )
}