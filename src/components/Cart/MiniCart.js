import { PureComponent } from "react";
import CartComponent from "./CartComponent";
import styles from "./MiniCart.module.css";
import { Link } from "react-router-dom";
import * as Constans from "../utils/Constants";

class MiniCart extends PureComponent {
  render() {
    let totalPrice = 0;
    for (let i = 0; i < this.props.favourites.length; i++) {
      const price = this.props.favourites[i].prices.find((price) => {
        if (price.currency === this.props.currency) {
          return price;
        } else return null;
      });
      totalPrice += price.amount * this.props.favourites[i].qty;
    }
    return (
      <>
        <div className={styles.hover_block_cart}>
          <h2 className={styles.myBag}>
            <span>My Bag</span>, {this.props.quantity} items
          </h2>
          {this.props.favourites.map((favourite) => (
            <CartComponent
              currency={this.props.currency}
              favourite={favourite}
              handleOnClickRemove={this.props.handleOnClickRemove}
              handleOnClickAdd={this.props.handleOnClickAdd}
              styles={styles}
            />
          ))}
          {totalPrice === 0 ? null : (
            <p className={styles.total_price}>
              Total : {Constans.currencySignMap[this.props.currency]}
              {totalPrice}
            </p>
          )}
          <Link to="/cartpage">
            <button className={styles.cartpage_btn}>VIEW BAG</button>
          </Link>
          <Link to="/checkout">
            <button
              disabled={this.props.favourites.length === 0 ? true : false}
              className={styles.cartpage_btn}
            >
              CHECK OUT
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default MiniCart;
