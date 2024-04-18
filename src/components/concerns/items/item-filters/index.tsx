import { sidebarAtom } from '@/recoil';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { merge } from 'lodash';
import Select from '@/components/common/select';
import Label from '@/components/common/label';
import { ItemBulk, ItemKind, ItemRarity } from '@/enums';

interface ItemFiltersProps {
    [prop: string]: any;
}

export default function ItemFilters({
    ...props
}:ItemFiltersProps) {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {magic, rarity, kind, bulk, bulkDir} = sidebarState.items.filters;

    const handleSelect = (field) => (e) => {
        const newState = merge({}, sidebarState);
        newState.items.filters[field] = e.target.value || undefined;
        setSidebarState(newState);
    }

    return(
        <S.Root {...props}>
            <Select
                label='Type'
                value={kind}
                options={Object.values(ItemKind)}
                onChange={handleSelect('kind')}
                allowNoneSelection
            />
            <Select
                label='Rarity'
                value={rarity}
                options={Object.values(ItemRarity)}
                onChange={handleSelect('rarity')}
                allowNoneSelection
            />
            <Select
                label='Magic'
                value={magic}
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
                        value={bulkDir}
                        options={['=', '>', '<']}
                        onChange={handleSelect('bulkDir')}
                        disabled={!bulk}
                    />
                    <Select
                        value={bulk}
                        options={Object.values(ItemBulk)}
                        onChange={handleSelect('bulk')}
                        allowNoneSelection
                    />
                </S.SelectsLine>
            </div>
        </S.Root>
    )
}