import { textureMapper, firstMap, TMap2D, ILayerWallFloorTexture } from './core/MapSystem/layerFloorWall';
import * as typesBase from "./core/types/base.d";
import Player from './core/entities/Player';
import Enemy from './core/entities/Enemy';
import KeyboardEventHandler from './services/eventHandler/KeyboardEventHandler';
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
        && GlobalGameObject.enemyList.findIndex(enemy => (enemy.pos.x === futurpos.x && enemy.pos.y === futurpos.y)) < 0)
        GlobalGameObject.player.moove(keyboardEvent.dir);

      // attack management

      const findIndexEnemy = GlobalGameObject.enemyList.findIndex(elem => elem.pos.x === futurpos.x && elem.pos.y === futurpos.y);

      // find index of enemy
      if (findIndexEnemy > -1) {
        // enemy dmg
        GlobalGameObject.enemyList[findIndexEnemy].life -= GlobalGameObject.player.dmg;
        GlobalGameObject.player.life -= GlobalGameObject.enemyList[findIndexEnemy].dmg;

        if (!GlobalGameObject.enemyList[findIndexEnemy].isAlive) {
          console.log("mob die : ", findIndexEnemy)

          // find pos where add hour peaple
          let posMob = { x: -1, y: -1 };
          //while ((posMob.x === -1 && posMob.y === -1) || textureMapper[mapData[posMob.y][posMob.x]].solid)
          while (!engine_check_is_empty_floor(posMob, GlobalGameObject.map2d, textureMapper)) {
            //posMob = {
            //  x: Math.floor(Math.random() * mapData[0].length),
            //  y: Math.floor(Math.random() * mapData.length)
            //}
            posMob = mobGenerator({x : Math.random() * GlobalGameObject.map2d[0].length, y : Math.random() * GlobalGameObject.map2d.length});
            console.log("Add an enemy : ", posMob)
            //enemyList = enemyList.filter((e, i) => i == findIndexEnemy)

          }
          GlobalGameObject.removeEnemy(findIndexEnemy)
          GlobalGameObject.addEnemy(new Enemy(posMob, 'red', 0.5, 5, 5, imgMob.mob2));
          console.log("* add new mob : ", GlobalGameObject.enemyList.length)
          // enemyList = enemyList.filter(enemy => enemy.life > 0)
        }
      }

        // render update
        renderer(ctx, GlobalGameObject.gameScreen.windowDim, GlobalGameObject.map2d, GlobalGameObject.player, GlobalGameObject.enemyList);//{x : 100, y : 100});
      
    }
  }
}

/*
const runDeathScreen = () => {
  //console.log("DEATH SCREEN")
  canvasUtils.drawText(ctx, "You are death", "blue", { x: 0, y: 0 }, "32")
}
*/

const initGlobalGameObject = (GlobalGameObject : _GlobalGameObject) => {
  GlobalGameObject.player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);

  GlobalGameObject.map2d = firstMap.map2d;

  GlobalGameObject.addEnemy(new Enemy({ x: 3, y: 3 }, 'red', 0.5, 5, 5, imgMob.mob1));
  GlobalGameObject.addEnemy(new Enemy({ x: 6, y: 6 }, 'red', 0.5, 50, 50, imgMob.mob2));
  GlobalGameObject.addEnemy(new Enemy({ x: 10, y: 7 }, 'red', 0.5, 5, 5, imgMob.mob1));
  GlobalGameObject.addEnemy(new Enemy({ x: 12, y: 5 }, 'red', 0.5, 20, 5, imgMob.mob1));
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
    console.log("error init canvas");
    return;
  }

  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("error init ctx");
      return;
    }

    console.log(C_CONFIG)
    //drawMap2d(ctx, {x : canvas.width, y : canvas.height}, map2d, player);//{x : 100, y : 100});
    //@ts-ignore
    initAnimation();
    requestAnimationFrame(() => { if (ctx) runGameLoop(ctx, eventHandler, GlobalGameObject) });
  }
}

initCanvas();