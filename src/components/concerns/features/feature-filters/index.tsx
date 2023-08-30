import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';
import Select from '@/components/UI/molecules/select';
import { LEVEL_ARRAY } from '@/utils/constants.utils';
import Label from '@/components/UI/atoms/label';
import { APIEntity } from '@/enums';
import { apiEntityToClientEntity } from '@/utils/entities.utils';

interface FeatureFiltersProps {
    [prop: string]: any;
}

export default function FeatureFilters({
    ...props
}:FeatureFiltersProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {filters} = sidebarState.features;

    const handleSelect = (field) => (e) => {
        const newState = merge({}, sidebarState);
        newState.features.filters[field] = e.target.value || undefined;
        setSidebarState(newState);
    }

    return(
        <S.Root {...props}>
            <Select
                label='Type'
                value={filters.kind}
                options={[
                    {label: 'Core', value: 'core'},
                    {label: 'Feat', value: 'major'},
                    {label: 'Boon', value: 'minor'}
                ]}
                onChange={handleSelect('kind')}
                allowNoneSelection
            />
            <div>
                <Label>Level</Label>
                <S.SelectsLine>
                    <Select
                        value={filters.levelDir}
                        options={['=', '>', '<']}
                        onChange={handleSelect('levelDir')}
                        disabled={!filters.level}
                    />
                    <Select
                        value={filters.level}
                        options={LEVEL_ARRAY}
                        onChange={handleSelect('level')}
                        allowNoneSelection
                    />
                </S.SelectsLine>
            </div>
            <div>
                <Label>Source</Label>
                <S.SelectsLine>
                    <Select
                        value={filters.sourceType}
                        options={[APIEntity.DndClass, APIEntity.Race]}
                        onChange={handleSelect('sourceType')}
                        allowNoneSelection
                    />
                    <EntitySelect
                        value={filters.source}
                        entityType={filters.sourceType ? apiEntityToClientEntity(filters.sourceType) : undefined}
                        onChange={handleSelect('source')}
                        allowNoneSelection
                        disabled={!filters.sourceType}
                    />
                </S.SelectsLine>
            </div>
        </S.Root>
    )
}