import { textureMapper, firstMap, TMap2D, ILayerWallFloorTexture } from './core/MapSystem/layerFloorWall';
import * as typesBase from "./core/types/base.d";
import Player from './core/entities/Player';
import Enemy from './core/entities/Enemy';
import KeyboardEventHandler from './services/eventHandler/KeyboardEventHandler';
import MobSpawner from './core/entities/MobSpawner';

import * as imgMob from './core/texture/mobTexture'

import renderer from './renderer/renderer';

import C_CONFIG from './config/baseconfig';

import _GlobalGameObject from './core/globalGameObject/GlobalGameObject';
import rendererDeathScreen from './renderer/rendererDeathScreen';

// BASE VARIABLE
let fps: number = 30;
let fpsInterval: number;
let startTime: number;
let now: number;
let then: number;
let elapsed: number;

function initAnimation() {
  fpsInterval = 1000 / fps;
  then = performance.now();//Date.now();
  startTime = then;
  console.log(startTime);
}

// todo : add mob and player
const engine_check_is_empty_floor = (pos: typesBase.IVec2d, mapData: TMap2D, textureMapper: { [x: number]: ILayerWallFloorTexture }) => {
  return (pos.x === -1 && pos.y === -1) || textureMapper[mapData[pos.y][pos.x]].solid
}

// generate memeber 
const mobGenerator = (dimMap : typesBase.IVec2d) => {
  return {
    x: Math.floor(Math.random() * dimMap.x),
    y: Math.floor(Math.random() * dimMap.y)
  }
}

// todo : ugly function need rework
function runGameLoop(ctx: CanvasRenderingContext2D, keyboardEvent: KeyboardEventHandler, GlobalGameObject : _GlobalGameObject) {
  if (!GlobalGameObject.player.isAlive) {
    requestAnimationFrame(() => runGameLoop(ctx, keyboardEvent, GlobalGameObject));
    rendererDeathScreen(ctx, GlobalGameObject.gameScreen.windowDim);
  }
 else {
  //  console.log("turn")
    // request another animation frame
    requestAnimationFrame(() => runGameLoop(ctx, keyboardEvent, GlobalGameObject));

    now = performance.now();//Date.now();
    elapsed = now - then;

    // physics check
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      let futurpos = GlobalGameObject.player.futurPos(keyboardEvent.dir);
      // moove player
      if (textureMapper[GlobalGameObject.map2d[futurpos.y][futurpos.x]].solid === false
         && GlobalGameObject.mobSpawnerList.findEnemyIndex(futurpos) === null)
        GlobalGameObject.player.moove(keyboardEvent.dir);

      // todo : futur loop on all this element
      GlobalGameObject.runFight(futurpos)
      GlobalGameObject.gameLoop()

/*
        renderer(ctx,
          GlobalGameObject.gameScreen.windowDim,
          GlobalGameObject._map2d.map2dWtFOV(GlobalGameObject.player.pos),
          GlobalGameObject.player,
          GlobalGameObject.enemyList);
        }
*/
        renderer(ctx,
          GlobalGameObject.gameScreen.windowDim,
          GlobalGameObject._map2d.map2dWtFOV(GlobalGameObject.player.pos),
          GlobalGameObject.player,
          GlobalGameObject.mobSpawnerList);
        }
  }
}

const initGlobalGameObject = (GlobalGameObject : _GlobalGameObject) => {
  GlobalGameObject.player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);

  GlobalGameObject.map2d = firstMap.map2d;
  // describe fov of map
  GlobalGameObject._map2d.fieldOfView = C_CONFIG.GAME_CONFIG.FOV;

  GlobalGameObject.addMobSpawner(new MobSpawner(10, {start : {x : 5, y : 5}, end : {x : 10, y : 10}}));
  GlobalGameObject.addMobSpawner(new MobSpawner(10, {start : {x : 10, y : 10}, end : {x : 20, y : 20}}));
  GlobalGameObject.addMobSpawner(new MobSpawner(10, {start : {x : 20, y : 10}, end : {x : 25, y : 20}}));


  return GlobalGameObject;
}

export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let GlobalGameObject = initGlobalGameObject(new _GlobalGameObject({ x: canvas.width, y: canvas.height }));
  
  let eventHandler = new KeyboardEventHandler();
  // manage event handler
  document.addEventListener("keydown", (event: KeyboardEvent) => {
    let key = event.key;

    switch (key) {
      case 'ArrowUp':
        eventHandler.dir = 'TOP';
        break;
      case 'ArrowDown':
        eventHandler.dir = 'BOTTOM';

        break;
      case 'ArrowLeft':
        eventHandler.dir = 'LEFT';

        break;
      case 'ArrowRight':
        eventHandler.dir = 'RIGHT';

        break;
    }
  })
  document.addEventListener("keyup", () => {
    eventHandler.dir = 'NONE';
  })


  if (!canvas) {
   // console.log("error init canvas");
    return;
  }

  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    if (!ctx) {
   //   console.log("error init ctx");
      return;
    }

   // console.log(C_CONFIG)
    //drawMap2d(ctx, {x : canvas.width, y : canvas.height}, map2d, player);//{x : 100, y : 100});
    //@ts-ignore
    initAnimation();
    requestAnimationFrame(() => { if (ctx) runGameLoop(ctx, eventHandler, GlobalGameObject) });
  }
}

initCanvas();