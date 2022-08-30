import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feature, RootState } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Select from '@molecules/select';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchFeatureMutation, usePostFeatureMutation } from '@/api/features.api';
import { LEVEL_ARRAY } from '@/utils/constants.utils';

const levelOptions:any = [{label: '—', value: undefined}, ...LEVEL_ARRAY];

const initialInputs = {
    id: '',
    name: '',
    description: '',
    level: undefined,
    sources: []
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
                        label='Level'
                        value={inputs.level}
                        options={levelOptions}
                        onChange={e => handleInput(e, 'level', inputs, setInputs)}
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