import * as imgPlayer from './../core/texture/playerTexture';


const C_CONFIG = {
    PLAYER : { 
      PLAYER_INIT_LIFE : 100,
      PLAYER_MAX_LIFE : 100,
      PLAYER_DMG : 2,
      PLAYER_SKIN : imgPlayer.player1
    }, 
    MAP_CONFIG : {
      MAP_HOME : {
        NB_MOBS : 5,
        MOB_GENERATOR : [() => {}, () => {}],
      }
    },
    GAME_CONFIG : {
      FOV : {x : 15, y : 10}
    }
  }

export default C_CONFIG;