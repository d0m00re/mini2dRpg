import imgUrlToHTMLImageElement from './imgUrlToHTMLImageElement';


// store an array of items :
// probably should use an hash table for improving research time

interface IItem  {
    id : number
    name : string;
    img : HTMLImageElement;
    type : "ressource" | "items" | "jobType" | string;
    craftRecipe : number[];
}

interface ILoadData {
    id : number;
    name : string;
    img : string;
    type : string;
    craftRecipe : number[]
}

const iLoadDataToItem = (props : ILoadData) : IItem => {
    let img = imgUrlToHTMLImageElement(props.img);
    
    return {
        id : props.id,
        name : props.name,
        img : img,
        type : props.type,
        craftRecipe : props.craftRecipe
    }
}

class ItemsCollection {
    private _itemList : IItem[];

    constructor () {
        this._itemList = [];
    }

    get player() : IItem[] { return this._itemList}
    set player(player : IItem[]) {this._itemList = player}

    findItemsWithId = (id : number) : IItem | null => {
        if (id < 0 || id >= this._itemList.length) return null;
        return this._itemList[id];
    }

    findItemsWithName = (name : string) : IItem | null => {
        let itemIndex = this._itemList.findIndex(e => e.name === name);
        if (itemIndex === -1) return null;
        return this._itemList[itemIndex];
    }

    push = (list : ILoadData[]) => {
        console.log("Load all items collection", list)
 
        let listItems = list.map(e => iLoadDataToItem(e));
        this._itemList = [...this._itemList, ...listItems]
        //for (let i = 0; i < list.length; i++) {
//
 //       }
    }
}

export default ItemsCollection;