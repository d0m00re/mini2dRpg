import Entities from './Entities';
import * as typesBase from './../types/base.d';

class Enemy extends Entities {
    _dropTableId : number;

    constructor(
        pos : typesBase.IVec2d,
        color: string,
        dmg: number,
        life: number,
        maxLife: number,
        img: HTMLImageElement,
        dropTableId : number
        ) {
            super(pos, color, dmg, life, maxLife, img);
            this._dropTableId = dropTableId;
    }

    //simulateDrop
}

export default Enemy;