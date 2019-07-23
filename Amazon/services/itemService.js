const electronicitems=require('../db/electronic')

class ItemServices{
    constructor(){
        this.electronicitems=electronicitems;
    }
    _all(){
        return this.electronicitems;
    }
}

module.exports=ItemServices