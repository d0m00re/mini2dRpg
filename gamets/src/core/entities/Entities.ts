import * as typesBase from './../types/base.d';

class Entities {
    private _pos : typesBase.IVec2d;
    private _color : string;
    private _img : HTMLImageElement;

    private _life : number;
    private _maxLife : number;
    private _dmg : number;

    constructor (
        pos : typesBase.IVec2d,
        color : string,
        dmg : number,
        life : number,
        maxLife : number,
        img : HTMLImageElement
        ) {
      this._pos = pos;
      this._color = color;
      this._dmg = dmg;
      this._life = life;
      this._maxLife = maxLife;
      this._img = img;
    }
  
    get pos() : typesBase.IVec2d { return this._pos}
    set pos(pos : typesBase.IVec2d) {this._pos = pos}
  
    get color() : string { return this._color}
    set color(color : string) {this._color = color}
  
    get dmg() : number { return this._dmg}
    set dmg(dmg : number) {this._dmg = dmg}

    get life() : number { return this._life}
    set life(life : number) {this._life = life}

    get maxLife() : number { return this._maxLife}
    set maxLife(maxLife : number) {this._maxLife = maxLife}

    get isAlive() : boolean { return this._life < 1}

    get img() : HTMLImageElement { return this._img}
    set img(img : HTMLImageElement) {this._img = img}


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