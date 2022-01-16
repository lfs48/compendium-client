import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import Loading from '@/components/atoms/loading';
import SidebarLineItem from '@/components/atoms/sidebar-line-item';
import SidebarTabSelect from '@/components/molecules/sidebar-tab-select';
import { RootState, GameEntity } from '@/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as S from './styled';

export default function Sidebar() {

    const [selectedTab, setSelectedTab] = useState<GameEntity>('dndClasses');

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
    })

    const tabContent = Object.values(entities[selectedTab]).map( (entity:any) => {
        return(
            <SidebarLineItem 
                key={entity.id}
                content={entity}
                contentType={selectedTab}
            />
        )
    })

    return(
        <S.Root>
            <S.Selectors>
                {tabSelectors}
            </S.Selectors>
            <S.Content>
                {queries[selectedTab].isSuccess ?
                    tabContent
                :
                    <Loading />
                }
            </S.Content>
        </S.Root>
    )
}