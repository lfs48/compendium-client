import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Feat, Feature, RootState } from '@/types';
import * as S from './styled';
import { handleInput } from '@/utils/component.utils';
import Select from '@molecules/select';
import { openPanel } from '@/reducers/UI/panels.reducer';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatchFeatureMutation, usePostFeatureMutation } from '@/api/features.api';
import { usePatchFeatMutation, usePostFeatMutation } from '@/api/feats.api';
import EntityAutocomplete from '../../entities/entity-autocomplete';
import { merge } from 'lodash';
import { EntitySelect } from '../../entities/entity-select';

const initialInputs = {
    id: '',
    name: '',
    description: '',
    dnd_class_id: ''
}

const initialErrors = {
    name: [] as string[],
    description: [] as string[],
    dnd_class_id: [] as string[]
}

interface FeatureFormProps {
    editing?: boolean;
    [prop: string]: any;
}

export default function FeatForm({
    editing=false,
    ...props
}: FeatureFormProps) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const feats = useSelector( (state:RootState) => state.entities.feats)

    const [triggerPost, postQuery] = usePostFeatMutation();
    const [triggerPatch, patchQuery] = usePatchFeatMutation();

    const trigger = editing ? triggerPatch : triggerPost;
    const query = editing ? patchQuery : postQuery;

    const [inputs, setInputs] = useState<Feat>(initialInputs);
    const [errors, setErrors] = useState(initialErrors);
    const [triggerOpenPanel, setTriggerOpenPanel] = useState({
        id: '',
        success: false
    });

    useEffect( () => {
        if (editing && id && id in feats) {
            const feat = feats[id];
            setInputs(feat);
        } else if (editing && id && !(id in feats) ) {
            navigate('/feats/new');
        }
        else {
            setInputs(initialInputs);
        }
    }, [id])

    const handleSave = () => {;
        trigger({
            feat: inputs
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
                    panelType: 'feats'
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
                    placeholder='New Feat'
                    onChange={e => handleInput(e, 'name', inputs, setInputs)}
                    errors={errors.name}
                />
                <S.Selects>
                    <EntitySelect
                        label='Class'
                        entityType={'dndClasses'}
                        onChange={e => handleInput(e, 'dnd_class_id', inputs, setInputs)}
                        errors={errors.dnd_class_id}
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