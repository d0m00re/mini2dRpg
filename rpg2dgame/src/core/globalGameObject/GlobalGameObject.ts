import { textureMapper, firstMap, TMap2D, ILayerWallFloorTexture } from './../../core/MapSystem/layerFloorWall';


import Player from './../../core/entities/Player';
import Enemy from './../../core/entities/Enemy';
import GameScreen from './../../core/entities/GameScreen'
import MapManagement from './../../core/entities/MapManagement';
import C_CONFIG from './../../config/baseconfig';
import * as baseTypes from './../types/base';
import MobSpawner from './../entities/MobSpawner';
import MobSpawnerList from './../entities/MobSpawnerList';
import * as imgMob from './../../core/texture/mobTexture'

// todo : add mob and player
const engine_check_is_empty_floor = (pos: baseTypes.IVec2d, mapData: TMap2D, textureMapper: { [x: number]: ILayerWallFloorTexture }) => {
    return (pos.x === -1 && pos.y === -1) || textureMapper[mapData[pos.y][pos.x]].solid
  }
  
  // generate memeber 
  const mobGenerator = (dimMap : baseTypes.IVec2d) => {
    return {
      x: Math.floor(Math.random() * dimMap.x),
      y: Math.floor(Math.random() * dimMap.y)
    }
  }

class GlobalGameObject {
    private _player : Player;
    private _enemyList : Enemy[];
    private _mobSpawnerList : MobSpawnerList;
    public _map2d : MapManagement;
    private _gameScreen : GameScreen;

    constructor (dimMap : baseTypes.IVec2d) {
        this._player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);
        this._enemyList = [];
        this._map2d = new MapManagement({x : 10, y : 10});
        this._gameScreen = new GameScreen(dimMap);
        this._mobSpawnerList = new MobSpawnerList();
    }

    /*
    get () : any { return this._}
    set ( : any) {this._ = }
    */

    get player() : Player { return this._player}
    set player(player : Player) {this._player = player}

    get enemyList() : Enemy[] { return this._enemyList}
    set enemyList(enemyList : Enemy[]) {this._enemyList = enemyList}

    get map2d() : number[][] { return this._map2d.map2d}
    set map2d(map2d : number[][]) {this._map2d.map2d =map2d;}

    get gameScreen() : GameScreen { return this._gameScreen}
    set gameScreen(gameScreen : GameScreen) {this._gameScreen = gameScreen}

    get mobSpawnerList() : MobSpawnerList { return this._mobSpawnerList}
    set mobSpawnerList(mobSpawnerList : MobSpawnerList) {this._mobSpawnerList = mobSpawnerList}

    // create an enemylist class

    // add an anemy
    addEnemy(enemy : Enemy){
        this._enemyList.push(enemy);
    }

    // add mob spawner list
    addMobSpawner(mobSpawner : MobSpawner) {
        this.mobSpawnerList.addOne(mobSpawner);
    }

    // remove an enemy
    removeEnemy(id : number) {
        this._enemyList = this._enemyList.filter((e, i) => i !== id);
    }

   // fight state or not
   runFight (nextPos : baseTypes.IVec2d) {
    // attack management

    const findIndexEnemyAndSpawnerPos = this._mobSpawnerList.findEnemyIndex(nextPos);
    // find index of enemy
    if (findIndexEnemyAndSpawnerPos) {
      // enemy dmg
        let indexEnm = findIndexEnemyAndSpawnerPos.monsterIndex;
        let currentSpawner = this._mobSpawnerList.enemyList[findIndexEnemyAndSpawnerPos.spawnerIndex];
        currentSpawner.enemyList[indexEnm].life -= this.player.dmg;
        this.player.life -= currentSpawner.enemyList[indexEnm].dmg;
      
      // todo : last action - we should add some security for position injection
      
      if (!currentSpawner.enemyList[indexEnm].isAlive) {
        //console.log("mob die : ", findIndexEnemy)

        // find pos where add hour peaple
        let posMob = { x: -1, y: -1 };
        //while ((posMob.x === -1 && posMob.y === -1) || textureMapper[mapData[posMob.y][posMob.x]].solid)
        while (!engine_check_is_empty_floor(posMob, this.map2d, textureMapper)) {
          //posMob = {
          //  x: Math.floor(Math.random() * mapData[0].length),
          //  y: Math.floor(Math.random() * mapData.length)
          //}
          posMob = mobGenerator({x : Math.random() * this.map2d[0].length, y : Math.random() * this.map2d.length});
        //  console.log("Add an enemy : ", posMob)
          //enemyList = enemyList.filter((e, i) => i == findIndexEnemy)

        }
        currentSpawner.deleteWtIndex(indexEnm)
       // console.log("* add new mob : ", GlobalGameObject.enemyList.length)
        // enemyList = enemyList.filter(enemy => enemy.life > 0)
      }
      
    }
  }

    // game loop
    gameLoop() {
        this._mobSpawnerList.gameLoop();
    }
}

export default GlobalGameObject;