import {IVec2d} from './../../core/types/base.d';

const drawText = (ctx : CanvasRenderingContext2D, text : string, color : string, pos : IVec2d, fontSize ?: string) => {
    ctx.font = ctx.font.replace(/\d+px/, fontSize ?? "42px");//font ?? '48px serif';
    ctx.fillStyle = color;
    ctx.fillText(text, pos.x, pos.y);
}

export default drawText;