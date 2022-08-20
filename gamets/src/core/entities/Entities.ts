import * as typesBase from './../types/base.d';

class Entities {
    private _pos : typesBase.IVec2d;
    private _color : string;

    private _life : number;
    private _dmg : number;

    constructor (
        pos : typesBase.IVec2d,
        color : string,
        dmg : number,
        life : number
        ) {
      this._pos = pos;
      this._color = color;
      this._dmg = dmg;
      this._life = life;
    }
  
    get pos() : typesBase.IVec2d { return this._pos}
    set pos(pos : typesBase.IVec2d) {this._pos = pos}
  
    get color() : string { return this._color}
    set color(color : string) {this._color = color}
  
    get dmg() : number { return this._dmg}
    set dmg(dmg : number) {this._dmg = dmg}

    get life() : number { return this._life}
    set life(life : number) {this._life = life}

    futurPos(dir : typesBase.T_DIR) {
      let pos = {...(this._pos)};
      switch(dir) {
        case 'TOP':
          pos.y -= 1;
          break;
        case 'BOTTOM':
          pos.y += 1;
          break;
        case 'LEFT':
          pos.x -= 1;
          break;
        case 'RIGHT':
          pos.x += 1;
          break;
      }
      return pos;
    }
  
    moove(dir : typesBase.T_DIR) {
      this._pos = this.futurPos(dir);
    }
  }

  export default Entities;