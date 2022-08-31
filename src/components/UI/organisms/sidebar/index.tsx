import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import Loading from '@atoms/loading';
import NoResults from '@atoms/no-results';
import SidebarLineItem from '@atoms/sidebar-line-item';
import SidebarHeader from '@molecules/sidebar-header';
import SidebarTabSelect from '@molecules/sidebar-tab-select';
import { RootState, GameEntity } from '@/types';
import { isInFavorites } from '@/utils/favorites.utils';
import { useSelector } from 'react-redux';
import * as S from './styled';
import { useGetAllRacesQuery } from '@/api/races.api';
import { useGetAllFeatsQuery } from '@/api/feats.api';
import { useRecoilState } from 'recoil';
import { sidebarAtom } from '@/recoil';
import { filterEntities, sortEntities } from '@/utils/entities.utils';

export default function Sidebar() {

    const [sidebarState, setSidebarState] = useRecoilState(sidebarAtom);
    const {selectedTab, searchInputs} = sidebarState;

    const queries = {
        dndClasses: useGetAllClassesQuery(),
        features: useGetAllFeaturesQuery(),
        races: useGetAllRacesQuery(),
        feats: useGetAllFeatsQuery()
    };

    const entities = useSelector( (state:RootState) => ({
        dndClasses: state.entities.dndClasses,
        features: state.entities.features,
        races: state.entities.races,
        feats: state.entities.feats
    }))

    const tabSelectors = Object.keys(entities).map( (key) => {
        const tab = key as GameEntity;
        return(
            <SidebarTabSelect 
                key={tab}
                tab={tab}
            />
        )
    });

    let tabContent = Object.values(entities[selectedTab]);
    tabContent = filterEntities(tabContent, searchInputs[selectedTab].name);
    tabContent = sortEntities(tabContent)
    .map( (entity:any) => {
        return(
            <SidebarLineItem 
                key={entity.id}
                content={entity}
                contentType={selectedTab}
            />
        )
    });

    return(
        <S.Root>
            <S.Selectors>
                {tabSelectors}
            </S.Selectors>
            <S.Body>
                <SidebarHeader />
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