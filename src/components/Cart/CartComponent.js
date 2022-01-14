import { PureComponent } from "react";
import * as Constans from "../utils/Constants";
import { leftArrow, rightArrow } from "../utils/Icons";

class CartComponent extends PureComponent {
  state = {
    current: 0,
  };

  nextSlide = () => {
    const current = this.state.current;
    const galleryLength = this.props.favourite.gallery.length;
    this.setState({ current: current === galleryLength - 1 ? 0 : current + 1 });
  };
  prevSlide = () => {
    const current = this.state.current;
    const galleryLength = this.props.favourite.gallery.length;
    this.setState({ current: current === 0 ? galleryLength - 1 : current - 1 });
  };

  priceSwitcher() {
    const price = this.props.favourite.prices.find((price) => {
      if (price.currency === this.props.currency) {
        return price;
      } else return null;
    });
    return price.amount;
  }

  render() {
    const styles = this.props.styles;
    const favourite = this.props.favourite;
    const favouriteAttributes = Object.values(favourite.attr);
    return (
      <>
        <div>
          <div className={styles.product_block} id="main">
            <div className={styles.info_product}>
              <h1>{favourite.brand}</h1>
              <h2>{favourite.name}</h2>
              <span className={styles.price}>
                {Constans.currencySignMap[this.props.currency]}
              </span>
              <span className={styles.price}>
                {this.priceSwitcher().toFixed(2)}
              </span>
              <div className={styles.size}>
                {favouriteAttributes.map((attr) =>
                  attr === undefined ? null : (
                    <span
                    onClick={(e) => console.log(e.target)}
                      className={styles.attr}
                    >
                      {attr}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className={styles.products_number}>
              <div className={styles.add_more_products}>
                <button
                  onClick={() =>
                    this.props.handleOnClickAdd(
                      favourite,
                      favourite.attr.color,
                      favourite.attr.capacity,
                      favourite.attr.withUSB,
                      favourite.attr.size,
                      favourite.attr.inTouch
                    )
                  }
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
                {favourite.gallery.map((item, index) => {
                  return (
                    <>
                      {index === this.state.current && (
                        <img
                          key={index}
                          className={styles.cart_image}
                          src={item}
                          alt=""
                        />
                      )}
                    </>
                  );
                })}
                <button
                  className={
                    this.props.favourite.gallery.length > 1
                      ? styles.btn_left_arrow
                      : styles.unActive
                  }
                  onClick={() => this.prevSlide()}
                >
                  {leftArrow}
                </button>
                <button
                  className={
                    this.props.favourite.gallery.length > 1
                      ? styles.btn_right_arrow
                      : styles.unActive
                  }
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
