import { PureComponent } from "react";
import CartComponent from "./CartComponent";
import styles from "./MiniCart.module.css";
import { Link } from "react-router-dom";
import * as Constans from "../utils/Constants";
import Pagination from "../Pagination/Pagination";

class MiniCart extends PureComponent {
  state = {
    pageUrl: "",
    currentPage: 1,
    jokesPerPage: 2,
  };

  updateCurrentPage = (value) => {
    this.setState({ currentPage: value });
  };

  render() {
    ///pagination
    const currentPage = this.state.currentPage;
    const cartPerPage = this.state.jokesPerPage;
    const favourites = this.props.favourites;
    const reducedCart = Object.values(this.props.reducedCart);

    const indexOfLastCart = currentPage * cartPerPage;
    const indexOfFirstCart = indexOfLastCart - cartPerPage;
    const currentCart = reducedCart.slice(indexOfFirstCart, indexOfLastCart);
    const howManyPages = Math.ceil(favourites.length / cartPerPage);
    ///totalPrice
    let totalPrice = 0;
    for (let i = 0; i < favourites.length; i++) {
      const price = favourites[i].prices.find((price) => {
        if (price.currency === this.props.currency) {
          return price;
        } else return null;
      });
      totalPrice += price.amount * favourites[i].qty;
    }
    return (
      <>
        <div className={styles.hover_block_cart}>
          <h2 className={styles.myBag}>
            <span>My Bag</span>, {this.props.quantity} items
          </h2>
          {currentCart.map((cart) =>
            cart.map((el) => (
              <CartComponent
                reducedCart={reducedCart}
                currency={this.props.currency}
                favourite={el}
                handleOnClickRemove={this.props.handleOnClickRemove}
                handleOnClickAdd={this.props.handleOnClickAdd}
                styles={styles}
              />
            ))
          )}

          {reducedCart.length > 2 ? (
            <Pagination
              currentCart={currentCart}
              pages={howManyPages}
              updateCurrentPage={this.updateCurrentPage}
            />
          ) : null}
          {totalPrice === 0 ? null : (
            <p className={styles.total_price}>
              Total : {Constans.currencySignMap[this.props.currency]}
              {totalPrice.toFixed(2)}
            </p>
          )}
          <Link
            to="/cartpage"
            onClick={() => this.props.updateMiniCartStatus()}
          >
            <button className={styles.cartpage_btn}>VIEW BAG</button>
          </Link>
          <Link to="/checkout">
            <button
              disabled={favourites.length === 0 ? true : false}
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