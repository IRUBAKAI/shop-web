import { PureComponent } from "react";
import * as Constans from "../utils/Constants";
import { leftArrow, rightArrow } from "../utils/Icons";

const PAGE_WIDTH = 200;

class CartComponent extends PureComponent {
  state = {
    offset: 0,
    galleryLength: "",
  };

  nextSlide = () => {
    this.setState({ offset: this.state.offset - PAGE_WIDTH });
    const maxLength = -PAGE_WIDTH * (this.props.favourite.gallery.length - 1);
    this.setState({ galleryLength: maxLength });
  };
  prevSlide = () => {
    this.setState({ offset: this.state.offset + PAGE_WIDTH });
  };

  render() {
    const styles = this.props.styles;
    const favourite = this.props.favourite;
    const currency = this.props.currency;

    const price = favourite.prices.find((price) => {
      if (price.currency === currency) {
        return price;
      } else return null;
    });
    return (
      <>
        <div>
          <div className={styles.product_block}>
            <div className={styles.info_product}>
              <h1>{favourite.brand}</h1>
              <h2>{favourite.name}</h2>
              <span className={styles.price}>
                {Constans.currencySignMap[currency]}
              </span>
              <span className={styles.price}>
                {(price.amount * favourite.qty).toFixed(2)}
              </span>
              <div className={styles.size}>
                {favourite.attr.map((attr) =>
                  attr === undefined ? null : (
                    <span className={styles.attr}>{attr}</span>
                  )
                )}
              </div>
            </div>
            <div className={styles.products_number}>
              <div className={styles.add_more_products}>
                <button
                  onClick={() => {
                    this.props.handleOnClickAdd(favourite);
                  }}
                >
                  +
                </button>
                <p>{favourite.qty}</p>
                <button
                  onClick={() => {
                    this.props.handleOnClickRemove(favourite);
                  }}
                >
                  -
                </button>
              </div>
              <div className={styles.cart_images}>
                {favourite.gallery.map((item, index) => (
                  <img
                    style={{
                      width: `${PAGE_WIDTH}px`,
                      transform: `translate(${this.state.offset}px)`,
                    }}
                    key={index}
                    className={styles.cart_image}
                    src={item}
                    alt=""
                  />
                ))}
                <button
                  disabled={this.state.offset === 0 ? true : false}
                  className={styles.btn_left_arrow}
                  onClick={() => this.prevSlide()}
                >
                  {leftArrow}
                </button>
                <button
                  disabled={
                    this.state.galleryLength === this.state.offset
                      ? true
                      : false
                  }
                  className={styles.btn_right_arrow}
                  onClick={() => this.nextSlide()}
                >
                  {rightArrow}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartComponent;
