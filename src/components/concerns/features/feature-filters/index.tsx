import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';
import Select from '@/components/UI/molecules/select';
import { apiSourceTypeToGameEntity } from '@/utils/entities.utils';
import { LEVEL_ARRAY } from '@/utils/constants.utils';
import Label from '@/components/UI/atoms/label';

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
                        options={['DndClass', 'Race']}
                        onChange={handleSelect('sourceType')}
                        allowNoneSelection
                    />
                    <EntitySelect
                        value={filters.source}
                        entityType={apiSourceTypeToGameEntity(filters.sourceType)}
                        onChange={handleSelect('source')}
                        allowNoneSelection
                        disabled={!filters.sourceType}
                    />
                </S.SelectsLine>
            </div>
        </S.Root>
    )
}