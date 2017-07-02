import React,{Component} from 'react';
import {connect} from 'react-redux';
import AddressForm from './customer_address';
import Submit from './submit_payment';
class CheckOut extends  Component {

    constructor(props){
        super(props);
        this.produtSummary=[];
        this.addElem=false;
        this.renderCheckOutProduct=this.renderCheckOutProduct.bind(this);
        this.handlePayment=this.handlePayment.bind(this);
    }
    handlePayment(){
        const productNames=this.props.product.map((product)=>product.name);
        Submit(this.props.form.CustomerAddress.values);
        Submit(this.produtSummary);
    }
    renderCheckOutProduct(){
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
            let productElemObj=productElem;
            productElemObj={
                name:name,
                price:productElem.product.price,
                freq:productElem.freq
            };
            if(!this.addElem)
                this.produtSummary.push(productElemObj);
            let listElem=<li className="list-group-item">{name}  Price :{productElem.product.price}$  X {productElem.freq}
            </li>;
            listArrays.push(listElem);
        }
        this.addElem=true;
        return (
            <ul className="list-group list-group-flush">
                { listArrays}
            </ul>
        );

    }
    render(){

        return (
            <div>
            <div className="col-md-6 pull-right">
                <AddressForm/>
            </div>
            <div className="col-md-6 pull-right">
            <div className="card cart_card" >
                <img className="card-img-top product_img" src='/images/cart.jpg' alt="Card image cap">
                    <div className="card-block">
                        <h4 className="card-title">Fredy Shop Cart</h4>
                        <p className="card-text">Current Food Items in cart</p>:
                    </div>
                    {this.renderCheckOutProduct()}
                    <div className="card-block">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Total Sum
                                    : {_.sum(this.props.product.map(product => product.price))}$
                                </li>
                            </ul>
                     <button type="button" className="btn btn-primary btn-success pull-right" onClick={this.handlePayment}>

                                Proceed to payment for Given Address
                     </button>

                    </div>
                </img>
            </div>
        </div>
      </div>
        );
    }
}
function mapStateToProps({product,form}){
    return ({product,form});
}
export default connect(mapStateToProps)(CheckOut);