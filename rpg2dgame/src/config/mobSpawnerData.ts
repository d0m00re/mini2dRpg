import {TMob} from './../config/monster';
import {IInterval} from './../core/entities/MobSpawner';


interface ISpawnerData {
    monsterName: TMob;
    interval : IInterval;
    nbEnemies : number;
}

const spawnerDataList : ISpawnerData[]  = [{
        monsterName :  'esgargouille',
        nbEnemies : 10,
        interval : {start : { x: 5, y: 5 }, end: { x: 10, y: 10 }}
    }, {
        monsterName :  'trash',
        nbEnemies : 10,
        interval : { start: { x: 5, y: 11 }, end: { x: 10, y: 20 }}
    },
    {
        monsterName :  'mob1',
        nbEnemies : 10,
        interval : { start: { x: 11, y: 5 }, end: { x: 20, y: 10 }}
    },
    {
        monsterName :  'mob2',
        nbEnemies : 10,
        interval : { start: { x: 11, y: 11 }, end: { x: 20, y: 20 }}
    }
];

const getSpawnerDataList = (mapId : string) => {
    return spawnerDataList;
}

export default getSpawnerDataList;