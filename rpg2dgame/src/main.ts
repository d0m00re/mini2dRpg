import globalGameObject from './core/globalGameObject/SingletonGlobalGameObject';
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
}

// todo : ugly function need rework
function runGameLoop(ctx: CanvasRenderingContext2D) {
  if (!globalGameObject.player.isAlive) {
    requestAnimationFrame(() => runGameLoop(ctx));
    rendererDeathScreen(ctx, globalGameObject.gameScreen.windowDim);
  }
  else {
    // request another animation frame
    requestAnimationFrame(() => runGameLoop(ctx));

    now = performance.now();//Date.now();
    elapsed = now - then;

    // physics check
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);

      // todo : futur loop on all this element
      globalGameObject.moovePlayer();
      globalGameObject.runFight()
      globalGameObject.gameLoop()
      globalGameObject.updateScreen(ctx);
    }
  }
}

export function initCanvas() {
  let canvas = document.getElementById("canvas") as HTMLCanvasElement;
  
  globalGameObject.gameScreen = new GameScreen({ x: canvas.width, y: canvas.height });

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
    requestAnimationFrame(() => { if (ctx) runGameLoop(ctx) });
  }
}

initCanvas();