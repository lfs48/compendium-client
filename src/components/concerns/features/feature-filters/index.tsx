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

    const handleSelect = (field) => (e) => {
        const newState = merge({}, sidebarState);
        newState.filters.features[field] = e.target.value || undefined;
        setSidebarState(newState);
    }

    return(
        <S.Root {...props}>
            <Select
                label='Type'
                value={sidebarState.filters.features.kind}
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
                        value={sidebarState.filters.features.levelDir}
                        options={['=', '>', '<']}
                        onChange={handleSelect('levelDir')}
                        disabled={!sidebarState.filters.features.level}
                    />
                    <Select
                        value={sidebarState.filters.features.level}
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
                        value={sidebarState.filters.features.sourceType}
                        options={['DndClass', 'Race']}
                        onChange={handleSelect('sourceType')}
                        allowNoneSelection
                    />
                    <EntitySelect
                        value={sidebarState.filters.features.source}
                        entityType={apiSourceTypeToGameEntity(sidebarState.filters.features.sourceType)}
                        onChange={handleSelect('source')}
                        allowNoneSelection
                        disabled={!sidebarState.filters.features.sourceType}
                    />
                </S.SelectsLine>
            </div>
        </S.Root>
    )
}