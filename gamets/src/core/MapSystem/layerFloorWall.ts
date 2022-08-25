import * as texture from '../texture/mapTexture';


export interface ILayerWallFloorTexture{
    solid : boolean;
    color : string;
    img : HTMLImageElement;
    id : number;
}

export type TMap2D = number[][];

export interface IBaseLayerMap {
    name : string;
    id : number;
    map2d : number[][];
}

export const textureMapper = {
    [texture.FirstFloor.id] : texture.FirstFloor,
    [texture.FirstWall.id] : texture.FirstWall,
    [texture.SecondFloor.id] : texture.SecondFloor,
    [texture.SecondWall.id] : texture.SecondWall
}

// INIT MAP
export const firstMap : IBaseLayerMap = {
    name : "base map",
    id : 0,
    map2d :[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,2,2,2,2,2,2,3,0,0,1],
    [1,0,0,0,0,0,0,3,2,2,2,2,2,2,3,0,0,1],
    [1,0,0,0,0,0,0,3,2,2,2,2,2,2,3,0,0,1],
    [1,0,0,0,0,0,0,3,2,2,2,2,2,2,3,0,0,1],
    [1,0,0,0,0,0,0,3,2,2,2,2,2,2,3,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]}