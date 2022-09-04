import Player from './../../core/entities/Player';
import Enemy from './../../core/entities/Enemy';
import GameScreen from './../../core/entities/GameScreen'
import MapManagement from './../../core/entities/MapManagement';
import C_CONFIG from './../../config/baseconfig';
import * as baseTypes from './../types/base';
import MobSpawner from './../entities/MobSpawner';
import MobSpawnerList from './../entities/MobSpawnerList';
import * as texture from '../texture/mapTexture';

type TTextureMapper = {
  [x: number]: texture.ILayerWallFloorTexture;
}
const textureMapper : TTextureMapper = {
  [texture.FirstFloor.id] : texture.FirstFloor,
  [texture.FirstWall.id] : texture.FirstWall,
  [texture.SecondFloor.id] : texture.SecondFloor,
  [texture.SecondWall.id] : texture.SecondWall
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
    private _textureMapper : TTextureMapper;
    //private _textureMapper : [x: number]: texture.ILayerWallFloorTexture

    constructor () {
        this._player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);
        this._enemyList = [];
        this._map2d = new MapManagement({x : 10, y : 10});
        this._mobSpawnerList = new MobSpawnerList();
        this._textureMapper = textureMapper;
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

    get textureMapper() : TTextureMapper { return this._textureMapper}
    set textureMapper(textureMapper : TTextureMapper) {this._textureMapper = textureMapper;}

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
        while (!this.engine_check_empty_pos(posMob)) {
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

  // check empty game loop
  // todo : add mob and player

    engine_check_empty_pos = (targetPos : baseTypes.IVec2d) => {
      //first target pos
      if (targetPos.y < 0 || targetPos.x < 0)
      {
        console.log(targetPos)
        return false;
      }
      
      // pos player
      if (this._player.pos.x === targetPos.x && this._player.pos.y === targetPos.y)
      {
       // console.log("trigger pos player find")
        return false;
      }
      // map wap wall
      if ( this.textureMapper[this._map2d.map2d[targetPos.y][targetPos.x]].solid) {
     //   console.log("trigger tetxure mapper find")
        return false;
      }
      // pos mob
      if (this._mobSpawnerList.checkPosEmpty(targetPos))
      {
     //   console.log("trigger check post empty")
        return false;
      }
      return true;


    }
    // game loop
    gameLoop() {
        this._mobSpawnerList.gameLoop();
    }
}

export default GlobalGameObject;