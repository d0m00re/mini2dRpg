import Player from './../../core/entities/Player';
import Enemy from './../../core/entities/Enemy';
import C_CONFIG from './../../config/baseconfig';

class GlobalGameObject {
    private _player : Player;
    private _enemyList : Enemy[];
    private _map2d : number[][];

    constructor () {
        this._player = new Player({ x: 5, y: 5 }, 'green', C_CONFIG.PLAYER.PLAYER_DMG, C_CONFIG.PLAYER.PLAYER_INIT_LIFE, C_CONFIG.PLAYER.PLAYER_MAX_LIFE, C_CONFIG.PLAYER.PLAYER_SKIN);
        this._enemyList = [];
        this._map2d = [[0,0,0,0]]
    }

    /*
    get () : any { return this._}
    set ( : any) {this._ = }
    */

    get player() : Player { return this._player}
    set player(player : Player) {this._player = player}

    get enemyList() : Enemy[] { return this._enemyList}
    set enemyList(enemyList : Enemy[]) {this._enemyList = enemyList}

    get map2d() : number[][] { return this._map2d}
    set map2d(map2d : number[][]) {this._map2d = map2d}

    // create an enemylist class

    // add an anemy
    addEnemy(enemy : Enemy){
        this._enemyList.push(enemy);
    }

    // remove an enemy
    removeEnemy(id : number) {
        this._enemyList = this._enemyList.filter((e, i) => i !== id);
    }
}

export default GlobalGameObject;