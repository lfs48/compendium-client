import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spell, RootState } from '@/types';
import * as S from './styled';
import { handleInput, handleToggleInput } from '@/utils/component.utils';
import Select from '@molecules/select';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchSpellMutation, usePostSpellMutation } from '@/api/spells.api';
import EntityAutocomplete from '../../entities/entity-autocomplete';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';
import ClassMultiselect from '../../classes/class-multiselect';
import Field from '@/components/UI/molecules/field';
import Checkbox from '@/components/UI/atoms/checkbox';
import { Entity, SpellAspect } from '@/enums';
import { intToOrdinal } from '@/utils/functions.utils';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    rank: '0',
    concentration: false,
    duration: 'Instantaneous',
    range: '',
    targets: '',
    casting_time: '1 action',
    upcast: [],
    aspects: [],
    dnd_class_ids: [] as string[]
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    rank: [] as string[],
    components: [] as string[],
    material: [] as string[],
    duration: [] as string[],
    range: [] as string[],
    targets: [] as string[],
    casting_time: [] as string[],
    upcast: undefined as string | undefined,
    aspects: [] as string [],
    dnd_class_ids: [] as string[]
}

interface SpellFormProps {
    editing?: boolean;
    [prop: string]: any;
}

export default function SpellForm({
    editing=false,
    ...props
}: SpellFormProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const spells = useSelector( (state:RootState) => state.entities.spells)

    const [triggerPost, postQuery] = usePostSpellMutation();
    const [triggerPatch, patchQuery] = usePatchSpellMutation();

    const trigger = editing ? triggerPatch : triggerPost;
    const query = editing ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<Spell>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });

    useEffect( () => {
        if (editing && id && (id in spells) ) {
            setInputs(spells[id])
        } else {
            navigate('/spells/new');
            setInputs(initialInputs);
        }
    }, [id])

    const cleanInputs = () => {
        const newState = merge({}, inputs);
        if (!inputs.material || inputs.material === '') {
            delete newState.material_description;
        }
        return newState;
    };

    const handleSave = () => {
        const cleanedInputs = cleanInputs();
        trigger({
            spell: cleanedInputs
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
                    panelType: Entity.spells
                }
            })
            setTriggerOpenPanel({
                id: '',
                success: false
            });
        }
    }, [triggerOpenPanel])

    const handleToggleMaterial = () => {
        const newState = merge({}, inputs);
        const checked = inputs.material !== undefined;
        if (checked) {
            delete newState.material;
        } else {
            newState.material = '';
        }
        setInputs(newState);
    }

    const handleUpcastInput = (i, e) => {
        const newState = merge({}, inputs);
        const upcast = inputs.upcast;
        if (upcast) {
            upcast[i] = e.target.value;
            newState.upcast = upcast;
        }
        setInputs(newState);
    }

    const upcastFields = [0,1,2].map( (i) => {
        const numRank = parseInt(inputs.rank);
        if (numRank >= 1 && numRank + i <= 3) {
            const label = `${intToOrdinal(numRank+i+1)} Rank or Higher`
            return(
                <S.Description
                    key={i}
                    label={label}
                    value={!!inputs.upcast ? inputs.upcast[i] : ''}
                    onChange={(e) => handleUpcastInput(i,e)}
                    type='textarea'
                />
            )
        }
    })

    const handleSelectAspect = (e) => {
        const aspect = e.target.value;
        const newState = merge({}, inputs);
        const aspects = inputs.aspects;
        if (aspects.includes(aspect)) {
            newState.aspects = aspects.filter( (el) => el != aspect);
        } else {
            aspects.push(aspect);
            newState.aspects = aspects;
        }
        setInputs(newState);
    }

    return(
        <S.Root {...props}>
            <S.Body>
                <S.Top>
                <S.Name
                    value={inputs.name}
                    placeholder='New Spell'
                    onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    errors={errors.name}
                />
                </S.Top>
                <div className='flex space-x-2'>
                    <Select
                        value={inputs.rank}
                        label='Rank'
                        onChange={(e)=>handleInput(e, 'rank', inputs, setInputs)}
                        options={['0', '1', '2', '3', '4']}
                    />
                    <Field
                        value={inputs.casting_time}
                        label='Casting Time'
                        onChange={(e)=>handleInput(e, 'casting_time', inputs, setInputs)}
                        placeholder='1 action'
                    />
                    <Field
                        value={inputs.range}
                        label='Range'
                        onChange={(e)=>handleInput(e, 'range', inputs, setInputs)}
                        placeholder='Short'
                    />
                    <Field
                        value={inputs.targets}
                        label='Targets'
                        onChange={(e)=>handleInput(e, 'targets', inputs, setInputs)}
                        placeholder='Self'
                    />
                    <Field
                        value={inputs.duration}
                        label='Duration'
                        onChange={(e)=>handleInput(e, 'duration', inputs, setInputs)}
                        placeholder='Instantaneous'
                    />
                    <Checkbox
                        label='Concentration?'
                        checked={inputs.concentration} 
                        onChange={() => handleToggleInput('concentration', inputs, setInputs)}
                    />
                    <Checkbox
                        label='Material?'
                        checked={'material' in inputs} 
                        onChange={handleToggleMaterial}
                    />
                    <Field
                        value={inputs.material || ''}
                        label='Material'
                        onChange={(e)=>handleInput(e, 'material', inputs, setInputs)}
                        placeholder='At least 50oz of bat guano'
                        disabled={!('material' in inputs)}
                    />
                </div>
                <div>
                    <Select
                        label='Aspects'
                        value={inputs.aspects}
                        options={Object.values(SpellAspect)}
                        onChange={(e)=>handleSelectAspect(e)}
                        multiple
                    />
                </div>
                <div>
                    <S.Description
                        label='Description'
                        value={inputs.description}
                        onChange={e => handleInput(e, 'description', inputs, setInputs)}
                        type='textarea'
                        errors={errors.description}
                    />
                    {upcastFields}
                </div>
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