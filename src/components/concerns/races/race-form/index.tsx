import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feature, Race, RootState } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchRaceMutation, usePostRaceMutation } from '@/api/races.api';
import EntityAutocomplete from '../../entities/entity-autocomplete';
import FeaturesList from '../../features/features-list';
import FormFeatureList from '../../features/form-features-list';
import { merge } from 'lodash';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    features: []
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    features: [] as string[]
}

interface RaceFormProps {
    editing?: boolean;
    [prop: string]: any;
}

export default function RaceForm({
    editing=false,
    ...props
}: RaceFormProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const races = useSelector( (state:RootState) => state.entities.races)

    const [triggerPost, postQuery] = usePostRaceMutation();
    const [triggerPatch, patchQuery] = usePatchRaceMutation();

    const trigger = editing ? triggerPatch : triggerPost;
    const query = editing ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<Race>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });

    useEffect( () => {
        if (editing && id && id in races) {
            const race = races[id];
            setInputs(race);
        } else if (editing && id && !(id in races) ) {
            navigate('/races/new');
        }
        else {
            setInputs(initialInputs);
        }
    }, [id])

    const handleSave = () => {;
        trigger({
            race: inputs
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
                    panelType: 'races'
                }
            })
            setTriggerOpenPanel({
                id: '',
                success: false
            });
        }
    }, [triggerOpenPanel])

    const handleAddFeature = (id) => {
        const newState = merge({}, inputs);
        if (!newState.features.includes(id)) {
            newState.features.push(id);
            setInputs(newState);
        }
    }

    const handleRemoveFeature = (id) => {
        const newState = merge({}, inputs);
        newState.features = newState.features.filter( (_id) => _id != id)
        setInputs(newState);
    }

    return(
        <S.Root {...props}>
            <S.Body>
                <S.Top>
                    <S.Name
                        value={inputs.name}
                        placeholder='New Race'
                        onChange={e => handleInput(e, 'name', inputs, setInputs)}
                        errors={errors.name}
                    />
                </S.Top>
                <S.LeftRight>
                    <S.Left>
                        <S.Description
                            label='Description'
                            value={inputs.description}
                            onChange={e => handleInput(e, 'description', inputs, setInputs)}
                            type='textarea'
                            errors={errors.description}
                        />
                    </S.Left>
                    <S.Right>
                        <EntityAutocomplete 
                            entityType='features' 
                            handleSelect={handleAddFeature}
                        />
                        <FormFeatureList 
                            featureIds={inputs.features}
                            handleRemove={handleRemoveFeature}
                        />
                    </S.Right>
                </S.LeftRight>
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