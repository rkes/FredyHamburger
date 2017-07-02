import {SELECTED_PRODUCT,REMOVE_PRODUCT,ALL_PRODUCTS} from '../actions/index';
export  function CartReducer(state=[],action){
    switch(action.type){
        case  SELECTED_PRODUCT:
                return updateQuantity(action,state);
        case REMOVE_PRODUCT:
                return removeProduct(state,action.payload);
    }

    return state;
}
export function ProductReducer(state=[],action){
    console.log();
    switch(action.type) {
        case ALL_PRODUCTS:
            return [action.payload, ...state];
        case  REMOVE_PRODUCT:
            return returnProductToInventory(state,action.payload);
    }
    return state;
}
function returnProductToInventory(state,product){
    let updtatedState=[];
    let finalUpdtatedState=[];
    for(let stateElem of state[0]){
        let productElem=stateElem;
        if(stateElem.product.name==product){
            productElem.quantity=10;
        }
        updtatedState.push(productElem);
    }
    finalUpdtatedState.push(updtatedState);
    return finalUpdtatedState;
}
function updateQuantity(action,state){
    console.log(state);
    console.log(action.payload);
    return [action.payload,...state];
}
function removeProduct(state,product){
    let updtatedState=[];
    //console.log(product);
    for(let stateElem of state){
        if(stateElem.name!=product)
            updtatedState.push(stateElem);
    }
    return updtatedState;
}