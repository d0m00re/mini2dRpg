import {IVec2d} from './../../core/types/base.d';

const drawImg = (ctx : CanvasRenderingContext2D, img : CanvasImageSource, pos : IVec2d, dim : IVec2d) => {
     ctx.drawImage(img, pos.x, pos.y, dim.x, dim.y);
}

export default drawImg;