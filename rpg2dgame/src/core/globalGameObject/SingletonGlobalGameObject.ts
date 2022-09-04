import _GlobalGameObject from "./GlobalGameObject";
import Player from './../../core/entities/Player';
import MobSpawner from './../../core/entities/MobSpawner';
import { textureMapper, firstMap } from './../../core/MapSystem/layerFloorWall';
import C_CONFIG from './../../config/baseconfig';
import KeyboardEventHandler from './../../services/eventHandler/KeyboardEventHandler';
import getOneMonsterWithName from './../../config/monster';


const initGlobalGameObject = ( GlobalGameObject: _GlobalGameObject) => {
    GlobalGameObject.player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);
  
    GlobalGameObject.map2d = firstMap.map2d;
    // describe fov of map
    GlobalGameObject._map2d.fieldOfView = C_CONFIG.GAME_CONFIG.FOV;
  
    GlobalGameObject.addMobSpawner(new MobSpawner(2, { start: { x: 5, y: 5 }, end: { x: 10, y: 10 }}, getOneMonsterWithName('esgargouille')));

    GlobalGameObject.addMobSpawner(new MobSpawner(2, { start: { x: 5, y: 11 }, end: { x: 10, y: 20 }}, getOneMonsterWithName('trash')));

    GlobalGameObject.addMobSpawner(new MobSpawner(2, { start: { x: 11, y: 5 }, end: { x: 20, y: 10 }}, getOneMonsterWithName('mob1')));
    GlobalGameObject.addMobSpawner(new MobSpawner(2, { start: { x: 11, y: 11 }, end: { x: 20, y: 20 }}, getOneMonsterWithName('mob2')));



    GlobalGameObject.keyboardEventHandler = new KeyboardEventHandler();
    GlobalGameObject.keyboardEventHandler.init();
    //GlobalGameObject.addMobSpawner(new MobSpawner(10, { start: { x: 10, y: 10 }, end: { x: 20, y: 20 } }));
    //GlobalGameObject.addMobSpawner(new MobSpawner(10, { start: { x: 20, y: 10 }, end: { x: 25, y: 20 } }));  
    return GlobalGameObject;
}

let GlobalGameObject = new _GlobalGameObject();
initGlobalGameObject(GlobalGameObject);

export default GlobalGameObject;