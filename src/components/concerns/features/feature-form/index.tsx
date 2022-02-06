import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Field from '@molecules/field';
import { Feature, RootState } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Input from '@atoms/input';
import Select from '@molecules/select';
import Button from '@atoms/button';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchFeatureMutation, usePostFeatureMutation } from '@/api/features.api';

const kindOptions =
[
    "core",
    "major",
    "minor",
    "ribbon"
];

const categoryOptions = [
    "action", 
    "quick action", 
    "reaction",
    "passive",
    "triggered",
    "misc"
];

const initialInputs = {
    id: '',
    name: '',
    description: '',
    kind: 'core',
    category: 'action',
    sources: []
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    kind: [] as string[],
    category: [] as string[]
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

    const features = useSelector( (state:RootState) => state.entities.features)

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

    const handleSave = () => {
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
                    panelType: 'features'
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
                    placeholder='New Feature'
                    onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    errors={errors.name}
                />
                <S.Selects>
                    <Select
                        label='Type'
                        value={inputs.kind}
                        options={kindOptions}
                        onChange={e => handleInput(e, 'kind', inputs, setInputs)}
                        errors={errors.kind}
                    />
                    <Select
                        label='Category'
                        value={inputs.category}
                        options={categoryOptions}
                        onChange={e => handleInput(e, 'category', inputs, setInputs)}
                        errors={errors.category}
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