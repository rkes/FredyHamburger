import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import InfiniteGrid from 'react-infinite-grid';
import {getProducts,getProductsWithQuantity,upateCart} from '../actions/index';

class ProductList extends  Component {
    constructor(props) {
        super(props);
        this.state = {products: []};
        var products = this.props.getProductsWithQuantity();
        this.state.products = products;
        this.addtoCart=this.addtoCart.bind(this);
    }
    addtoCart(event){
        let productDetail=this.state.products.payload[parseInt(event.target.getAttribute('data'))];
        const product=productDetail.product;
        this.props.upateCart(product);
        let prodList=this.state.products.payload;
        var pos=prodList.indexOf(productDetail);
        let prod=prodList[pos];
        prod.quantity--;
        prodList.splice(pos,1,prod);
        this.setState({payload:{products:prodList}});
    }
    showProduct(productQty,index) {
      let disabled=productQty.quantity>0?false:"disabled";
      return(
          <img className="card-img-top product_img" src={productQty.product.imageUrl} alt="Card image cap">
                    <div className="card-block">
                        <h4 className="card-title">{productQty.product.name}</h4>
                        <p className="card-text">Price : {productQty.product.price}$</p>
                        <p className="card-text">Avialiable Quantity : {productQty.quantity}</p>
                        <button type="button" className="btn btn-primary" data={index} disabled={disabled} onClick={this.addtoCart}>Add To  Cart</button>

                     </div>
           </img>
      );

}

    render() {
        return (
            <table className="col-md-6">
                <tbody>
                <tr>
                    <td>{this.showProduct(this.state.products.payload[0],0)}</td>
                    <td>{this.showProduct(this.state.products.payload[1],1)}</td>
                </tr>
                <tr>
                    <td>{this.showProduct(this.state.products.payload[2],2)}</td>
                    <td>{this.showProduct(this.state.products.payload[3],3)}</td>
                </tr>
                </tbody>
            </table>
         );
       }
}
function mapStateToProps({AllProduct}){
    return {AllProduct};
}
function mapDispatchToProps(dispatch){
    // It will set props of reducers and middleware down the line with productCart data
    return bindActionCreators({upateCart,getProductsWithQuantity},dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);