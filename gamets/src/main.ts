

export function drawbase(ctx : CanvasRenderingContext2D) {
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  ctx.fillRect(30, 30, 50, 50);
}

interface IVec2d {
  x : number;
  y : number;
}

// draw 10 on 10 map carry
export function drawMap(ctx : CanvasRenderingContext2D,
                        dim : IVec2d,
                        nbCase : IVec2d) {

  const colorArr = ["red", "blue"]
  const widthCase = dim.x / nbCase.x;
  const heightCase = dim.y / nbCase.y;
 
  for (let y = 0; y < nbCase.y; y++) {
    for (let x = 0; x < nbCase.x; x++) {
      ctx.fillStyle = colorArr[((x + y) % 2)];
      ctx.fillRect(widthCase * x, heightCase * y,
                  widthCase * (x+1), heightCase * (y+1));
    }
  }
}


export function initCanvas() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;

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
  drawMap(ctx, {x : canvas.width, y : canvas.height}, {x : 100, y : 100});
 }
}

initCanvas();