import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';
import Select from '@/components/UI/molecules/select';
import { apiSourceTypeToGameEntity } from '@/utils/entities.utils';
import { LEVEL_ARRAY } from '@/utils/constants.utils';
import Label from '@/components/UI/atoms/label';
import { ItemBulk, ItemKind, ItemRarity } from '@/enums';

interface ItemFiltersProps {
    [prop: string]: any;
}

export default function ItemFilters({
    ...props
}:ItemFiltersProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {items} = sidebarState.filters;

    const handleSelect = (field) => (e) => {
        const newState = merge({}, sidebarState);
        newState.filters.items[field] = e.target.value || undefined;
        setSidebarState(newState);
    }

    return(
        <S.Root {...props}>
            <Select
                label='Type'
                value={items.kind}
                options={Object.values(ItemKind)}
                onChange={handleSelect('kind')}
                allowNoneSelection
            />
            <Select
                label='Rarity'
                value={items.rarity}
                options={Object.values(ItemRarity)}
                onChange={handleSelect('rarity')}
                allowNoneSelection
            />
            <Select
                label='Magic'
                value={items.magic}
                options={[
                    {label: 'Magic', value: true},
                    {label: 'Nonmagic', value: false}
                ]}
                onChange={handleSelect('magic')}
                allowNoneSelection
            />
            <div>
                <Label>Bulk</Label>
                <S.SelectsLine>
                    <Select
                        value={items.bulkDir}
                        options={['=', '>', '<']}
                        onChange={handleSelect('bulkDir')}
                        disabled={!items.bulk}
                    />
                    <Select
                        value={items.bulk}
                        options={Object.values(ItemBulk)}
                        onChange={handleSelect('bulk')}
                        allowNoneSelection
                    />
                </S.SelectsLine>
            </div>
        </S.Root>
    )
}