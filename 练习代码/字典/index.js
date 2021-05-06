
function defaultToString(item){
    if (item === null) {
        return "NULL";
    } else if (item === undefined) {
        return "UNDEFINED";
    }else if (typeof item === 'string' || item instanceof String){
        return `${item}`;
    }
    return item.toString();
}

class ValuePair {
    constructor(key, value){
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}: ${this.value}]`;
    }
}

class Dictionary{
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] != null;
    }
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }
    remove(key) {
        if (this.haskey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair.value;
    }
    keyValues() {
        return Object.values(this.table);
    }
    keys(){
        return this.keyValues.map((item) => {
            return item.key;
        })
    }
    values() {
        return this.keyValues.map((item) => {
            return item.value;
        })
    }
}

let dic = new Dictionary();

dic.set('a', 1);
dic.set('b', 2);
dic.set(null, 3);

console.log(dic.get('a'));










