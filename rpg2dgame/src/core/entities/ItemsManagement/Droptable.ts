import imgUrlToHTMLImageElement from './../../../core/texture/imgUrlToHTMLImageElement';


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

const iLoadDataToItem = (props : IDroptable) : IDroptable => {
   // let img = imgUrlToHTMLImageElement(props.img);
    return {
        id : props.id,
        name : props.name,
        items : props.items
    }
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
            console.log("Load all items collection", list)
     
            let listItems = list.map(e => iLoadDataToItem(e));
            this._dropTable = [...this._dropTable, ...listItems]
    }

    dropSimulation = (dropTableId : number, nbRoll : number = 1) => {
        //
        let currentDropTable = this._dropTable[dropTableId];
        let itemsDrop = currentDropTable.items.map(elem => (Math.random() < elem.dropRate) ? elem.itemId : -1);
        return itemsDrop.filter(elem => elem !== -1);
    }
}

export default ItemsCollection;