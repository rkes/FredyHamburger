import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfiniteGrid from 'react-infinite-grid';
import {getProducts} from '../actions/index';
import {removeProduct,ProductReducer} from '../actions/index';
import {Link} from 'react-router';
class CartContainer extends  Component {

    constructor(props){
        super(props);
        this.totalSum=_.sum(this.props.product.map(product=>product.price));
        this.renderCart=this.renderCart.bind(this);
        this.renderProducts=this.renderProducts.bind(this);
        this.removeProductFromCart=this.removeProductFromCart.bind(this);
    }
    removeProductFromCart(event){
        const prodName=event.target.getAttribute('data-prod');
        this.props.removeProduct(prodName);
    }
    renderProducts(){
        let productList=[];
        let products=[];
        let listArrays=[];
        const productNamePriceMap=this.props.product.map((product)=>
            productList[product.name]={price:product.price});
        const productNames=this.props.product.map((product)=>product.name);
        productNames.sort();
        let productNamess=[];
        for (let name of productNames) {
            let freq = products[name]==undefined?0:products[name].freq;
            if (freq == 0) {
                freq = 1;
                productNamess.push(name);
            }
            else
                freq++;
            products[name] = {product: productList[name], freq: freq};
        }

        productNamess.sort();
        for (let name of productNamess){
            let productElem=products[name];
            let listElem=<li className="list-group-item">{name}  Price :{productElem.product.price}$  X {productElem.freq}
            <a href="#"><img className="delete_product_button" data-prod={name} onClick={this.removeProductFromCart} src='/images/recyclebin.png'/></a>

            </li>;
            listArrays.push(listElem);
        }
        return (
            <ul className="list-group list-group-flush">
                { listArrays}
            </ul>
        );


    }
    renderCart(product){
        return (
            <li className="list-group-item">{product.product.name}  Price : {product.product.price}$ </li>
        );
    }
    render(){
        return(
            <div className="col-md-6 pull-right">
                <div className="card cart_card" >
                    <img className="card-img-top product_img" src='/images/cart.jpg' alt="Card image cap">
                        <div className="card-block">
                            <h4 className="card-title">Fredy Shop Cart</h4>
                            {
                                this.props.product.length > 0?
                                <p className="card-text">Current Food Items in cart</p>:
                                <p className="card-text">Cart is Empty add Item</p>
                            }
                        </div>
                        {this.renderProducts()}
                      <div className="card-block">
                            {
                                this.props.product.length > 0 &&
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">Total Sum
                                            : {_.sum(this.props.product.map(product => product.price))}$
                                        </li>
                                    </ul>
                            }
                              {
                                  this.props.product.length > 0
                                  &&
                                  <Link to="/checkout/cart" className="btn btn-primary btn-success pull-right">
                                  <span className="fa fa-shopping-cart">
                                     </span>&nbsp;Checkout
                                  </Link>
                              }
                      </div>
                    </img>
                </div>
            </div>

        );
    }

}
function mapStateToProps({product}){
    return {product};
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({removeProduct,ProductReducer},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(CartContainer);