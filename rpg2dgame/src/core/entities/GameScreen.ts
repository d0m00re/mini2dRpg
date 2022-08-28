import Player from './../../core/entities/Player';
import Enemy from './../../core/entities/Enemy';
import C_CONFIG from './../../config/baseconfig';
import * as baseTypes from './../../core/types/base';

class GlobalGameObject {
    private _windowDim : baseTypes.IVec2d;

    constructor (windowDim : baseTypes.IVec2d) {
        this._windowDim = windowDim;
      }

    get windowDim() : baseTypes.IVec2d { return this._windowDim}
    set windowDim(windowDim : baseTypes.IVec2d) {this._windowDim = windowDim}
}

export default GlobalGameObject;