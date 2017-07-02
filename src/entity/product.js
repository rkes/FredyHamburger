export default class Product{
    constructor(newNme,newPrce,newImgeUrl){
        this._name=newNme;
        this._price=newPrce;
        this._imageUrl=newImgeUrl;
    }
    set name(newName){
        this._name=newName;
    }
    set price(newPrice){
        this._price=newPrice;
    }
    set imageUrl(newImageUrl){
        this._imageUrl=newImageUrl;
    }
    get name(){
        return this._name;
    }
    get price(){
        return this._price;
    }
    get imageUrl(){
        return this._imageUrl;
    }
}