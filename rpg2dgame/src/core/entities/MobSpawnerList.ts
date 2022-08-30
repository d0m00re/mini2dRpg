/*
** manage mob spawning
** maintain his own list of mob inside a specific interval
** better possible optimization because we don t want to check each monster and pop it after all
*/

import MobSpawner from './MobSpawner';
import * as imgMob from './../../core/texture/mobTexture'
import * as typesBase from "./../types/base.d";
import Enemy from './Enemy';

interface IEnemyPositionSpawner {
    spawnerIndex : number;
    monsterIndex : number;
}

class MobSpawnerList {
    private _mapSpawnerList : MobSpawner[];
     // private _enemyTemplate : [{level : number, spawnChance : number}]

    constructor () {
        this._mapSpawnerList = [];
      }

    get enemyList() : MobSpawner[] { return this._mapSpawnerList}
    set enemyList(mapSpawnerList : MobSpawner[]) {this._mapSpawnerList = mapSpawnerList}

    addOne(mobSpawner : MobSpawner) {
        this._mapSpawnerList.push(mobSpawner)
        console.log(this._mapSpawnerList)
    }

    // find enemy index
    // - 1 : no enemy
    // > -1 enemy
    
    findEnemyIndex = (posTarget : typesBase.IVec2d) : IEnemyPositionSpawner | null => {
        for (let i = 0; i < this._mapSpawnerList.length; i++) {
            let index = this._mapSpawnerList[i].findEnemyIndex(posTarget);
            if (index !== -1) {
                console.log({spawnerIndex : i, monsterIndex : index})
                return {spawnerIndex : i, monsterIndex : index};
            }
        }
        return null;
    }

    // check no enemy trget
    checkPosEmpty = (posTarget : typesBase.IVec2d) => {
        return this.findEnemyIndex(posTarget) === null;
    }
    
    deleteWtEnemyPositionSpawner (enemyInfo : IEnemyPositionSpawner) {
        this._mapSpawnerList[enemyInfo.spawnerIndex].deleteWtIndex(enemyInfo.monsterIndex);
        //this._enemyInfo = this._enemyList.filter((e, i) => i !== id)
    }

    deleteWtPos (posTarget : typesBase.IVec2d) {
        let positionMob = this.findEnemyIndex(posTarget);
        if (!positionMob)
            return false;
        this._mapSpawnerList[positionMob.spawnerIndex].deleteWtIndex(positionMob.monsterIndex);
        return true;
    }
    
 

    //
    gameLoop () {
        this._mapSpawnerList.map((spawner, i) => spawner.gameLoop())
    }
}

export default MobSpawnerList;