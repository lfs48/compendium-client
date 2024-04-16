import { SyntheticEvent, useEffect, useState } from 'react';
import { merge } from 'lodash';
import { useDispatch } from 'react-redux';
import Field from '@/components/UI/field';
import { DndClass } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Select from '@/components/UI/select';
import { usePatchClassMutation, usePostClassMutation } from '@/api/dndclasses.api';
import ClassFormTable from '@/components/concerns/classes/class-form-table';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { moveObjKey, renameObjKey, snakeCaseToWords } from '@/utils/functions.utils';
import ClassFormAddColumn from '@/components/concerns/classes/class-form-add-column';
import { hasFeature } from '@/utils/dndClass.utils';
import { useNavigate, useParams } from 'react-router-dom';
import { LEVEL_ARRAY } from '@/utils/constants.utils';
import EntityAutocomplete from '../../entities/entity-autocomplete';
import { Entity, Spellcasting } from '@/enums';
import { useAppSelector } from '@/hooks/useAppSelector.hook';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    hp: '',
    defenses: '',
    weapons: '',
    armor: '',
    skills: '',
    spellcasting: Spellcasting.None,
    equipment: '',
    table_cols: {},
    features: []
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    hp: [] as string[],
    defenses: [] as string[],
    weapons: [] as string[],
    armor: [] as string[],
    skills: [] as string[],
    tools: [] as string[],
    spellcasting: [] as string[],
    equipment: [] as string[],
    table_cols: [] as string[],
    features: [] as string[]
}

interface ClassFormProps {
    editing?: boolean;
    [prop: string]: any;
}

export default function ClassForm({
    editing=false,
    ...props
}: ClassFormProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const dndClasses = useAppSelector( (state) => state.entities.dndClasses)

    const [triggerPost, postQuery] = usePostClassMutation();
    const [triggerPatch, patchQuery] = usePatchClassMutation();

    const trigger = editing ? triggerPatch : triggerPost;
    const query = editing ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<DndClass>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });

    useEffect( () => {
        if (editing && id && id in dndClasses) {
            const dndClass = dndClasses[id];
            setInputs(dndClass);
        } else if (editing && id && !(id in dndClasses) ) {
            navigate('/classes/new');
        }
        else {
            setInputs(initialInputs);
        }
    }, [id])

    const handleSave = () => {
        trigger({
            dndclass: inputs
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
            setErrors(err.data.errors);
        })
    }

    useEffect( () => {
        const {id, success} = triggerOpenPanel;
        if (success) {
            dispatch({
                type: openPanel.type,
                payload: {
                    id: id,
                    panelType: 'dndClasses'
                }
            })
            setTriggerOpenPanel({
                id: '',
                success: false
            });
        }
    }, [triggerOpenPanel])

    const handleAddCol = (name) => {
        const newState = merge({}, inputs);
        if (! (name in newState.table_cols) ) {
            const newCols = merge({}, newState.table_cols);
            newCols[name] = LEVEL_ARRAY.map( _ => '');
            newState.table_cols = newCols;
        }
        setInputs(newState);
    }

    const handleColInput = (event:SyntheticEvent<Element, Event>, col:string, i:number) => {
        const newState = merge({}, inputs);
        const newCols = merge({}, newState.table_cols);
        const target = event.target as HTMLInputElement
        newCols[col][i] = target.value;
        newState.table_cols = newCols;
        setInputs(newState);
    }

    const handleRemoveCol = (col:string) => {
        const newState = merge({}, inputs);
        const newCols = newState.table_cols;
        delete newCols[col];
        newState.table_cols = newCols;
        setInputs(newState);
    }

    const handleMoveCol = (dir:1 | -1) => (col:string) => {
        const newState = merge({}, inputs);
        const newCols = moveObjKey(newState.table_cols, col, dir);
        newState.table_cols = newCols;
        setInputs(newState);
    }

    const handleRenameCol = (col:string, newName:string) => {
        const newState = merge({}, inputs);
        if (col in newState.table_cols) {
            const newCols = renameObjKey(newState.table_cols, col, newName);
            newState.table_cols = newCols;
        }
        setInputs(newState);
    }

    const handleAddFeature = (id) => {
        const newState = merge( {}, inputs);
        if ( !hasFeature(inputs, id) ) {
            newState.features.push(id);
        }
        setInputs(newState);
    }

    const handleRemoveFeature = (_id) => {
        const newState = merge( {}, inputs);
        newState.features = newState.features
        .filter( (id) => id !== _id)
        setInputs(newState);
    }

    const fields = ['armor', 'weapons', 'defenses', 'skills']
    .map( (field) => {
        return(
            <Field
                key={field}
                label={snakeCaseToWords(field)}
                value={inputs[field]}
                errors={errors[field]}
                maxLength={50}
                onChange={e => handleInput(e, field, inputs, setInputs)}
            />
        )
    })
    
    return(
        <S.Root {...props}>
            <S.Between>
                <div className='space-y-8'>
                    <S.Grid>
                        <S.Name
                            value={inputs.name}
                            placeholder='New Class'
                            onChange={e => handleInput(e, 'name', inputs, setInputs)}
                            errors={errors.name}
                        />
                        <S.Selects>
                            <Select
                                label='Hit Die'
                                value={inputs.hp}
                                options={['6','8','10','12']}
                                onChange={e => handleInput(e, 'hp', inputs, setInputs)}
                                errors={errors.hp}
                            />
                            <Select
                                label='Spellcasting'
                                value={inputs.spellcasting}
                                options={Object.values(Spellcasting)}
                                onChange={e => handleInput(e, 'spellcasting', inputs, setInputs)}
                                errors={errors.spellcasting}
                            />
                        </S.Selects>
                        <S.BigField
                            label='Description'
                            value={inputs.description}
                            onChange={e => handleInput(e, 'description', inputs, setInputs)}
                            type='textarea'
                            errors={errors.description}
                        />
                        {fields}
                        <S.BigField
                            label='Equipment'
                            value={inputs.equipment}
                            onChange={e => handleInput(e, 'equipment', inputs, setInputs)}
                            type='textarea'
                            errors={errors.equipment}
                        />
                    </S.Grid>
                </div>
                    <S.Right>
                        <S.TableInputs>
                            <ClassFormAddColumn
                                handleAddColumn={handleAddCol}
                            />
                            <div>
                                <EntityAutocomplete
                                    label='Add Feature'
                                    entityType={Entity.features}
                                    handleSelect={handleAddFeature}
                                />
                            </div>
                        </S.TableInputs>
                        <ClassFormTable 
                            dndClass={inputs}
                            handleColInput={handleColInput}
                            handleMoveColLeft={handleMoveCol(-1)}
                            handleMoveColRight={handleMoveCol(1)}
                            handleRemoveCol={handleRemoveCol}
                            handleRemoveFeature={handleRemoveFeature}
                            handleRenameCol={handleRenameCol}
                        />
                    </S.Right>
            </S.Between>
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