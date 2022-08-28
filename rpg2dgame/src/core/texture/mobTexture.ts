//import _floor2 from '/floor2.jpg';
//import _floorMaze from '/floorMaze.jpg';

// JSON TEXTURE
//interface IJSONTexture {
//    label : string;
//    url : string;
//}
//

// minimal texture system without good generation

import imgUrlToHTMLImageElement from './imgUrlToHTMLImageElement';

let mob1 = imgUrlToHTMLImageElement('/entities/mob/mob1.png');
let mob2 = imgUrlToHTMLImageElement('/entities/mob/mob2.png');
 
export {
    mob1,
    mob2,
 }