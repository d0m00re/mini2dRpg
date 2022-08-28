import { textureMapper, TMap2D } from './../core/MapSystem/layerFloorWall';
import * as typesBase from "./../core/types/base.d";
import Player from './../core/entities/Player';
import Enemy from './../core/entities/Enemy';
import * as canvasService from './../services/canvas';

interface IInterval {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
}
interface IMapInformation {
  map2d: number[][];
  intervalPos: IInterval;
}

interface IUIElement {
  pos: typesBase.IVec2d,
  dim: typesBase.IVec2d
}

//
const renderMap = (ctx: CanvasRenderingContext2D,
  dimCase: typesBase.IVec2d,
  mapData: TMap2D,
  tileDim: typesBase.IVec2d) => {
  // base map render
  for (let y = 0; y < dimCase.y; y++) {
    for (let x = 0; x < dimCase.x; x++) {
      ctx.fillStyle = textureMapper[mapData[y][x]].color;
      //ctx.fillRect(tileDim.x * x, tileDim.y * y,
      //  tileDim.x, tileDim.y);
      canvasService.drawImg(ctx,
        textureMapper[mapData[y][x]].img,
        { x: tileDim.x * x, y: tileDim.y * y },
        { x: tileDim.x, y: tileDim.y });
    }
  }
}

const renderEnemy = (ctx: CanvasRenderingContext2D,
  enemyList: Enemy[],
  tileDim: typesBase.IVec2d,
  mapPosStart : typesBase.IVec2d) => {
  // enemy rendering
  for (let x = 0; x < enemyList.length; x++) {
    let enemy = enemyList[x];
    let targetPos: typesBase.IVec2d = { x: tileDim.x * (enemy.pos.x - mapPosStart.x), y: tileDim.y * (enemy.pos.y - mapPosStart.y) }
    ctx.fillStyle = enemy.color;
    //  ctx.fillRect(targetPos.x, targetPos.y, tileDim.x, tileDim.y);
    canvasService.drawImg(ctx, enemy.img, targetPos, tileDim);
    canvasService.drawText(ctx, `${enemy.life}`, 'white', {
      x: targetPos.x + 10,
      y: targetPos.y + (tileDim.y / 2)
    }, '30px');
  }
}

const renderUiBottom = (ctx: CanvasRenderingContext2D, bottomUiInfo: IUIElement, player: Player) => {
  canvasService.drawRect(ctx, 'cyan', bottomUiInfo.pos, bottomUiInfo.dim);


  // draw color on it
  canvasService.drawText(ctx, `Life : ${player.life}/${player.maxLife}`, "blue",
    { x: bottomUiInfo.pos.x + 50, y: bottomUiInfo.pos.y + (bottomUiInfo.dim.y / 2) });
  canvasService.drawText(ctx, `Dmg : ${player.dmg}`, "blue",
    { x: bottomUiInfo.pos.x + 50, y: bottomUiInfo.pos.y + (bottomUiInfo.dim.y / 2 + 50) });
}

const renderPlayer = (ctx: CanvasRenderingContext2D, player: Player, tileDim: typesBase.IVec2d, mapPosStart : typesBase.IVec2d) => {
  ctx.fillStyle = player.color;
  let baseX = tileDim.x * (player.pos.x - mapPosStart.x);
  let baseY = tileDim.y * (player.pos.y - mapPosStart.y);
  //    ctx.fillRect(baseX, baseY,
  //      tileDim.x, tileDim.y);

  canvasService.drawImg(ctx, player.img, { x: baseX, y: baseY }, tileDim);

}

const checkPositionInsideInterval = (interval : IInterval, targetPos : typesBase.IVec2d) => {
    return (
      targetPos.x >= interval.start.x &&
      targetPos.y >= interval.start.y &&
      targetPos.x < interval.end.x &&
      targetPos.y < interval.end.y
    );
}

export default function renderer(ctx: CanvasRenderingContext2D, windowDim: typesBase.IVec2d,
  mapData: IMapInformation, player: Player, enemyList: Enemy[]) {

  let dimCase: typesBase.IVec2d = { x: mapData.map2d[0].length, y: mapData.map2d.length };

  /*
  ** map dim
  */


  /*
  ** user info dim
  */
  const bottomUiInfo: IUIElement = {
    dim: { x: windowDim.x, y: 200 },
    pos: { x: 0, y: windowDim.y - 200 }
  }
  // window dim
  const mapInfo: IUIElement = {
    dim: { x: windowDim.x, y: windowDim.y - 200 },
    pos: { x: 0, y: 0 }
  }


  const tileDim: typesBase.IVec2d = {
    x: mapInfo.dim.x / dimCase.x,
    y: mapInfo.dim.y / dimCase.y
  }

  // base map render
  renderMap(ctx, dimCase, mapData.map2d, tileDim);

  // enemy rendering
  let _enemyList = enemyList.filter(enemy => checkPositionInsideInterval(mapData.intervalPos, enemy.pos))
  renderEnemy(ctx, _enemyList, tileDim, mapData.intervalPos.start);

  // draw player
  renderPlayer(
    ctx,
    player,
    tileDim,
    mapData.intervalPos.start)

  // draw base ui bottom
  renderUiBottom(ctx, bottomUiInfo, player);
  }