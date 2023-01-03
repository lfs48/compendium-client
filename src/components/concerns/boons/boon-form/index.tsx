import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Boon, RootState } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Select from '@molecules/select';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchBoonMutation, usePostBoonMutation } from '@/api/boons.api';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';
import { apiSourceTypeToGameEntity } from '@/utils/entities.utils';
import Field from '@/components/UI/molecules/field';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    prereq: '',
    source_id: undefined as undefined | string,
    source_type: undefined as undefined | 'DndClass' | 'Race'
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    source_id: [] as string[],
    source_type: [] as string[]
}

const sourceTypeOptions = [
    {
        value: undefined,
        label: 'Generic'
    },
    {
        value: 'DndClass',
        label: 'Class'
    },
    {
        label: 'Race',
        value: 'Race'
    }
]

interface BoonFormProps {
    editing?: boolean;
    [prop: string]: any;
}

export default function BoonForm({
    editing=false,
    ...props
}: BoonFormProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const boons = useSelector( (state:RootState) => state.entities.boons)

    const [triggerPost, postQuery] = usePostBoonMutation();
    const [triggerPatch, patchQuery] = usePatchBoonMutation();

    const trigger = editing ? triggerPatch : triggerPost;
    const query = editing ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<Boon>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });

    useEffect( () => {
        if (editing && id && id in boons) {
            const feat = boons[id];
            setInputs(feat);
        } else if (editing && id && !(id in boons) ) {
            navigate('/boons/new');
        }
        else {
            setInputs(initialInputs);
        }
    }, [id])

    const handleChangeSourceType = (e) => {
        const newType = e.target.value;
        const newState = merge({}, inputs);
        newState.sorce_type = newType;
        newState.source_id
    }

    const handleSave = () => {;
        trigger({
            boon: inputs
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
                    panelType: 'boons'
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
                <S.Top>
                <S.Name
                    value={inputs.name}
                    placeholder='New Boon'
                    onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    errors={errors.name}
                />
                <S.Selects>
                    <Select
                        label='Source Type'
                        onChange={(e)=>handleInput(e, 'source_type', inputs, setInputs)}
                        options={sourceTypeOptions}
                        errors={errors.source_type}
                    />
                    <EntitySelect
                        label='Source'
                        disabled={!apiSourceTypeToGameEntity(inputs.source_type || '')}
                        entityType={apiSourceTypeToGameEntity(inputs.source_type || '') || 'dndClasses'}
                        onChange={e => handleInput(e, 'source_id', inputs, setInputs)}
                        allowNoneSelection
                        errors={errors.source_id}
                    />
                </S.Selects>
                </S.Top>
                <Field 
                    label='Prereq'
                    value={inputs.prereq || ''}
                    onChange={e => handleInput(e, 'prereq', inputs, setInputs)}
                />
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