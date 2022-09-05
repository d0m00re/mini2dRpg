// store an array of items :
// probably should use an hash table for improving research time

interface IItem  {
    name : string;
    img : string;
    type : "ressource" | "items" | "jobType";
    craftReccipe : string[];
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
}

export default ItemsCollection;