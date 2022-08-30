import * as baseTypes from './../types/base';

class MapManagement {
    private _map2d : number[][];
    private _fieldOfView : baseTypes.IVec2d;

    constructor (fieldOfView : baseTypes.IVec2d) {
        this._map2d = [[]];
        this._fieldOfView = fieldOfView;
    }

    get map2d() : number[][] { return this._map2d}
    set map2d(map2d : number[][]) {this._map2d = map2d}

    get fieldOfView() :  baseTypes.IVec2d { return this._fieldOfView}
    set fieldOfView(fieldOfView : baseTypes.IVec2d) {this._fieldOfView = fieldOfView}

    // get map with field of view
    public findIntervalPosOld(pos : baseTypes.IVec2d) {
        let fov = this._fieldOfView;
        let fovMiddle : baseTypes.IVec2d = {x : fov.x / 2, y : fov.y / 2}
        let startPos = {x : pos.x - fovMiddle.x,
                        y : pos.y - fovMiddle.y};

     //   console.log("Pos player")
     //   console.log(pos);
     //   console.log(startPos)

        // few case to manage
        // when we are on the top of the map
        // top
        if (startPos.x < 0) startPos.x = 0;
        if (startPos.y < 0) startPos.y = 0;
        // end pos calcul

        let endPos = {x : startPos.x + fovMiddle.x,
                      y : startPos.y + fovMiddle.y};
        
        if (endPos.x > this._map2d[0].length)
            startPos.x = this._map2d[0].length - fov.x;
        if (endPos.y > this._map2d.length)
            startPos.y = this._map2d.length - fov.y;
        return {start : startPos,
                end : {
                    x : startPos.x + this._fieldOfView.x,
                    y : startPos.y + this._fieldOfView.y
                }}      
    }

    public findIntervalPos(pos : baseTypes.IVec2d) {
        let fov = this._fieldOfView;
        let fovMiddle : baseTypes.IVec2d = {x : fov.x / 2, y : fov.y / 2}

        // first pos calculation
        let startPos = {x : pos.x - fovMiddle.x,
                        y : pos.y - fovMiddle.y};
        let endPos = {x : startPos.x + fov.x,
                      y : startPos.y + fov.y}
        // few case to manage
        // when we are on the top of the map
        // top
        if (startPos.x < 0) startPos.x = 0;
        if (startPos.y < 0) startPos.y = 0;
        // end pos calcul
        
        if (endPos.x > this._map2d[0].length)
            startPos.x = this._map2d[0].length - fov.x;
        if (endPos.y > this._map2d.length)
            startPos.y = this._map2d.length - fov.y;
        return {start : startPos,
                end : {
                    x : startPos.x + this._fieldOfView.x,
                    y : startPos.y + this._fieldOfView.y
                }}      
    }

    // get map with field of view
    // 
    public map2dWtFOV(pos : baseTypes.IVec2d) {
        let intervalPos = this.findIntervalPos(pos);
        // generate new array 
        let extractSubmapLines =
            this._map2d.filter((line, _y) => {
                return (_y >= intervalPos.start.y && _y < intervalPos.end.y);
            });

        let extractMapWithRow = 
            extractSubmapLines.map((line, _x) => {
                return line.filter((row, _x) => _x >= intervalPos.start.x && _x < intervalPos.end.x)
            });

        return {map2d : extractMapWithRow, intervalPos : intervalPos};
    }

}

export default MapManagement;