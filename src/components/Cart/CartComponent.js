import { PureComponent } from "react";
import {currencySignMap} from "../utils/Constants";
import { leftArrow, rightArrow } from "../utils/Icons";
import AttributeComponent from "./AttributeComponent";


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
    if (price.amount >= 1000) return Math.trunc(price.amount).toLocaleString();
    return price.amount.toFixed(0);
  }

  render() {
    const styles = this.props.styles;
    const favourite = this.props.favourite;
    const attribute = favourite.attr;
    return (
      <>
        <div key={this.props.index}>
          <div className={styles.product_block}>
            <div className={styles.info_product}>
              <h1>{favourite.brand}</h1>
              <h2>{favourite.name}</h2>
              <span className={styles.price}>
                {currencySignMap[this.props.currency]}
              </span>
              <span className={styles.price}>{this.priceSwitcher()}</span>
              <div className={styles.size}>
                {Object.keys(attribute).map((attr, index) => (
                  <AttributeComponent
                    attr={attr}
                    favourite={favourite}
                    styles={styles}
                    attribute={attribute}
                    index={index}
                  />
                ))}
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
