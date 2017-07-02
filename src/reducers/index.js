import { combineReducers } from 'redux';
import {CartReducer,ProductReducer} from './cart_reducer';
import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    product:CartReducer,
    AllProduct:ProductReducer,
    form:formReducer
});

export default rootReducer;
