import Entities from './Entities';
import * as typesBase from './../types/base.d';



// calcul current level
/*
const calculCurrentLevel = (xp : number, currentLevel : number,  xpBase : number, xpPercentIncreaseByLevel : number) => {
        if (xp < xpBase) {
            return currentLevel;
        }
        // next level :
        while (xp < xpBase) {
            currentLevel++;

        }
        return 0;
}
*/

/*
** class who process xp operation information
*/

interface IXp {
    xpBase: number;
    xpPercentIncreaseByLevel: number;
}

class Xp {
    private _xpBase: number;
    private _xpPercentIncreaseByLevel: number;

    constructor(props: IXp) {
        this._xpBase = props.xpBase;
        this._xpPercentIncreaseByLevel = props.xpPercentIncreaseByLevel;
    }

    getInfoCurrentLevel(xp: number): { level: number, currXpNextLevel: number } {
        let level = 0;
        let currXpNextLevel = this._xpBase;

        // todo : should be rewrite later because that d ont get correct xp formula
        console.log("BAD THING HAPPENDS")
        console.log(`${currXpNextLevel} < ${xp}`)
        while (currXpNextLevel < xp) {
            level++;
           // currXpNextLevel += (this._xpBase);
           currXpNextLevel = currXpNextLevel + currXpNextLevel * this._xpPercentIncreaseByLevel;
        }
        console.log({ level: level, currXpNextLevel: currXpNextLevel })
        return { level: level, currXpNextLevel: currXpNextLevel };
    }

    getLevelWithXp(xp: number): number {
        return (this.getInfoCurrentLevel(xp)).level;
    }

    getNextXpLevelUpWithXp(xp: number): number {
        return (this.getInfoCurrentLevel(xp)).currXpNextLevel;
    }
}

interface IXpPlayer {
    xpBase: number;
    xpPercentIncreseByLevel: number;
    currentXp: number;
}

class XpPlayer {
    private _Xp: Xp; // base xp mecanism
    private _currentXp: number; // current player xp
    private _nextXpLevel: number; // next xp level required
    private _level: number; // 

    constructor(props: IXpPlayer) {
        this._Xp = new Xp({ xpBase: 5, xpPercentIncreaseByLevel: 1 }); // increase by 50%
        this._currentXp = props.currentXp;

        let {level, currXpNextLevel} = this._Xp.getInfoCurrentLevel(this._currentXp);
        this._level = level;
        this._nextXpLevel = currXpNextLevel;
    }

    addXp(nbXp: number) {
        this._currentXp += nbXp;
        console.log(`${this._currentXp} >= ${this._nextXpLevel}`)
        if (this._currentXp >= this._nextXpLevel) {
            let dataFromXp = this._Xp.getInfoCurrentLevel(this._currentXp);
            this._level = dataFromXp.level;
            this._nextXpLevel = dataFromXp.currXpNextLevel;
        }
    }

    get currentXp(): number { return this._currentXp }
    set currentXp(_currentXp: number) { this._currentXp = _currentXp }

    get nextXpLevel(): number { return this._nextXpLevel }
    set nextXpLevel(_nextXpLevel: number) { this._nextXpLevel = _nextXpLevel }

    get currentLevel(): number { return this._level }
    set currentLevel(_level: number) { this._level = _level }


}
class Player extends Entities {
    public _allLevel: {
        fight: XpPlayer,
    }

    constructor(pos: typesBase.IVec2d,
        color: string,
        dmg: number,
        life: number,
        maxLife: number,
        img: HTMLImageElement) {
        super(pos, color, dmg, life, maxLife, img);
        this._allLevel = {
            fight: new XpPlayer({
                xpBase: 10,
                xpPercentIncreseByLevel: 0.5,
                currentXp: 0
            })
        }
    }
}

export default Player;