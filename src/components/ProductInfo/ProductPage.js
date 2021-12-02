import { PureComponent } from "react";
import axios from "axios";
import * as Constans from "../utils/Constants";
import styles from "./ProductPage.module.css";

class ProductPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      product: {},
      gallery: [],
      prices: [],
      favourites: [],
    };
  }

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

   handleOnClickAdd() {
    const newFavouriteList = [...this.state.favourites, this.state.product];
    const saveToLocalStorage = () => {
      localStorage.setItem("shop-favourites", JSON.stringify(this.state.product));
    };

    saveToLocalStorage(newFavouriteList);
    this.setState({ favourites: newFavouriteList });
  }

   handleOnClickRemove() {
    const newFavouriteList = this.state.favourites.filter((favourite) => {
      return favourite.id !== this.state.product.id;
    });
    const saveToLocalStorage = () => {
      localStorage.setItem("shop-favourites", JSON.stringify(this.state.product));
    };
    this.setState({ favourites: newFavouriteList });
    saveToLocalStorage(newFavouriteList);
  }

  render() {
    const fav = JSON.parse(localStorage.getItem("shop-favourites"));
      console.log(fav)
    const gallery = this.state.gallery;
    if (this.state === null) {
      return [];
    }
    const isFavourite = Boolean(
      this.state.favourites.find(
        (favouriteProduct) => favouriteProduct.id === this.state.product.id
      )
    );

    return (
      <div className={styles.container}>
        <div className={styles.main_block}>
          <div className={styles.images}>
            {gallery.map((img) => (
              <img className={styles.gallery} src={img} alt="img" />
            ))}
          </div>
          <div className={styles.info_block}>
            <img
              className={styles.main_img}
              src={this.state.gallery[0]}
              alt=""
            />
            <div>
              <h1>{this.state.product.brand}</h1>
              <h2>{this.state.product.name}</h2>

              <div className={styles.prices}>
                <span>PRICE:</span>
                {this.state.prices[0] === undefined ? null : (
                  <span className={styles.price}>
                    {this.state.prices[0].currency}
                    {this.state.prices[0].amount}
                  </span>
                )}
              </div>
              <button
                    onClick={
                      !isFavourite
                        ? () => this.handleOnClickAdd()
                        : () => this.handleOnClickRemove()
                    }
                  >
                    {!isFavourite
                      ? "ADD TO CART"
                      : "DELETE FROM CART"}
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
