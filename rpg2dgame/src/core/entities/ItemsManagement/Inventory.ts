export interface IInventoryItem {
    itemId : number;
    quantity : number;
}

class Inventory {
    _inventoryItemsList : IInventoryItem[];

    constructor () {
        this._inventoryItemsList = []
    }

    get inventoryItemsList() : IInventoryItem[] {return this._inventoryItemsList;}

    // find index - no multiple
    findIndexWtId(itemId : number) {
        return this._inventoryItemsList.findIndex(elem => elem.itemId === itemId);
    }

    // swap items
    swapItems(itemId1 : number, itemId2 : number) {
        //return this._inventoryItemsList.findIndex(elem => elem.itemId === itemId);
        let id1 = this.findIndexWtId(itemId1);
        let id2 = this.findIndexWtId(itemId2);
        let tmp = this._inventoryItemsList[id1];
        this._inventoryItemsList[id1] = this._inventoryItemsList[id2];
        this._inventoryItemsList[id2] = tmp;
    }

    // delete one
    deleteOne(itemId : number) {
        let idToDelete = this.findIndexWtId(itemId);  //this._inventoryItemsList.findIndex(elem => elem.itemId === itemId);
        if (idToDelete === -1) return false;
        this._inventoryItemsList.filter((e, id) => id !== idToDelete);
        return true;
    }

    deleteAllEmpty() {
        this._inventoryItemsList = this._inventoryItemsList.filter(e => e.quantity > 0)
    }

    // delete specific quantity
    deleteSpeQuantity(itemId : number, quantity : number) {
        let idElem = this.findIndexWtId(itemId);  //this._inventoryItemsList.findIndex(elem => elem.itemId === itemId);
        if (idElem === -1) return false;
        this._inventoryItemsList[idElem].quantity -= quantity;
        this.deleteAllEmpty();

        return true;
    }

    // add quantity
    addQuantity(itemId : number, quantity : number) {
        let idElem = this.findIndexWtId(itemId);  //this._inventoryItemsList.findIndex(elem => elem.itemId === itemId);
        if (idElem === -1) return false;
        this._inventoryItemsList[idElem].quantity += quantity;
        return true;
    }
}

export default Inventory;