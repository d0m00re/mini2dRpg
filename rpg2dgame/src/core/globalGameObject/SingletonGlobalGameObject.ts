import _GlobalGameObject from "./GlobalGameObject";
import Player from './../../core/entities/Player';
import MobSpawner, {IInterval} from './../../core/entities/MobSpawner';
import { textureMapper, firstMap } from './../../core/MapSystem/layerFloorWall';
import C_CONFIG from './../../config/baseconfig';
import KeyboardEventHandler from './../../services/eventHandler/KeyboardEventHandler';
import getOneMonsterWithName from './../../config/monster';
import {TMob} from './../../config/monster';
import getSpawnerDataList from './../../config/mobSpawnerData';

import dropTable from "../../config/dropTable";
import items from "../../config/items";

const spawnerDataList = getSpawnerDataList("futur update");

const initGlobalGameObject = ( GlobalGameObject: _GlobalGameObject) => {
    GlobalGameObject.player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);
  
    GlobalGameObject.map2d = firstMap.map2d;
    // describe fov of map
    GlobalGameObject._map2d.fieldOfView = C_CONFIG.GAME_CONFIG.FOV;
  
    spawnerDataList.map((dataSpawner) => GlobalGameObject.addMobSpawner(
        new MobSpawner(dataSpawner.nbEnemies, dataSpawner.interval, getOneMonsterWithName(dataSpawner.monsterName))
    ))

    GlobalGameObject.keyboardEventHandler = new KeyboardEventHandler();
    GlobalGameObject.keyboardEventHandler.init();

    // load items
    // items collections
    GlobalGameObject.itemsCollection.push(items); 
    GlobalGameObject._dropTable.push(dropTable);

    console.log("Check : ")
    console.log(GlobalGameObject.itemsCollection);
    console.log(GlobalGameObject._dropTable)


    return GlobalGameObject;
}

let GlobalGameObject = new _GlobalGameObject();
initGlobalGameObject(GlobalGameObject);

export default GlobalGameObject;