import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import Loading from '@/components/atoms/loading';
import SidebarLineItem from '@/components/atoms/sidebar-line-item';
import SidebarTabSelect from '@/components/molecules/sidebar-tab-select';
import { RootState, Tab } from '@/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as S from './styled';

export default function Sidebar() {

    const classesQuery = useGetAllClassesQuery();

    const queries = {
        dndclasses: classesQuery
    };

    const [selectedTab, setSelectedTab] = useState<Tab>('dndclasses')

    const entities = useSelector( (state:RootState) => ({
        dndclasses: state.entities.dndClasses
    }))

    const tabSelectors = Object.keys(entities).map( (key) => {
        const tab = key as Tab;

        return(
            <SidebarTabSelect 
                tab={tab}
                selected={selectedTab === tab}
                handleSelect={() => setSelectedTab(tab)}
            />
        )
    })

    const tabContent = Object.values(entities[selectedTab]).map( (entity) => {
        return(
            <SidebarLineItem 
                content={entity}
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