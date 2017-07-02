import Product from '../entity/product';

export const SELECTED_PRODUCT='SELECTED_PRODUCT';
export const ALL_PRODUCTS='ALL_PRODUCTS';
export const REMOVE_PRODUCT='REMOVE_PRODUCT';

var productCatalog=getAllProducts();
var productCatalogWithQuantity=getProductsCatalogWithQuantity(10);

export function upateCart(product){
    return {
        type:SELECTED_PRODUCT,
        payload:product
    };
}
export function getProducts(){
    //console.log(productCatalogWithQuantity);
    return {
        type:ALL_PRODUCTS,
        payload:productCatalog
    };
}
export function getProductsWithQuantity(){

    return {
        type:ALL_PRODUCTS,
        payload:productCatalogWithQuantity
    };
}
export function removeProduct(product){
    return {
        type:REMOVE_PRODUCT,
        payload:product
    };
}
export function setProductQuantity(productName,quantity){

}
function setProductQuantity(){

}
function getProductsCatalogWithQuantity(intialQuantityForAllProduct){
    let productWithQuantity=[];
    productWithQuantity=productCatalog.map((product)=>{
            let prodWithQuantity= {
                product:product,
                quantity:intialQuantityForAllProduct
            };
            return prodWithQuantity;
    }  );

    return  productWithQuantity;
}
function getAllProducts(){
    var products=new Array();
    var pepsi=new Product('Pepsi','30','/images/pepsi.jpg');
    var haburger=new Product('Hamburger','40','/images/hamburger.jpg');
    var fries=new Product('Fries','20','/images/Fries.jpg');
    var coke=new Product('Coke','20','/images/coke.jpg');
    products.push(pepsi);
    products.push(haburger);
    products.push(fries);
    products.push(coke);
    return products;
}