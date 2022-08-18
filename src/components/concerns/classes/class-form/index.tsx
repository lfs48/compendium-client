import React, { SyntheticEvent, useEffect, useState } from 'react';
import { merge } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Field from '@molecules/field';
import { DndClass, RootState, Spellcasting } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Input from '@atoms/input';
import Select from '@molecules/select';
import Button from '@atoms/button';
import { useGetAllClassesQuery, usePatchClassMutation, usePostClassMutation } from '@/api/dndclasses.api';
import ClassFormEquipment from '@/components/concerns/classes/class-form-equipment';
import ClassFormTable from '@/components/concerns/classes/class-form-table';
import ClassFormAddFeature from '@/components/concerns/classes/class-form-add-feature';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { moveObjKey, renameObjKey, snakeCaseToWords } from '@/utils/functions.utils';
import ClassFormAddColumn from '@/components/concerns/classes/class-form-add-column';
import { hasFeatureAtLevel } from '@/utils/dndClass.utils';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '@atoms/loading';
import { MAX_LEVEL } from '@/utils/constants.utils';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    hitdie: '1d8',
    saves: '',
    weapons: '',
    armor: '',
    skills: '',
    tools: '',
    spellcasting: 'none' as Spellcasting,
    equipment: [] as string[],
    table_cols: {},
    features: []
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    hitdie: [] as string[],
    saves: [] as string[],
    weapons: [] as string[],
    armor: [] as string[],
    skills: [] as string[],
    tools: [] as string[],
    spellcasting: [] as string[],
    equipment: [] as string[],
    table_cols: [] as string[],
    features: [] as string[]
}

const dieOptions = ['d6', 'd8', 'd10', 'd12'];
const spellcastingOptions = ['none', 'full', 'half', 'half+', 'third'];

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

    const dndClasses = useSelector( (state:RootState) => state.entities.dndClasses)

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
            newCols[name] = [...Array(MAX_LEVEL)].map( _ => '');
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

    const addEquipmentLine = (line:string) => {
        const newState = merge({}, inputs);
        newState.equipment.push(line);
        setInputs(newState);
    }

    const removeEquipmentLine = (index:number) => {
        const newState = merge({}, inputs);
        newState.equipment = newState.equipment.filter( (_, i) => i !== index);
        setInputs(newState);
    }

    const handleAddFeature = (id, level) => {
        const newState = merge( {}, inputs);
        if ( !hasFeatureAtLevel(inputs, id, level)  ) {
            newState.features.push({
                id: id,
                level: level
            });
        }
        setInputs(newState);
    }

    const handleRemoveFeature = (_id, _level) => {
        const newState = merge( {}, inputs);
        newState.features = newState.features
        .filter( ({id, level}) => id !== _id || level !== _level)
        setInputs(newState);
    }

    const fields = ['armor', 'weapons', 'tools', 'saves', 'skills']
    .map( (field) => {
        return(
            <Field
                key={field}
                label={snakeCaseToWords(field)}
                value={inputs[field]}
                errors={errors[field]}
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
                                value={inputs.hitdie}
                                options={dieOptions}
                                onChange={e => handleInput(e, 'hitdie', inputs, setInputs)}
                                errors={errors.hitdie}
                            />
                            <Select
                                label='Spellcasting'
                                value={inputs.spellcasting}
                                options={spellcastingOptions}
                                onChange={e => handleInput(e, 'spellcasting', inputs, setInputs)}
                                errors={errors.spellcasting}
                            />
                        </S.Selects>
                        <S.Description
                            label='Description'
                            value={inputs.description}
                            onChange={e => handleInput(e, 'description', inputs, setInputs)}
                            type='textarea'
                            errors={errors.description}
                        />
                        {fields}
                    </S.Grid>
                    <ClassFormEquipment
                            equipment={inputs.equipment}
                            handleAddLine={addEquipmentLine}
                            handleRemoveLine={removeEquipmentLine}
                            errors={errors.equipment}
                    />
                </div>
                    <S.Right>
                        <S.TableInputs>
                            <ClassFormAddColumn
                                handleAddColumn={handleAddCol}
                            />
                            <ClassFormAddFeature
                                handleAddFeature={handleAddFeature}
                            />
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