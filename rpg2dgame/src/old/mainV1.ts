interface IVec2d {
  x : number;
  y : number;
}

// player position
type T_DIR = 'NONE' | 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT'; 

// event handler
class KeyboardEventHandler {
  private _dir : T_DIR;

  constructor () {
    this._dir = 'NONE'
  }

  get dir() : T_DIR { return this._dir}
  set dir(dir : T_DIR) {this._dir = dir}
/*
  document.addEventListener('keydown', (event : any) => {

  })
*/
};

//

class Player {
  private _pos : IVec2d;
  private _color : string;
  constructor (pos : IVec2d, color : string) {
    this._pos = pos;
    this._color = color;
  }

  get pos() : IVec2d { return this._pos}
  set pos(pos : IVec2d) {this._pos = pos}

  get color() : string { return this._color}
  set color(color : string) {this._color = color}

  futurPos(dir : T_DIR) {
    let pos = {...(this._pos)};
    switch(dir) {
      case 'TOP':
        pos.y -= 1;
        break;
      case 'BOTTOM':
        pos.y += 1;
        break;
      case 'LEFT':
        pos.x -= 1;
        break;
      case 'RIGHT':
        pos.x += 1;
        break;
    }
    return pos;
  }

  moove(dir : T_DIR) {
    this._pos = this.futurPos(dir);
  }
}


// map management
interface IMap2d {
  _map : number[][];
  color : string[];
}

const map2d : IMap2d = {
  _map : [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
  ],
  color : ["white", "black"]
}

export function render(ctx : CanvasRenderingContext2D, dim : IVec2d,
                          mapData : IMap2d, player : Player) {

    let dimCase : IVec2d = {x : mapData._map[0].length, y : mapData._map.length};

    const widthCase = dim.x / dimCase.x;
    const heightCase = dim.y / dimCase.y;

    console.log(widthCase, ' ', heightCase);                

    // base map
    for (let y = 0; y < dimCase.y; y++) {
      for (let x = 0; x < dimCase.x; x++) {
        ctx.fillStyle = mapData.color[mapData._map[y][x]];
        ctx.fillRect(widthCase * x, heightCase * y,
        widthCase, heightCase);
      }
    }

    // draw color on it 
    
    ctx.fillStyle = player.color;
    let baseX = widthCase * player.pos.x;
    let baseY = heightCase * player.pos.y;
    ctx.fillRect(baseX, baseY,
                widthCase, heightCase);
    console.log("Draw player : ", baseX, baseY, widthCase, heightCase)
}

function runGameLoop(ctx : CanvasRenderingContext2D, dim : IVec2d, mapData : IMap2d, player : Player, keyboardEvent : KeyboardEventHandler) {
  // update game state

  // position update
  //player.pos.x += 1;
  
  // physics check
  let futurpos = player.futurPos(keyboardEvent.dir);
  if (mapData._map[futurpos.y][futurpos.x] !== 1)
    player.moove(keyboardEvent.dir);
  // render update
  render(ctx, dim, mapData, player);//{x : 100, y : 100});
  requestAnimationFrame(() => runGameLoop(ctx, dim, mapData, player, keyboardEvent));
}


export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let player = new Player({ x: 5, y : 5}, 'green');

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
    console.log("keydown")

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
   var ctx = canvas.getContext("2d");
   if (!ctx)
  {
    console.log("error init ctx");
    return ;
  }
    //drawMap2d(ctx, {x : canvas.width, y : canvas.height}, map2d, player);//{x : 100, y : 100});
    //@ts-ignore
    requestAnimationFrame(() => runGameLoop(ctx, {x : canvas.width, y : canvas.height}, map2d, player, eventHandler));
}
}

initCanvas();