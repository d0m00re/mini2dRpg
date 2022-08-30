import * as typesBase from "./../core/types/base.d";

import * as canvasService from './../services/canvas';

type TUIElem = 'button' | 'text' | 'rect';

interface IUIElem {
    typeElem : TUIElem,
    pos : typesBase.IVec2d
    fill : string;
};

interface IButton extends IUIElem {
    dim : typesBase.IVec2d
}

interface IText extends IUIElem {
    label : string
}

type TAllUiElem = Array<IButton | IText>;
//const cats: Record<CatName, CatInfo> = {

 
const uiElements : TAllUiElem = [
    {
        typeElem : 'button',
        pos : {x: 100, y: 100},
        dim : {x : 400, y : 100},
        fill : 'black'
    },
    {
        typeElem : 'text',
        pos : {x : 200, y : 160},
        fill : 'white',
        label : "Play again"
    },
    {
        typeElem : 'text',
        pos : {x : 0, y : 0},
        fill : 'white',
        label : "Game Loose !"
    },
];
//const renderGraphicElement = (ctx : CanvasRenderingContext2D, uiElem :  TAllUiElem) => {

const renderGraphicElement = (ctx : CanvasRenderingContext2D, uiElem : any) => {
    for (let i = 0; i < uiElem.length; i++) {     
        switch (uiElem[i].typeElem) {
            case 'text' :
             //   console.log(uiElem[i].label)
                canvasService.drawText(ctx, uiElem[i].label, uiElem[i].fill, uiElem[i].pos);
            break;
            case 'button' :
                canvasService.drawRect(ctx, uiElem[i].fill, uiElem[i].pos, uiElem[i].dim);
            break;
        }
    }
}

const renderDeathString = (ctx : CanvasRenderingContext2D, windowDim : typesBase.IVec2d) => {
    canvasService.drawRect(ctx, 'blue', {x : 0, y : 0}, windowDim)
    //canvasService.drawRect
    renderGraphicElement(ctx, uiElements)
}

export default renderDeathString;