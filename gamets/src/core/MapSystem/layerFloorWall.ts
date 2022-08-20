export interface ILayerWallFloorTexture{
    solid : boolean;
    color : string;
    id : number;
}

export type TMap2D = number[][];

export interface IBaseLayerMap {
    name : string;
    id : number;
    map2d : number[][];
}

// INIT TEXTURE
const FirstFloor : ILayerWallFloorTexture = {
    solid : false,
    color : "grey",
    id : 0
}

const SecondFloor : ILayerWallFloorTexture = {
    solid : false,
    color : "yellow",
    id : 2
}

const FirstWall : ILayerWallFloorTexture = {
    solid : true,
    color : "black",
    id : 1
}

const SecondWall : ILayerWallFloorTexture = {
    solid : true,
    color : "orange",
    id : 3
}

export const textureMapper = {
    [FirstFloor.id] : FirstFloor,
    [FirstWall.id] : FirstWall,
    [SecondFloor.id] : SecondFloor,
    [SecondWall.id] : SecondWall

}

// INIT MAP
export const firstMap : IBaseLayerMap = {
    name : "base map",
    id : 0,
    map2d :[
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,2,2,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,2,2,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
]}