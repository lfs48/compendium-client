import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import Loading from '@/components/atoms/loading';
import NoResults from '@/components/atoms/no-results';
import SidebarLineItem from '@/components/atoms/sidebar-line-item';
import SidebarHeader from '@/components/molecules/sidebar-header';
import SidebarTabSelect from '@/components/molecules/sidebar-tab-select';
import { RootState, GameEntity } from '@/types';
import { clearInput, handleInput } from '@/utils/component.utils';
import { isInFavorites } from '@/utils/favorites.utils';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

const initialInputs = {
    dndClasses: '',
    features: ''
};

export default function Sidebar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = useState<GameEntity>('dndClasses');

    const [searchInputs, setSearchInputs] = useState(initialInputs);

    const queries = {
        dndClasses: useGetAllClassesQuery(),
        features: useGetAllFeaturesQuery()
    };

    const entities = useSelector( (state:RootState) => ({
        dndClasses: state.entities.dndClasses,
        features: state.entities.features
    }))

    const tabSelectors = Object.keys(entities).map( (key) => {
        const tab = key as GameEntity;

        return(
            <SidebarTabSelect 
                key={tab}
                tab={tab}
                selected={selectedTab === tab}
                handleSelect={() => setSelectedTab(tab)}
            />
        )
    });

    const tabContent = Object.values(entities[selectedTab])
    .filter( (entity:any) => entity.name.toLowerCase().startsWith( searchInputs[selectedTab].toLowerCase() ))
    .sort( (e1:any, e2:any) => {
            const n1 = e1.name.toLowerCase();
            const n2 = e2.name.toLowerCase();
            const f1 = isInFavorites(e1.id, selectedTab);
            const f2 = isInFavorites(e2.id, selectedTab);
            if( f1 && !f2 ) {
                return -1;
            } else if ( f2 && !f1 ) {
                return 1;
            } else {
                if (n1 > n2) {
                    return 1
                } else if (n2 > n1) {
                    return -1;
                } else {
                    return 0;
                }
            }
    })
    .map( (entity:any) => {
        return(
            <SidebarLineItem 
                key={entity.id}
                content={entity}
                contentType={selectedTab}
            />
        )
    });

    const handleCreate = () => {
        navigate('/classes/new')
    }

    return(
        <S.Root>
            <S.Selectors>
                {tabSelectors}
            </S.Selectors>
            <S.Body>
                <SidebarHeader 
                    searchInput={searchInputs[selectedTab]}
                    handleSearch={(e) => handleInput(e, selectedTab, searchInputs, setSearchInputs)}
                    handleClearSearch={() => clearInput(selectedTab, searchInputs, setSearchInputs)}
                    handleCreate={handleCreate}
                />
                <S.Content>
                {queries[selectedTab].isSuccess ?
                    <>
                    {tabContent.length >= 1 ?
                        tabContent
                    :
                        <NoResults />
                    }
                    </>
                :
                    <Loading />
                }
                </S.Content>
            </S.Body>
        </S.Root>
    )
}