import {textureMapper, firstMap, TMap2D} from './core/MapSystem/layerFloorWall';
import * as typesBase from "./core/types/base.d";
import Player from './core/entities/Player';
import Enemy from './core/entities/Enemy';


// event handler
class KeyboardEventHandler {
  private _dir : typesBase.T_DIR;

  constructor () {
    this._dir = 'NONE'
  }

  get dir() : typesBase.T_DIR { return this._dir}
  set dir(dir : typesBase.T_DIR) {this._dir = dir}
};

//



export function render(ctx : CanvasRenderingContext2D, dim : typesBase.IVec2d,
                          mapData : TMap2D, player : Player,  enemyList : Enemy[]) {

    let dimCase : typesBase.IVec2d = {x : mapData[0].length, y : mapData.length};

    const widthCase = dim.x / dimCase.x;
    const heightCase = dim.y / dimCase.y;

    console.log(widthCase, ' ', heightCase);                

    // base map render
    for (let y = 0; y < dimCase.y; y++) {
      for (let x = 0; x < dimCase.x; x++) {
        ctx.fillStyle = textureMapper[mapData[y][x]].color;
        ctx.fillRect(widthCase * x, heightCase * y,
        widthCase, heightCase);
      }
    }

    // enemy rendering
    for (let x = 0; x < enemyList.length; x++) {
      ctx.fillStyle = enemyList[x].color;
      ctx.fillRect(widthCase * enemyList[x].pos.x, heightCase * enemyList[x].pos.y,
      widthCase, heightCase);
    }


    // draw color on it 
    
    ctx.fillStyle = player.color;
    let baseX = widthCase * player.pos.x;
    let baseY = heightCase * player.pos.y;
    ctx.fillRect(baseX, baseY,
                widthCase, heightCase);
    console.log("Draw player : ", baseX, baseY, widthCase, heightCase)
}


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

function runGameLoop(ctx : CanvasRenderingContext2D, dim : typesBase.IVec2d, mapData : TMap2D, player : Player, keyboardEvent : KeyboardEventHandler, enemyList : Enemy[]) {
  // request another animation frame
  requestAnimationFrame(() => runGameLoop(ctx, dim, mapData, player, keyboardEvent, enemyList));
 
  now = performance.now();//Date.now();
  elapsed = now - then;
  //fpsInterval, startTime, now, then, elapsed;
  // update game state

  // position update
  
  // physics check
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);

    let futurpos = player.futurPos(keyboardEvent.dir);
    if (textureMapper[mapData[futurpos.y][futurpos.x]].solid === false
      && enemyList.findIndex(enemy => (enemy.pos.x === futurpos.x && enemy.pos.y === futurpos.y)) < 0)
      player.moove(keyboardEvent.dir);
    // render update
    render(ctx, dim, mapData, player, enemyList);//{x : 100, y : 100});
  }
}


export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let player = new Player({ x: 5, y : 5}, 'green', 10, 5);
  let enemyList : Enemy[] = [];

  enemyList.push(new Enemy({ x: 3, y : 3}, 'red', 10, 5));
  enemyList.push(new Enemy({ x: 6, y : 6}, 'red', 10, 5));
  enemyList.push(new Enemy({ x: 7, y : 7}, 'red', 10, 5));


  let eventHandler = new KeyboardEventHandler();
// manage event handler
  document.addEventListener("keydown", (event) => {
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
    requestAnimationFrame(() => runGameLoop(ctx, {x : canvas.width, y : canvas.height}, firstMap.map2d, player, eventHandler, enemyList));
}
}

initCanvas();