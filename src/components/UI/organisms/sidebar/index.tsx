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

    const tabContent = Object.values(entities[selectedTab])
    .filter( (entity:any) => entity.name.toLowerCase().startsWith( searchInputs[selectedTab].name.toLowerCase() ))
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