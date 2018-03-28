/*
  The idea of hash table to use hashFunction + limited array and buckets
  Or hashFunction + limited array and linked list

  Algorithm		Average	Worst case
    Space	  	 O(n)	   O(n)
    Search		 O(1)	   O(n)
    Insert		 O(1)	   O(n)
    Delete		 O(1)	   O(n)
*/

export class HashTable {
  constructor(limit) {
    this.storage = [];
    this.storageLimit = limit;
  }

  _hashFunction(string) {
    let hash = '';
    for (let i=0;i<string.length;i++) {
      hash += string.charCodeAt(i);
    }
    return hash;
  }

  _getIndex(key) {
    return this._hashFunction(key) % this.storageLimit;
  }

  add(key, value) {
    const index = this._getIndex(key);
    const bucket = this.storage[index];

    if (typeof bucket === "undefined") {
      this.storage[index] = [[key, value]];
    } else {
      let inserted = false;
      for (let i=0;i<bucket.length;i++) {
        if (bucket[i][0] === key) {
          this.storage[index][i][1] = value;
          inserted = true;
        }
      }

      if (!inserted) {
        this.storage[index].push([key, value]);
      }
    }
  }

  remove(key) {
    const bucketIndex = this._getIndex(key);
    const bucket = this.storage[bucketIndex];

    if (bucket && bucket.length === 1 && bucket[0][0] === key) {
      delete this.storage[bucketIndex];
    } else if (bucket && bucket.length > 1) {
      const entityIndex = indexbucket.findIndex((entity) => entity[0] === key);
      if (entityIndex > -1) {
        this.storage[bucketIndex].splice(entityIndex, 1);
      }
    }
  }

  lookup(key) {
    const bucketIndex = this._getIndex(key);
    const bucket = this.storage[bucketIndex];

    if (typeof bucket !== "undefined") {
      const entity = bucket.find((entity) => entity[0] === key);
      return entity ? entity[1] : undefined;
    }

    return;
  }
}
