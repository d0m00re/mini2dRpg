import * as typesBase from "./../../core/types/base.d";

class KeyboardEventHandler {
    private _dir : typesBase.T_DIR;
  
    constructor () {
      this._dir = 'NONE'
    }
  
    get dir() : typesBase.T_DIR { return this._dir}
    set dir(dir : typesBase.T_DIR) {this._dir = dir}
  };

  export default KeyboardEventHandler;