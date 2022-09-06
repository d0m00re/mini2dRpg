// store an array of items :
// probably should use an hash table for improving research time

interface IItemsDrop {
    itemId : number;
    dropRate : number;
}

interface IDroptable {
    id : number;
    name : string;
    items : IItemsDrop[];
}

class ItemsCollection {
    private _dropTable : IDroptable[];

    constructor () {
        this._dropTable = [];
    }

    get dropTable() : IDroptable[] { return this._dropTable}
    set dropTable(dropTable : IDroptable[]) {this._dropTable = dropTable}

    findDropTableWithId = (id : number) : IDroptable | null => {
        if (id < 0 || id >= this._dropTable.length) return null;
        return this._dropTable[id];
    }

    findDropTableWithName = (name : string) : IDroptable | null => {
        let itemIndex = this._dropTable.findIndex(e => e.name === name);
        if (itemIndex === -1) return null;
        return this._dropTable[itemIndex];
    }

    push = (list : any[]) => {
        console.log("Load all drop table", list);
    }
}

export default ItemsCollection;