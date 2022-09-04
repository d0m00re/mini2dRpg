import { textureMapper, firstMap } from './core/MapSystem/layerFloorWall';
import Player from './core/entities/Player';
import KeyboardEventHandler from './services/eventHandler/KeyboardEventHandler';
import MobSpawner from './core/entities/MobSpawner';
import renderer from './renderer/renderer';

import C_CONFIG from './config/baseconfig';

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

const initGlobalGameObject = (GlobalGameObject: _GlobalGameObject) => {
  GlobalGameObject.player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);

  GlobalGameObject.map2d = firstMap.map2d;
  // describe fov of map
  GlobalGameObject._map2d.fieldOfView = C_CONFIG.GAME_CONFIG.FOV;

  GlobalGameObject.addMobSpawner(new MobSpawner(2, { start: { x: 5, y: 5 }, end: { x: 10, y: 10 } }));
  //GlobalGameObject.addMobSpawner(new MobSpawner(10, { start: { x: 10, y: 10 }, end: { x: 20, y: 20 } }));
  //GlobalGameObject.addMobSpawner(new MobSpawner(10, { start: { x: 20, y: 10 }, end: { x: 25, y: 20 } }));


  return GlobalGameObject;
}

export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  let GlobalGameObject = initGlobalGameObject(new _GlobalGameObject());
  
  GlobalGameObject.gameScreen = new GameScreen({ x: canvas.width, y: canvas.height });

  //

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