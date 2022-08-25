import {textureMapper, firstMap, TMap2D} from './core/MapSystem/layerFloorWall';
import * as typesBase from "./core/types/base.d";
import Player from './core/entities/Player';
import Enemy from './core/entities/Enemy';
import * as canvasService from './services/canvas';
import KeyboardEventHandler from './services/eventHandler/KeyboardEventHandler';
import * as imgPlayer from './core/texture/playerTexture';
import * as imgMob from './core/texture/mobTexture'

// BASE VARIABLE
let fps : number = 30;
let fpsInterval : number;
let startTime : number;
let now : number;
let then : number;
let elapsed : number;

interface IUIElement {
  pos : typesBase.IVec2d,
  dim : typesBase.IVec2d
}

//
const renderMap = (ctx : CanvasRenderingContext2D,
                  dimCase : typesBase.IVec2d,
                  mapData : TMap2D,
                  tileDim : typesBase.IVec2d) => {
  // base map render
  for (let y = 0; y < dimCase.y; y++) {
    for (let x = 0; x < dimCase.x; x++) {
      ctx.fillStyle = textureMapper[mapData[y][x]].color;
      //ctx.fillRect(tileDim.x * x, tileDim.y * y,
      //  tileDim.x, tileDim.y);
      canvasService.drawImg(ctx,
        textureMapper[mapData[y][x]].img,
        {x : tileDim.x * x, y : tileDim.y * y},
        { x: tileDim.x, y : tileDim.y});
    }
  }
}

const renderEnemy = (ctx : CanvasRenderingContext2D,
                    enemyList : Enemy[],
                    tileDim : typesBase.IVec2d) => {
  // enemy rendering
  for (let x = 0; x < enemyList.length; x++) {
    let enemy = enemyList[x];
    let targetPos : typesBase.IVec2d = {x : tileDim.x * enemy.pos.x, y : tileDim.y * enemy.pos.y}
    ctx.fillStyle = enemy.color;
  //  ctx.fillRect(targetPos.x, targetPos.y, tileDim.x, tileDim.y);
    canvasService.drawImg(ctx, enemy.img, targetPos, tileDim);
    canvasService.drawText(ctx, `${enemy.life}`, 'white', {
      x : targetPos.x + 10,
      y : targetPos.y + (tileDim.y / 2)
    }, '30px');
  }
}

const renderUiBottom = (ctx : CanvasRenderingContext2D, bottomUiInfo : IUIElement, player : Player) => {
  canvasService.drawRect(ctx, 'cyan', bottomUiInfo.pos, bottomUiInfo.dim);


  // draw color on it
  canvasService.drawText(ctx, `Life ${player.life}/${player.maxLife}`, "blue",
                    {x : bottomUiInfo.pos.x + 50, y : bottomUiInfo.pos.y + (bottomUiInfo.dim.y / 2 + 10)});
  
} 

const renderPlayer = (ctx : CanvasRenderingContext2D, player : Player, tileDim : typesBase.IVec2d) => {
    ctx.fillStyle = player.color;
    let baseX = tileDim.x * player.pos.x;
    let baseY = tileDim.y * player.pos.y;
//    ctx.fillRect(baseX, baseY,
//      tileDim.x, tileDim.y);

    canvasService.drawImg(ctx, player.img, {x : baseX, y : baseY}, tileDim);

}

export function render(ctx : CanvasRenderingContext2D, windowDim : typesBase.IVec2d,
                          mapData : TMap2D, player : Player,  enemyList : Enemy[]) {

    let dimCase : typesBase.IVec2d = {x : mapData[0].length, y : mapData.length};

    /*
    ** map dim
    */
   
 
    /*
    ** user info dim
    */
    const bottomUiInfo : IUIElement =  {dim : {x: windowDim.x, y : 200},
                                        pos : {x : 0, y : windowDim.y - 200}}
    const mapInfo : IUIElement = {dim : {x : windowDim.x ,  y : windowDim.y - 200},
                                        pos : {x : 0, y : 0}}


    const tileDim : typesBase.IVec2d = {
      x :  mapInfo.dim.x / dimCase.x,
      y :  mapInfo.dim.y / dimCase.y
    }

    // base map render
    renderMap(ctx, dimCase, mapData, tileDim);

    // enemy rendering
    renderEnemy(ctx, enemyList, tileDim);

    // draw base ui bottom
    renderUiBottom(ctx, bottomUiInfo, player);

    // draw player
    renderPlayer(ctx, player, tileDim)

 //   ctx.fillStyle = player.color;
 //   let baseX = tileDim.x * player.pos.x;
 //   let baseY = tileDim.y * player.pos.y;
  //  ctx.fillRect(baseX, baseY, tileDim.x, tileDim.y);
 }

function initAnimation() {
  fpsInterval = 1000 / fps;
  then = performance.now();//Date.now();
  startTime = then;
  console.log(startTime);
}

function runGameLoop(ctx : CanvasRenderingContext2D, windowDim : typesBase.IVec2d, mapData : TMap2D, player : Player, keyboardEvent : KeyboardEventHandler, enemyList : Enemy[]) {
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
       enemyList[findIndexEnemy].life -= player.dmg;
      player.life -= enemyList[findIndexEnemy].dmg;

      if (!enemyList[findIndexEnemy].isAlive) {
        // find pos where add hour peaple
        let posMob = {x : Math.floor(Math.random() * mapData[0].length),
          y : Math.floor(Math.random() * mapData.length)}
        enemyList.push(new Enemy(posMob, 'red', 0.5, 5, 5, imgMob.mob2));
      }
      enemyList = enemyList.filter(enemy => enemy.life > 0)
    }
    

    // render update
    render(ctx, windowDim, mapData, player, enemyList);//{x : 100, y : 100});
  }
}


export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let player = new Player({ x: 5, y : 5}, 'green', 10, 5, 20, imgPlayer.player1);
  let enemyList : Enemy[] = [];

  enemyList.push(new Enemy({ x: 3, y : 3}, 'red', 0.5, 5, 5, imgMob.mob1));
  enemyList.push(new Enemy({ x: 6, y : 6}, 'red', 0.5, 50, 50, imgMob.mob2));
  enemyList.push(new Enemy({ x: 7, y : 7}, 'red', 0.5, 5, 5, imgMob.mob1));


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