import React, { SyntheticEvent, useEffect, useState } from 'react';
import { merge } from 'lodash';
import { useDispatch } from 'react-redux';
import Field from '@molecules/field';
import { DndClass, Spellcasting } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Input from '@/components/atoms/input';
import Select from '@/components/molecules/select';
import Button from '@/components/atoms/button';
import { usePatchClassMutation, usePostClassMutation } from '@/api/dndclasses.api';
import ClassFormEquipment from '@/components/molecules/class-form-equipment';
import ClassFormTable from '@/components/molecules/class-form-table';
import ClassFormAddFeature from '@/components/molecules/class-form-add-feature';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { moveObjKey, renameObjKey, snakeCaseToWords } from '@/utils/functions.utils';
import ClassFormAddColumn from '@/components/molecules/class-form-add-column';
import { hasFeatureAtLevel } from '@/utils/dndClass.utils';
import { closeWorkspace } from '@/reducers/UI/workspace.reducer';

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
    subclass_title: '',
    subclass_feature_levels: [] as number[],
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
    subclass_title: [] as string[],
    subclass_feature_levels: [] as string[],
    features: [] as string[]
}

const dieOptions = ['1d6', '1d8', '1d10', '1d12'];
const spellcastingOptions = ['none', 'full', 'half', 'half+', 'third'];

interface ClassFormProps {
    dndClass?: DndClass;
    editing?: boolean;
    [prop: string]: any;
}

export default function ClassForm({
    dndClass=initialInputs, 
    editing=false,
    ...props
}: ClassFormProps) {

    const dispatch = useDispatch();

    const [triggerPost, postQuery] = usePostClassMutation();
    const [triggerPatch, patchQuery] = usePatchClassMutation();

    const trigger = dndClass !==  null ? triggerPatch : triggerPost;
    const query = dndClass !==  null ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<DndClass>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });

    useEffect( () => {
        if (dndClass !== null) {
            setInputs(dndClass);
        } else {
            setInputs(initialInputs);
        }
    }, [dndClass])

    const handleSave = () => {
        const payload = dndClass !==  null ? 
                ({
                    id: dndClass.id,
                    dndclass: inputs
                })
            :
                ({
                    dndclass: inputs
                });
        //@ts-ignore
        trigger(payload)
        .unwrap()
        .then( res => {
            const {id} = res;
            setErrors(initialErrors);
            setInputs(initialInputs);
            setTriggerOpenPanel({
                id: id || '',
                success: true
            });
            dispatch({
                type: closeWorkspace.type
            })
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
            newCols[name] = [...Array(20)].map( _ => '');
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

    const handleAddSubclassFeatureLevel = (level) => {
        const newState = merge( {}, inputs);
        newState.subclass_feature_levels.push(level);
        setInputs(newState);
    }

    const handleRemoveSubclassFeatureLevel = (_level) => {
        const newState = merge( {}, inputs);
        newState.subclass_feature_levels = newState.subclass_feature_levels
        .filter( (level) => level !== _level)
        setInputs(newState);
    }

    const fields = ['armor', 'weapons', 'tools', 'saves', 'skills', 'subclass_title']
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

    const handleClose = () => {
        dispatch({
            type: closeWorkspace.type
        })
    }
    
    return(
        <S.Root {...props}>
            <S.Between>
                <div className='space-y-8'>
                    <S.Grid>
                        <Input
                            value={inputs.name}
                            placeholder='New Class'
                            onChange={e => handleInput(e, 'name', inputs, setInputs)}
                            className={S.Name}
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
                        <Field
                            label='Description'
                            value={inputs.description}
                            onChange={e => handleInput(e, 'description', inputs, setInputs)}
                            className={S.Description}
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
                            handleAddSubclassFeatureLevel={handleAddSubclassFeatureLevel}
                            handleMoveColLeft={handleMoveCol(-1)}
                            handleMoveColRight={handleMoveCol(1)}
                            handleRemoveCol={handleRemoveCol}
                            handleRemoveFeature={handleRemoveFeature}
                            handleRemoveSubclassFeatureLevel={handleRemoveSubclassFeatureLevel}
                            handleRenameCol={handleRenameCol}
                        />
                    </S.Right>
            </S.Between>
            <S.Buttons>
                <Button
                    color='red'
                    onClick={handleClose}
                    className={S.Button}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    loading={query.isLoading}
                    className={S.Button}
                >
                    Save
                </Button>
            </S.Buttons>
        </S.Root>
    )
}