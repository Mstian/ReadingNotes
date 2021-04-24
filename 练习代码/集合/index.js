class Set{
    constructor() {
        this.items = {}
    }
    has(element) {
       return Object.prototype.hasOwnProperty.call(this.items, element); 
    }
    add(element) {
        if(this.has(element)) {
            return false;
        }
        this.items[element] = element;
    }
    delete(element) {
        if(this.has(element)) {
            delete this.items[element];
            return true;
        }
        return false;
    }
    clear() {
        this.items = {};
    }
    size() {
        return Object.keys(this.items).length;
    }
    values() {
        return Object.values(this.items);
    }
}

let set = new Set();
set.add(1);

set.add(2);

set.add(2);
set.delete(2);
console.log(set.values());

