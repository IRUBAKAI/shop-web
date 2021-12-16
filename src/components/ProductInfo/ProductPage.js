import { PureComponent } from "react";
import axios from "axios";
import * as Constans from "../utils/Constants";
import styles from "./ProductPage.module.css";

class ProductPage extends PureComponent {
  state = {
    product: {},
    gallery: [],
    prices: [],
    imageSrc: null,
    attr: { color: "", capacity: "", size: "", withUSB: "", inTouch: "" },
  };

  componentDidMount() {
    const fetchDataId = async () => {
      const queryResult = await axios.post(Constans.GRAPHQL_API, {
        query: `query {
          product (id: "${this.props.productId}") {
            id
            name
            inStock
            description
            gallery
            category
            brand
            prices {
                currency
                amount
            }
            attributes {
                id 
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
          }
        }`,
      });

      const result = queryResult.data.data;
      this.setState({
        product: result.product,
        gallery: result.product.gallery,
        prices: result.product.prices,
      });
    };
    fetchDataId();
  }

  attributeName(attrName) {
    if (attrName === "Color") return "color";
    if (attrName === "Size") return "size";
    if (attrName === "Capacity") return "capacity";
    if (attrName === "With USB 3 ports") return "withUSB";
    if (attrName === "Touch ID in keyboard") return "inTouch";
  }

  render() {
    const gallery = this.state.gallery;
    const isFavourite = Boolean(
      this.props.favourites.find(
        (favouriteProduct) => favouriteProduct.id === this.state.product.id
      )
    );
    if (this.state.product.prices === undefined) {
      return null;
    }
    const price = this.state.product.prices.find((price) => {
      if (price.currency === this.props.currency) {
        return price;
      } else return null;
    });
    return (
      <div className={styles.content}>
        <div className={styles.main_block}>
          <div className={styles.images}>
            {gallery.map((img) => (
              <img
                className={styles.gallery}
                onClick={(e) => this.setState({ imageSrc: e.target.src })}
                src={img}
                alt="img"
              />
            ))}
          </div>
          <div className={styles.info_block}>
            <div className={styles.main_img_block}>
              <img
                className={styles.main_img}
                src={
                  this.state.imageSrc === null
                    ? this.state.gallery[0]
                    : this.state.imageSrc
                }
                alt=""
              />
            </div>
            <div className={styles.product_info}>
              <h1>{this.state.product.brand}</h1>
              <h2>{this.state.product.name}</h2>
              <div className={styles.size}>
                {this.state.product.attributes.map((attribute) => (
                  <div className={styles.size_attribute}>
                    <p>{attribute.name}:</p>
                    <div className={styles.attr_items}>
                      {attribute.items.map((item) => (
                        <div className={styles.attr_item}>
                          <label>
                            <input
                              className={styles.unActive}
                              type="radio"
                              name={this.attributeName(attribute.name)}
                              value={item.id}
                              onClick={(e) =>
                                this.setState({
                                  [e.target.name]: e.target.value,
                                })
                              }
                            />
                            <span className={styles.active_attr_input}>
                              {item.id}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.prices}>
                <span>PRICE:</span>
                {this.state.prices[0] === undefined ? null : (
                  <span className={styles.price}>
                    {Constans.currencySignMap[this.props.currency]}
                    {price.amount}
                  </span>
                )}
              </div>
              <button
                onClick={
                  !isFavourite
                    ? () =>
                        this.props.handleOnClickAdd(
                          this.state.product,
                          this.state.color,
                          this.state.capacity,
                          this.state.withUSB,
                          this.state.size,
                          this.state.inTouch,
                          this.props.favourites
                        )
                    : () => this.props.handleOnClickRemove(this.state.product)
                }
              >
                {!isFavourite ? "ADD TO CART" : "DELETE FROM CART"}
              </button>
              <p>{this.state.product.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProductPage;
