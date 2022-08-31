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
import { filterFeats } from '@/utils/feats.util';

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

    const getTabContent = () => {
        let tabContent = Object.values(entities[selectedTab]);
        switch(selectedTab) {
            case('feats'):
                tabContent = filterFeats(tabContent, searchInputs.feats.name, searchInputs.feats.dndClass);
                break;
            default:
                tabContent = filterEntities(tabContent, searchInputs[selectedTab].name);
                break;
        }
        tabContent = sortEntities(tabContent);
        return tabContent
        .map( (entity:any) => {
            return(
                <SidebarLineItem 
                    key={entity.id}
                    content={entity}
                    contentType={selectedTab}
                />
            )
        });
    }

    const tabContent = getTabContent();

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