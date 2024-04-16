import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Item } from '@/types';
import * as S from './styled';
import { handleInput, toggleInput } from '@/utils/component.utils';
import Select from '@/components/UI/select';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchItemMutation, usePostItemMutation } from '@/api/items.api';
import { ItemBulk, ItemKind, ItemRarity } from '@/enums';
import Checkbox from '@/components/UI/checkbox';
import { useAppSelector } from '@/hooks/useAppSelector.hook';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    kind: ItemKind.Armor,
    rarity: ItemRarity.Common,
    magic: false,
    bulk: ItemBulk.Trivial,
    value: ''
    
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    kind: [] as string[],
    rarity: [] as string[],
    magic: [] as string[],
    bulk: [] as string[],
    value: [] as string[]
}

interface ItemFormProps {
    editing?: boolean;
    [prop: string]: any;
}

export default function ItemForm({
    editing=false,
    ...props
}: ItemFormProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const items = useAppSelector( (state) => state.entities.items)

    const [triggerPost, postQuery] = usePostItemMutation();
    const [triggerPatch, patchQuery] = usePatchItemMutation();

    const trigger = editing ? triggerPatch : triggerPost;
    const query = editing ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<Item>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });

    useEffect( () => {
        if (editing && id && id in items) {
            const feature = items[id];
            setInputs(feature);
        } else if (editing && id && !(id in items) ) {
            navigate('/items/new');
        }
        else {
            setInputs(initialInputs);
        }
    }, [id])

    const handleSave = () => {;
        trigger({
            item: inputs
        })
        .unwrap()
        .then( res => {
            const {id} = res;
            setErrors(initialErrors);
            setTriggerOpenPanel({
                id: id,
                success: true
            });
        })
        .catch( err => {
            if (err.data && err.data.errors) {
                setErrors(err.data.errors);
            }
        })
    }

    useEffect( () => {
        const {id, success} = triggerOpenPanel;
        if (success) {
            dispatch({
                type: openPanel.type,
                payload: {
                    id: id,
                    panelType: 'items'
                }
            })
            setTriggerOpenPanel({
                id: '',
                success: false
            });
        }
    }, [triggerOpenPanel])

    return(
        <S.Root {...props}>
            <S.Body>
                <S.Name
                    value={inputs.name}
                    placeholder='New Item'
                    onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    errors={errors.name}
                />
                <S.Selects>
                    <Checkbox
                        label='Magic?'
                        checked={inputs.magic}
                        onChange={()=>toggleInput('magic', inputs, setInputs)} 
                    />
                    <Select
                        label='Kind'
                        value={inputs.kind}
                        options={Object.values(ItemKind)}
                        onChange={e => handleInput(e, 'kind', inputs, setInputs)}
                        errors={errors.kind}
                    />
                    <Select
                        label='Rarity'
                        value={inputs.rarity}
                        options={Object.values(ItemRarity)}
                        onChange={e => handleInput(e, 'rarity', inputs, setInputs)}
                        errors={errors.rarity}
                    />
                    <Select
                        label='Bulk'
                        value={inputs.bulk}
                        options={Object.values(ItemBulk)}
                        onChange={e => handleInput(e, 'bulk', inputs, setInputs)}
                        errors={errors.bulk}
                    />
                    <S.Value
                        label='Value'
                        value={inputs.value}
                        placeholder='6d9x420'
                        onChange={e => handleInput(e, 'value', inputs, setInputs)}
                        errors={errors.value}
                    />
                </S.Selects>
                <S.Description
                    label='Description'
                    value={inputs.description}
                    onChange={e => handleInput(e, 'description', inputs, setInputs)}
                    type='textarea'
                    errors={errors.description}
                />
            </S.Body>
            <S.Buttons>
                <S.Button
                    color='red'
                    onClick={()=>navigate('/')}
                >
                    Cancel
                </S.Button>
                <S.Button
                    onClick={handleSave}
                    loading={query.isLoading}
                >
                    Save
                </S.Button>
            </S.Buttons>
        </S.Root>
    )
}