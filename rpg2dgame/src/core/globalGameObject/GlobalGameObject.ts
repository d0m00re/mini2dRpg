import Player from './../../core/entities/Player';
import Enemy from './../../core/entities/Enemy';
import GameScreen from './../../core/entities/GameScreen'
import MapManagement from './../../core/entities/MapManagement';
import C_CONFIG from './../../config/baseconfig';
import * as baseTypes from './../types/base';
import MobSpawner from './../entities/MobSpawner';
import MobSpawnerList from './../entities/MobSpawnerList';
import * as texture from '../texture/mapTexture';
import KeyboardEventHandler from '../../services/eventHandler/KeyboardEventHandler';
import renderer from './../../renderer/renderer';

import ItemsCollection from './../entities/ItemsManagement/ItemsCollection';
import DropTable from './../entities/ItemsManagement/Droptable';

import Inventory from './../entities/ItemsManagement/Inventory';

type TTextureMapper = {
  [x: number]: texture.ILayerWallFloorTexture;
}
const textureMapper : TTextureMapper = {
  [texture.FirstFloor.id] : texture.FirstFloor,
  [texture.FirstWall.id] : texture.FirstWall,
  [texture.SecondFloor.id] : texture.SecondFloor,
  [texture.SecondWall.id] : texture.SecondWall
}

class GlobalGameObject {
    private _player : Player;
    private _enemyList : Enemy[];
    private _mobSpawnerList : MobSpawnerList;
    public _map2d : MapManagement;
    private _gameScreen : GameScreen;
    private _textureMapper : TTextureMapper;
    public keyboardEventHandler : KeyboardEventHandler;

    public _itemsCollection : ItemsCollection;
    public _dropTable : DropTable;

    public inventory : Inventory;

    //private _textureMapper : [x: number]: texture.ILayerWallFloorTexture

    constructor () {
        this._player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);
        this._enemyList = [];
        this._map2d = new MapManagement({x : 10, y : 10});
        this._mobSpawnerList = new MobSpawnerList();
        this._textureMapper = textureMapper;
        this._itemsCollection = new ItemsCollection();
        this._dropTable = new DropTable();
        this.inventory = new Inventory();
      }

    /*
    get () : any { return this._}
    set ( : any) {this._ = }
    */

    get itemsCollection() : ItemsCollection { return this._itemsCollection}
    set itemsCollection(itemsCollection : ItemsCollection) {this._itemsCollection = itemsCollection}

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
   runFight () {
    let nextPos = this.player.futurPos(this.keyboardEventHandler.dir);

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
      // delete mob
      if (!currentSpawner.enemyList[indexEnm].isAlive) {
       // currentSpawner.mobDefinition.
        this._player._allLevel.fight.addXp(currentSpawner.mobDefinition.xp)
        currentSpawner.deleteWtIndex(indexEnm)
      }
      
    }
  }

  // check empty game loop
  // todo : add mob and player

    engine_check_empty_pos = (targetPos : baseTypes.IVec2d) => {
      if (targetPos.y < 0 || targetPos.x < 0)
      {
        console.log(targetPos)
        return false;
      }
      
      // pos player
      if (this._player.pos.x === targetPos.x && this._player.pos.y === targetPos.y)
      {
        return false;
      }
      // map wap wall
      if ( this.textureMapper[this._map2d.map2d[targetPos.y][targetPos.x]].solid) {
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

    updateScreen = (ctx : CanvasRenderingContext2D) => {
      renderer(ctx,
        this.gameScreen.windowDim,
        this._map2d.map2dWtFOV(this.player.pos),
        this.player,
        this.mobSpawnerList);
    }

    // game loop
    gameLoop() {
        this._mobSpawnerList.gameLoop();
    }

    // moove plater
    moovePlayer() {
      let futurpos = this.player.futurPos(this.keyboardEventHandler.dir);
      // moove player
      if (textureMapper[this.map2d[futurpos.y][futurpos.x]].solid === false
        && this.mobSpawnerList.findEnemyIndex(futurpos) === null)
          this.player.moove(this.keyboardEventHandler.dir);
    }
}

export default GlobalGameObject;