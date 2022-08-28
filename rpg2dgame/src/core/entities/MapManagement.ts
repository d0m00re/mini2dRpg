import * as baseTypes from './../types/base';

class MapManagement {
    private _map2d : number[][];
    private _fieldOfView : baseTypes.IVec2d;

    constructor (fieldOfView : baseTypes.IVec2) {
        this._map2d = [[]];
        this._fieldOfView = fieldOfView;
    }

    get map2d() : number[][] { return this._map2d}
    set map2d(map2d : number[][]) {this._map2d = map2d}

    // get map with field of view
    findStartPos(pos : baseTypes.IVec2d) {
        let fov = this._fieldOfView;
        let fovMiddle : baseTypes.IVec2d = {x : fov.x / 2, y : fov.y + 2}
        let startPos = {x : pos.x - fovMiddle.x,
                        y : pos.y - fovMiddle.y};

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
        return startPos;        
    }

    // get map with field of view
    map2dWtFOV(pos : baseTypes.IVec2d) {
        this.findStartPos(pos);
    }

}

export default MapManagement;