//import _floor2 from '/floor2.jpg';
//import _floorMaze from '/floorMaze.jpg';

// JSON TEXTURE
//interface IJSONTexture {
//    label : string;
//    url : string;
//}
//

// minimal texture system without good generation

import imgUrlToHTMLImageElement from './imgUrlToHTMLImageElement';

let floor2 = imgUrlToHTMLImageElement('/mapTexture/floor2.jpg');
let floorMaze = imgUrlToHTMLImageElement('/mapTexture/floorMaze.jpg');
let wall = imgUrlToHTMLImageElement('/mapTexture/wall.webp');
let wall2 = imgUrlToHTMLImageElement('/mapTexture/wall2.jpg');

export interface ILayerWallFloorTexture{
    solid : boolean;
    color : string;
    img : HTMLImageElement;
    id : number;
}

// INIT TEXTURE
const FirstFloor : ILayerWallFloorTexture = {
    solid : false,
    color : "grey",
    id : 0,
    img : floor2
}

const SecondFloor : ILayerWallFloorTexture = {
    solid : false,
    color : "yellow",
    id : 2,
    img : floorMaze

}

const FirstWall : ILayerWallFloorTexture = {
    solid : true,
    color : "black",
    id : 1, 
    img : wall2
}

const SecondWall : ILayerWallFloorTexture = {
    solid : true,
    color : "orange",
    id : 3,
    img : wall
}

export {
    FirstFloor,
    SecondFloor,
    FirstWall,
    SecondWall
}