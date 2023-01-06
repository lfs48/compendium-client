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

const initialInputs = {
    id: '',
    name: '',
    description: '',
    rank: '',
    verbal: false,
    somatic: false,
    material: false,
    material_description: '',
    concentration: false,
    duration: 'Instantaneous',
    range: '',
    casting_time: '1 action',
    higher_level: '',
    dnd_class_ids: [] as string[]
}

const initialErrors = {
    id: '',
    name: [] as string[],
    description: [] as string[],
    rank: [] as string[],
    components: [] as string[],
    material_description: [] as string[],
    duration: [] as string[],
    range: [] as string[],
    casting_time: [] as string[],
    higher_level: undefined as string | undefined,
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
        if (editing && id && id in spells) {
            const spell = merge({}, spells[id]);
            if (!spell.higher_level) {
                spell.higher_level = '';
            }
            if (!spell.material_description) {
                spell.material_description = '';
            }
            setInputs(spell);
        } else if (editing && id && !(id in spells) ) {
            navigate('/spells/new');
        }
        else {
            setInputs(initialInputs);
        }
    }, [id])

    const cleanInputs = () => {
        const newState = merge({}, inputs);
        if (!inputs.material || inputs.material_description === '') {
            delete newState.material_description;
        }
        if (inputs.higher_level === '') {
            delete newState.higher_level;
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
                    panelType: 'spells'
                }
            })
            setTriggerOpenPanel({
                id: '',
                success: false
            });
        }
    }, [triggerOpenPanel])

    const handleSelectClass = (id:string) => {
        const newState = merge({}, inputs);
        if (inputs.dnd_class_ids.includes(id)) {
            newState.dnd_class_ids = inputs.dnd_class_ids.filter( old_id => old_id !== id);
        } else {
            newState.dnd_class_ids.push(id);
        }
        setInputs(newState);
    }

    const vsmInputs = ['verbal', 'somatic', 'material'].map( component => {
        return(
            <Checkbox
                key={component}
                label={component}
                checked={inputs[component]} 
                onChange={() => handleToggleInput(component, inputs, setInputs)}
            />
        )
    })

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
                <ClassMultiselect 
                    value={inputs.dnd_class_ids}
                    handleSelect={handleSelectClass}
                />
                </S.Top>
                <Select
                    value={inputs.rank}
                    label='Rank'
                    onChange={(e)=>handleInput(e, 'rank', inputs, setInputs)}
                    options={['0', '1', '2', '3', '4']}
                    defaultInput='0'
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
                {vsmInputs}
                {inputs.material &&
                    <Field
                        value={inputs.material_description || ''}
                        label='Material Description'
                        onChange={(e)=>handleInput(e, 'material_description', inputs, setInputs)}
                        placeholder='At least 50oz of bat guano'
                    />
                }
                <S.Description
                    label='Description'
                    value={inputs.description}
                    onChange={e => handleInput(e, 'description', inputs, setInputs)}
                    type='textarea'
                    errors={errors.description}
                />
                <S.Description
                    label='At Higher Levels'
                    value={inputs.higher_level}
                    onChange={e => handleInput(e, 'higher_level', inputs, setInputs)}
                    type='textarea'
                    errors={errors.higher_level}
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