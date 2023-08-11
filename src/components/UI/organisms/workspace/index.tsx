import CharacterSheet from '@/components/concerns/characters/character-sheet';
import BoonRoutes from '@/components/routes/boons.routes';
import ClassRoutes from '@/components/routes/classes.routes';
import FeatRoutes from '@/components/routes/feats.routes';
import FeatureRoutes from '@/components/routes/features.routes';
import RaceRoutes from '@/components/routes/races.routes';
import SpellRoutes from '@/components/routes/spells.routes';
import * as S from './styled';
import { useGetAllClassesQuery } from '@/api/dndclasses.api';
import { useGetAllBoonsQuery } from '@/api/boons.api';
import { useGetAllFeatsQuery } from '@/api/feats.api';
import { useGetAllFeaturesQuery } from '@/api/features.api';
import { useGetAllRacesQuery } from '@/api/races.api';
import { useGetAllSpellsQuery } from '@/api/spells.api';

export default function Workspace() {

    const him = {
        owner: 'db96e4fc-4614-4992-a5c2-7498a0107dca',
        name: 'Himmothy Smalls',
        race: '6974e5ca-725f-418a-8ef2-c8d6dc9fd30e',
        dnd_class: 'eb53ae83-4702-4028-b93b-fd1dd4348c6a',
        level: 1,
        prof: 2,
        AC: 14,
        scores: {
            str: 15,
            dex: 10,
            con: 14,
            int: 8,
            awa: 13,
            cha: 12
        },
        hp: {
            current: 24,
            max: 24,
            temp: 0,
            mod: 0
        },
        hitdice: {
            current: 2,
            max: 3
        },
        saves: {
            fortitude: true,
            reflex: true,
            willpower: false
        },
        skills: {
            arcana: false,
            acrobatics: false,
            animal_handling: true,
            athletics: true,
            endearment: false,
            inspection: false,
            intimidation: false,
            lookout: false,
            medicine: false,
            navigation: false,
            nature: true,
            persuasion: false,
            society: false,
            subtelty: false,
            weightwork: true
        },
        resistances: {
            necrotic: true,
            radiant: true,
            sonic: true,
            freezing: true

        },
        immunities: {
            burning: true
        },
        training: {
            weapons: 'All weapons',
            armor: 'Light armor, Medium armor'
        },
        inventory: [
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Battleaxe',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            },
            {
                label: 'Hide Armor',
                quantity: 1,
                bulk: 1
            }
        ],
        currency: 12,
        spell_ids: ["0f12bf3f-b9e8-4968-be6c-ed4d11648afb", "4174c47a-efe1-433b-9690-14a873729be9", "e90f028e-13ba-43c0-a8ab-e23e6679df75"],
        feature_ids: ["0e2481fd-a53d-4d15-aa6a-a760f8c47bd8", "48c9039f-7746-43c0-b8ed-dd6c5ddb0162", "fd6f28a7-9aae-4714-8a09-b20c5d8bc03a"]
    }

    const queries = {
        dndClasses: useGetAllClassesQuery(),
        features: useGetAllFeaturesQuery(),
        races: useGetAllRacesQuery(),
        feats: useGetAllFeatsQuery(),
        boons: useGetAllBoonsQuery(),
        spells: useGetAllSpellsQuery()
    };

    return(
        <S.Root>
            <BoonRoutes />
            <ClassRoutes />
            <FeatRoutes />
            <FeatureRoutes />
            <RaceRoutes />
            <SpellRoutes />
            {queries.dndClasses.isSuccess &&
            queries.features.isSuccess &&
            queries.races.isSuccess &&
            queries.feats.isSuccess &&
            queries.boons.isSuccess &&
            queries.spells.isSuccess &&
                <CharacterSheet character={him}/>
            }
        </S.Root>
    )
}