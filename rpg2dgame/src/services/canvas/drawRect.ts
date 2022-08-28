import {IVec2d} from './../../core/types/base.d';

const drawRect = (ctx : CanvasRenderingContext2D, color : string, pos : IVec2d, dim : IVec2d) => {
    ctx.fillStyle = color;
    ctx.fillRect(pos.x, pos.y, dim.x, dim.y);
}

export default drawRect;