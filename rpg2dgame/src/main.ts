import { textureMapper } from './core/MapSystem/layerFloorWall';
import KeyboardEventHandler from './services/eventHandler/KeyboardEventHandler';
import renderer from './renderer/renderer';


import globalGameObject from './core/globalGameObject/SingletonGlobalGameObject';
import _GlobalGameObject from './core/globalGameObject/GlobalGameObject';

import rendererDeathScreen from './renderer/rendererDeathScreen';
import GameScreen from './core/entities/GameScreen'


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

// todo : ugly function need rework
function runGameLoop(ctx: CanvasRenderingContext2D, keyboardEvent: KeyboardEventHandler, GlobalGameObject: _GlobalGameObject) {
  if (!GlobalGameObject.player.isAlive) {
    requestAnimationFrame(() => runGameLoop(ctx, keyboardEvent, GlobalGameObject));
    rendererDeathScreen(ctx, GlobalGameObject.gameScreen.windowDim);
  }
  else {
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

      renderer(ctx,
        GlobalGameObject.gameScreen.windowDim,
        GlobalGameObject._map2d.map2dWtFOV(GlobalGameObject.player.pos),
        GlobalGameObject.player,
        GlobalGameObject.mobSpawnerList);
    }
  }
}

export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let GlobalGameObject = globalGameObject;//initGlobalGameObject(new _GlobalGameObject());
  
  GlobalGameObject.gameScreen = new GameScreen({ x: canvas.width, y: canvas.height });

  //

  let eventHandler = new KeyboardEventHandler();
  eventHandler.init();


  if (!canvas) {
    console.error("error init canvas");
    return;
  }

  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("error init ctx");
      return;
    }

    //@ts-ignore
    initAnimation();
    requestAnimationFrame(() => { if (ctx) runGameLoop(ctx, eventHandler, GlobalGameObject) });
  }
}

initCanvas();