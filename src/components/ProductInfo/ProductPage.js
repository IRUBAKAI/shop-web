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
    isChecked: false,
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
        attributes: result.product.attributes,
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

  priceSwitcher() {
    const price = this.state.product.prices.find((price) => {
      if (price.currency === this.props.currency) {
        return price;
      } else return null;
    });
    return price.amount;
  }

  render() {
    const gallery = this.state.gallery;
    const product = this.state.product;
    const attributes = this.state.attributes;
    if (product.prices === undefined) return null;

    return (
      <div className={styles.content}>
        <div className={styles.main_info_block_left}>
          <ul className={styles.gallery_container}>
            {gallery.map((img) => (
              <li className={styles.images}>
                <div className={styles.images_block}>
                  <img
                    className={styles.gallery}
                    onClick={(e) => this.setState({ imageSrc: e.target.src })}
                    src={img}
                    alt="img"
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.main_img_container}>
            <div className={styles.main_img_under_container}>
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
            </div>
          </div>
        </div>
        <div className={styles.main_info_block_right}>
          <h1>{product.brand}</h1>
          <h2>{product.name}</h2>
          <div className={styles.size}>
            {attributes.map((attribute) => (
              <div className={styles.size_attribute}>
                <p>{attribute.name}:</p>
                <div className={styles.attr_items}>
                  {console.log(attribute.items)}
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
                              isChecked: e.target.checked,
                            })
                          }
                        />
                        <span
                          style={{ backgroundColor: `${item.id}` }}
                          className={styles.active_attr_input}
                        >
                          {attribute.name === "Color" ? null : item.id}
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
                {this.priceSwitcher()}
              </span>
            )}
          </div>
          <button
            disabled={
              this.state.isChecked === false
                ? true
                : product.inStock === false
                ? true
                : false
            }
            onClick={() =>
              this.props.handleOnClickAdd(
                product,
                this.state.color,
                this.state.capacity,
                this.state.withUSB,
                this.state.size,
                this.state.inTouch,
              )
            }
          >
            ADD TO CART
          </button>
          <p
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></p>
        </div>
      </div>
    );
  }
}
export default ProductPage;
