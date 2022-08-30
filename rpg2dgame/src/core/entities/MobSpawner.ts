/*
** manage mob spawning
** maintain his own list of mob inside a specific interval
** better possible optimization because we don t want to check each monster and pop it after all
*/

import Enemy from './Enemy';
import * as imgMob from './../../core/texture/mobTexture'
import * as typesBase from "./../types/base.d";


/*
** maintain own list of mob and spawn it if require
*/

interface IInterval {
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
    private _maxMobSpawn : number;
    private _interval : IInterval;
    private _enemyList : Enemy[];
   // private _enemyTemplate : [{level : number, spawnChance : number}]

    constructor (maxMobSpawn : number, interval : IInterval) {
        this._maxMobSpawn = maxMobSpawn;
        this._interval = interval;
        this._enemyList = [];
    }

    get enemyList() : Enemy[] { return this._enemyList}
    set enemyList(enemyList : Enemy[]) {this._enemyList = enemyList}

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
      //  if (this._enemyList.length < this._maxMobSpawn) {
            // generate some monster
            //new Enemy(posMob, 'red', 0.5, 5, 5, imgMob.mob2)
            while (this._enemyList.length < this._maxMobSpawn) {
                let newPos = randomVec2d(subVec2d(this._interval.end, this._interval.start));
                newPos = addVec2d(this._interval.start, newPos);

                // check valid position
                // check floor map
                // check no enemy
                if (this.findEnemyIndex(newPos) === -1) { 
                    let newEnemy = new Enemy(newPos, 'red', 0.5, 5, 5, imgMob.mob2)
                    this._enemyList.push(newEnemy);
                }
             //   console.log("enemy list: ")
             //   console.log(this._enemyList)
            }
         //   console.log("Mob map : ");
        //    console.log(this._enemyList)
        }
   // }
}

export default MobSpawner;