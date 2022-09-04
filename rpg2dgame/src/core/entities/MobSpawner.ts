/*
** manage mob spawning
** maintain his own list of mob inside a specific interval
** better possible optimization because we don t want to check each monster and pop it after all
*/

import Enemy from './Enemy';
import * as typesBase from "./../types/base.d";
import {IMobDefinition} from "./../../config/monster";

/*
** maintain own list of mob and spawn it if require
*/

export interface IInterval {
    start : typesBase.IVec2d;
    end : typesBase.IVec2d;
}

// generate memeber 
const randomVec2d = (dimMap : typesBase.IVec2d) => {
    return {
      x: Math.floor(Math.random() * dimMap.x),
      y: Math.floor(Math.random() * dimMap.y)
    }
}

const subVec2d = (a : typesBase.IVec2d, b : typesBase.IVec2d) => {
    return ({x : a.x - b.x, y : a.y - b.y})
}

const addVec2d = (a : typesBase.IVec2d, b : typesBase.IVec2d) => {
    return ({x : a.x + b.x, y : a.y + b.y})
}

/*
** moore easier for managing mob region
*/
class MobSpawner {
    private _mobDefinition : IMobDefinition;
    private _maxMobSpawn : number;
    private _interval : IInterval;
    private _enemyList : Enemy[];
   // private _enemyTemplate : [{level : number, spawnChance : number}]

    constructor (maxMobSpawn : number, interval : IInterval, mobDefinition : IMobDefinition) {
        this._maxMobSpawn = maxMobSpawn;
        this._interval = interval;
        this._enemyList = [];
        this._mobDefinition = mobDefinition;
    }

    get enemyList() : Enemy[] { return this._enemyList}
    set enemyList(enemyList : Enemy[]) {this._enemyList = enemyList}

    get mobDefinition() : IMobDefinition {return this._mobDefinition}

    // find enemy index
    // - 1 : no enemy
    // > -1 enemy
    findEnemyIndex = (posTarget : typesBase.IVec2d) => {
        return this._enemyList.findIndex(e => e.pos.x === posTarget.x && e.pos.y === posTarget.y);
    }

    // check no enemy trget
    checkPosEmpty = (posTarget : typesBase.IVec2d) => {
        return this.findEnemyIndex(posTarget) === -1;
        // this._enemyList.findIndex(e => e.pos.x === posTarget.x && e.pos.y === posTarget.y) === - 1;
    }

    deleteWtIndex (id : number) {
        this._enemyList = this._enemyList.filter((e, i) => i !== id)
    }

    //
    gameLoop () {
            while (this._enemyList.length < this._maxMobSpawn) {
                let newPos = randomVec2d(subVec2d(this._interval.end, this._interval.start));
                newPos = addVec2d(this._interval.start, newPos);

                // check valid position
                // check floor map
                // check no enemy
              //  checkEmpty(newPos) 
                // use mob definition for getting this one
                if (this.findEnemyIndex(newPos) === -1) { 
               // if (checkEmpty(newPos)){
                    let newEnemy = new Enemy(newPos, 'useless',
                                            this._mobDefinition.dmg,
                                            this._mobDefinition.maxLife,
                                            this._mobDefinition.maxLife,
                                            this._mobDefinition.imgMob)
                    this._enemyList.push(newEnemy);
                }
            }
        }
   // }
}

export default MobSpawner;