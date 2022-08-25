import {textureMapper, firstMap, TMap2D} from './core/MapSystem/layerFloorWall';
import * as typesBase from "./core/types/base.d";
import Player from './core/entities/Player';
import Enemy from './core/entities/Enemy';
import KeyboardEventHandler from './services/eventHandler/KeyboardEventHandler';
import * as imgPlayer from './core/texture/playerTexture';
import * as imgMob from './core/texture/mobTexture'

import renderer from './renderer/renderer';

const C_CONFIG = {
  player : { 
    PLAYER_INIT_LIFE : 100,
    PLAYER_MAX_LIFE : 100,
    PLAYER_DMG : 40,
    PLAYER_SKIN : imgPlayer.player1
  }
}

// BASE VARIABLE
let fps : number = 30;
let fpsInterval : number;
let startTime : number;
let now : number;
let then : number;
let elapsed : number;

function initAnimation() {
  fpsInterval = 1000 / fps;
  then = performance.now();//Date.now();
  startTime = then;
  console.log(startTime);
}

// todo : ugly function need rework
function runGameLoop(ctx : CanvasRenderingContext2D, windowDim : typesBase.IVec2d, mapData : TMap2D, player : Player, keyboardEvent : KeyboardEventHandler, enemyList : Enemy[]) {
  if (!player.isAlive) {
    requestAnimationFrame(() => runGameLoop(ctx, windowDim, mapData, player, keyboardEvent, enemyList));
  }
  else {
  // request another animation frame
  requestAnimationFrame(() => runGameLoop(ctx, windowDim, mapData, player, keyboardEvent, enemyList));
 
  now = performance.now();//Date.now();
  elapsed = now - then;
  
  // physics check
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    let futurpos = player.futurPos(keyboardEvent.dir);
    // moove player
    if (textureMapper[mapData[futurpos.y][futurpos.x]].solid === false
      && enemyList.findIndex(enemy => (enemy.pos.x === futurpos.x && enemy.pos.y === futurpos.y)) < 0)
      player.moove(keyboardEvent.dir);

    // attack management
  
    const findIndexEnemy = enemyList.findIndex(elem => elem.pos.x === futurpos.x && elem.pos.y === futurpos.y);
    
    // find index of enemy
    if (findIndexEnemy > -1) {
      console.log("find an enemy : ", findIndexEnemy)
      // enemy dmg
      enemyList[findIndexEnemy].life -= player.dmg;
      player.life -= enemyList[findIndexEnemy].dmg;

      if (!enemyList[findIndexEnemy].isAlive) {
        // find pos where add hour peaple
        let posMob = {x : -1, y : -1};
        while ((posMob.x === -1 && posMob.y === -1) || textureMapper[mapData[posMob.y][posMob.x]].solid)
        posMob = {x : Math.floor(Math.random() * mapData[0].length),
          y : Math.floor(Math.random() * mapData.length)}
        console.log("Add an enemy : ", posMob)
        //enemyList = enemyList.filter((e, i) => i == findIndexEnemy)
        enemyList.splice(findIndexEnemy, 1)
        enemyList.push(new Enemy(posMob, 'red', 0.5, 5, 5, imgMob.mob2));
        
      }
     // enemyList = enemyList.filter(enemy => enemy.life > 0)
    }
    

    // render update
    renderer(ctx, windowDim, mapData, player, enemyList);//{x : 100, y : 100});
  }
  }
}

const runDeathScreen = () => {

}

export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let player = new Player({ x: 5, y : 5}, 'green', C_CONFIG.player.PLAYER_DMG, C_CONFIG.player.PLAYER_INIT_LIFE, C_CONFIG.player.PLAYER_MAX_LIFE, C_CONFIG.player.PLAYER_SKIN);
  let enemyList : Enemy[] = [];

  enemyList.push(new Enemy({ x: 3, y : 3}, 'red', 0.5, 5, 5, imgMob.mob1));
  enemyList.push(new Enemy({ x: 6, y : 6}, 'red', 0.5, 50, 50, imgMob.mob2));
  enemyList.push(new Enemy({ x: 10, y : 7}, 'red', 0.5, 5, 5, imgMob.mob1));
  enemyList.push(new Enemy({ x: 12, y : 5}, 'red', 0.5, 20, 5, imgMob.mob1));


  let eventHandler = new KeyboardEventHandler();
// manage event handler
  document.addEventListener("keydown", (event : KeyboardEvent) => {
    let key = event.key;

    switch(key) {
      case 'ArrowUp' :
        eventHandler.dir = 'TOP';
      break;
      case 'ArrowDown' :
        eventHandler.dir = 'BOTTOM';

      break;
      case 'ArrowLeft' :
        eventHandler.dir = 'LEFT';

      break;
      case 'ArrowRight' :
        eventHandler.dir = 'RIGHT';

      break;
    }
  })
  document.addEventListener("keyup", () => {
    eventHandler.dir ='NONE';
  })


  if (!canvas)
  {
    console.log("error init canvas");
    return ;
  }

 if (canvas.getContext) {
   let ctx = canvas.getContext("2d");
   if (!ctx)
  {
    console.log("error init ctx");
    return ;
  }
    //drawMap2d(ctx, {x : canvas.width, y : canvas.height}, map2d, player);//{x : 100, y : 100});
    //@ts-ignore
    initAnimation();
    requestAnimationFrame(() => {if(ctx) runGameLoop(ctx, {x : canvas.width, y : canvas.height}, firstMap.map2d, player, eventHandler, enemyList)});
}
}

initCanvas();