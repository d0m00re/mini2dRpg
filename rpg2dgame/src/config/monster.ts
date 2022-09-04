/*
** manage mob spawning
** maintain his own list of mob inside a specific interval
** better possible optimization because we don t want to check each monster and pop it after all
*/
// bad : image canvas init
import * as imgMob from './../core/texture/mobTexture'

export interface IMobDefinition {
    name : string;
    dmg : number;
    mooveSpeed : number;
    minLife : number;
    maxLife : number;
    xp : number;
    mooveIa : () => void;
    dropTable : {};
    imgMob : HTMLImageElement;
}

export type TMob = 'trash' | "esgargouille" | "mob1" | "mob2";

type TMobCollection = Record<TMob, IMobDefinition>;

const MobDefinitionList : TMobCollection = {
    trash : {
        name : "trash",
        dmg : 0.5,
        mooveSpeed : 1,
        minLife : 5,
        maxLife : 5,
        xp : 1,
        mooveIa : () => {},
        dropTable : {},
        imgMob : imgMob.trash
    },
    esgargouille : {
        name : "esgargouille",
        dmg : 2,
        mooveSpeed : 1,
        minLife : 10,
        maxLife : 10,
        xp : 2,
        mooveIa : () => {},
        dropTable : {},
        imgMob : imgMob.esgargouille
    },
    mob1 : {
        name : "mob1",
        dmg : 5,
        mooveSpeed : 1,
        minLife : 50,
        maxLife : 50,
        xp : 10,
        mooveIa : () => {},
        dropTable : {},
        imgMob : imgMob.mob1
    },
    mob2 : {
        name : "mob2",
        dmg : 50,
        mooveSpeed : 10,
        minLife : 1000,
        maxLife : 1000,
        xp : 50,
        mooveIa : () => {},
        dropTable : {},
        imgMob : imgMob.mob2
    }};

const getOneMonsterWithName = (mobKey : TMob) => {
    return (MobDefinitionList[mobKey]);
}

export default getOneMonsterWithName;