import React from "react";
import { PureComponent } from "react";
import { Link } from "react-router-dom";
import styles from "./ShopPage.module.css";
import { whiteCart } from "../utils/Icons";
import * as Constans from "../utils/Constants";

class PageComponent extends PureComponent {

  render() {
    const isFavourite = Boolean(
      this.props.favourites.find(
        (favouriteProduct) => favouriteProduct.id === this.props.product.id
      )
    );
    const price = this.props.product.prices.find((price) => {
      if (price.currency === this.props.currency) {
        return price;
      }else return null;
    });
    return (
      <>
        <div className={styles.product_block}>
          <span className={isFavourite ? styles.activeCart : styles.unActive}>
            {whiteCart}
          </span>
          <Link
            className={styles.product_text_decoration}
            to={`/productpage/${this.props.product.id}`}
            key={this.props.index}
          >
            <img src={this.props.product.gallery[0]} alt="" />
            <p>{this.props.product.name}</p>
            <div className={styles.product_currency}>
              <span>{Constans.currencySignMap[this.props.currency]}</span>
              <span>{price.amount}</span>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

export default PageComponent;
