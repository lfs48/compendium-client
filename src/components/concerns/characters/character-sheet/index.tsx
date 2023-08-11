import { Character, RootState } from '@/types';
import { calcSavingThrow, calcSkillModifier } from '@/utils/character.utils';
import { useSelector } from 'react-redux';
import * as S from './styled';
import { capitalize } from 'lodash';
import AbilityScore from './AbilityScore';
import Proficiency from './Proficiency';
import SavingThrow from './SavingThrow';
import ArmorClass from './ArmorClass';
import Skill from './Skill';
import HitPoints from './HitPoints';
import HitDice from './HitDice';
import Vitality from './Vitality';
import TabBox from './TabBox';
import Defenses from './Defenses';
import Training from './Training';

interface CharacterSheetProps {
    character: Character;
    [prop: string]: any;
}

export default function CharacterSheet({
    character,
    ...props
}: CharacterSheetProps) {

    const {dndclass, race} = useSelector( (state:RootState) => ({
        dndclass: state.entities.dndClasses[character.dnd_class],
        race: state.entities.races[character.race]
    }))

    const scores = Object.entries(character.scores).map( ([key, val]) => 
        <AbilityScore
            key={key}
            ability={key}
            score={val}
        />
    );

    const saves = Object.entries(character.saves).map( ([key, val]) =>
        <SavingThrow
            key={key}
            save={key}
            mod={calcSavingThrow(character, key)}
            prof={!!character.saves[key]}
        />
    );

    const skills = Object.entries(character.skills).map( ([key, val]) =>
        <Skill 
            key={key}
            skill={key}
            prof={!!character.skills[key]}
            mod={calcSkillModifier(character, key)}
        />
    )

    const resistances = Object.keys(character.resistances)
    .map( (key) => capitalize(key) )
    .join(', ');

    const immunities = Object.keys(character.immunities)
    .map( (key) => capitalize(key) )
    .join(', ');

    return(
        <S.Root {...props}>
            <S.Header>
                <S.Title>
                    <span>{character.name}</span>
                    <span>Level {character.level} {race.name} {dndclass.name}</span>
                </S.Title>
                <S.Tabs>
                    <S.Tab>Core</S.Tab>
                    <S.Tab>Bio</S.Tab>
                    <S.Tab>Spells</S.Tab>
                </S.Tabs>
            </S.Header>
            <S.Body>
                <S.ScoresCol>
                    <Proficiency prof={character.prof} />
                    {scores}
                </S.ScoresCol>
                <S.Col>
                    <S.Saves>
                        <ArmorClass ac={character.AC}/>
                        {saves}
                    </S.Saves>
                    <S.Bubble>
                        <S.Skills>
                            {skills}
                        </S.Skills>
                    </S.Bubble>
                </S.Col>
                <S.HPCol>
                        <HitPoints hp={character.hp} />
                        <S.MultiBubleRow>
                            <HitDice
                                current={character.hitdice.current}
                                max={character.hitdice.max}
                                size={dndclass.hitdie}
                            />
                            <Vitality failed={1}/>
                        </S.MultiBubleRow>
                        <Defenses
                            resistances={resistances}
                            immunities={immunities}
                        />
                        <Training 
                            armor={character.training.armor}
                            weapons={character.training.weapons}
                        />
                </S.HPCol>
                <S.TabsCol>
                    <TabBox character={character}/>
                </S.TabsCol>
            </S.Body>
        </S.Root>
    )
}