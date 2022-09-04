import * as typesBase from "./../../core/types/base.d";

class KeyboardEventHandler {
    private _dir : typesBase.T_DIR;
  
    constructor () {
      this._dir = 'NONE'
    }

    private resetDir() {
      this._dir= 'NONE';
    }

    private setPosWtKey(event: KeyboardEvent) {
      let key = event.key;
    
      switch (key) {
        case 'ArrowUp':
          this._dir = 'TOP';
          break;
        case 'ArrowDown':
          this._dir = 'BOTTOM';
          break;
        case 'ArrowLeft':
          this._dir ='LEFT';
          break;
        case 'ArrowRight':
          this._dir = 'RIGHT';
          break;
      }
    }

    init () {
      console.log("init")
      document.addEventListener("keydown", (event: KeyboardEvent) => {
        let key = event.key;
        console.log("Turn : ", key)
      
        switch (key) {
          case 'ArrowUp':
            this._dir = 'TOP';
            break;
          case 'ArrowDown':
            this._dir = 'BOTTOM';
            break;
          case 'ArrowLeft':
            this._dir ='LEFT';
            break;
          case 'ArrowRight':
            this._dir = 'RIGHT';
            break;
        }
      })
      document.addEventListener("keyup", () => {
        this._dir= 'NONE';
      })
    }

    destroy () {
      document.removeEventListener("keydown", this.setPosWtKey);
      document.addEventListener("keyup", this.resetDir)
    }
  
    get dir() : typesBase.T_DIR {return this._dir}
    set dir(dir : typesBase.T_DIR) {this._dir = dir}
  };

  export default KeyboardEventHandler;