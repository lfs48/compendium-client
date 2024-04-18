import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Feature } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Select from '@/components/common/select';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchFeatureMutation, usePostFeatureMutation } from '@/api/features.api';
import { LEVEL_ARRAY } from '@/utils/constants.utils';
import EntityAutocomplete from '../../entities/entity-autocomplete';
import { merge } from 'lodash';
import { Entity, FeatureKind } from '@/enums';
import { apiEntityToClientEntity, clientEntityToAPIEntity } from '@/utils/entities.utils';
import { useAppSelector } from '@/hooks/useAppSelector.hook';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    level: undefined,
    kind: FeatureKind.Core,
    prereq: '',
    sources: []
}

const initialSourceInputs = {
    sourceType: Entity.dndClasses,
    id: ''
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    level: [] as string[]
}

interface FeatureFormProps {
    editing?: boolean;
    [prop: string]: any;
}

export default function FeatureForm({
    editing=false,
    ...props
}: FeatureFormProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const entities = useAppSelector( (state) => state.entities )
    const {features} = entities;

    const [triggerPost, postQuery] = usePostFeatureMutation();
    const [triggerPatch, patchQuery] = usePatchFeatureMutation();

    const trigger = editing ? triggerPatch : triggerPost;
    const query = editing ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<Feature>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });
    const [sourceInputs, setSourceInputs] = useState(initialSourceInputs);

    useEffect( () => {
        if (editing && id && id in features) {
            const feature = features[id];
            setInputs(feature);
        } else if (editing && id && !(id in features) ) {
            navigate('/features/new');
        }
        else {
            setInputs(initialInputs);
        }
    }, [id])

    const handleSave = () => {;
        trigger({
            feature: inputs
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
                    panelType: 'features'
                }
            })
            setTriggerOpenPanel({
                id: '',
                success: false
            });
        }
    }, [triggerOpenPanel])

    const addSource = (id:string) => {
        const newState = merge({},inputs);
        newState.sources.push({
            source_type: clientEntityToAPIEntity(sourceInputs.sourceType),
            id: id
        });
        setInputs(newState);
        setSourceInputs(initialSourceInputs);
        console.log(newState);
    }

    const removeSource = (id:string) => {
        const newState = merge({},inputs);
        newState.sources = inputs.sources.filter( (source) => source.id !== id);
        setInputs(newState);   
    }

    const sources = inputs.sources.map( (source) => {
        const sourceType = apiEntityToClientEntity(source.source_type);
        if (!!sourceType && sourceType in entities) {
            const entity = entities[sourceType][source.id];
            return(
                <S.Source 
                    key={source.id} 
                    onClick={()=>removeSource(source.id)}
                >
                    {entity.name}
                </S.Source>
            )
        } else {
            return <></>
        }
    })

    return(
        <S.Root {...props}>
            <S.Body>
                <S.Top>
                <S.Name
                    value={inputs.name}
                    placeholder='New Feature'
                    onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    errors={errors.name}
                />
                <S.Selects>
                    <Select
                        label='Kind'
                        value={inputs.kind}
                        options={Object.values(FeatureKind)}
                        onChange={e => handleInput(e, 'kind', inputs, setInputs, e.target.value || undefined)}
                    />
                    <Select
                        label='Level'
                        value={inputs.level}
                        options={LEVEL_ARRAY}
                        onChange={e => handleInput(e, 'level', inputs, setInputs, e.target.value || undefined)}
                        allowNoneSelection
                        errors={errors.level}
                    />
                </S.Selects>
                </S.Top>
                <S.Description
                    label='Description'
                    value={inputs.description}
                    onChange={e => handleInput(e, 'description', inputs, setInputs)}
                    type='textarea'
                    errors={errors.description}
                />
                <div>
                    <div>Sources</div>
                    <S.SourceInputs>
                        <Select
                            label='Type'
                            value={sourceInputs.sourceType}
                            options={['dndClasses', 'races']}
                            onChange={e => handleInput(e, 'sourceType', sourceInputs, setSourceInputs, e.target.value || undefined)}
                        />
                        <EntityAutocomplete
                            label='Name'
                            entityType={sourceInputs.sourceType}
                            handleSelect={addSource}
                        />
                    </S.SourceInputs>
                    <S.SourceList>
                        {sources}
                    </S.SourceList>
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