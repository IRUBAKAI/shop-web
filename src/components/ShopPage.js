import React from "react";
import * as Constans from "./Constants";
import axios from "axios";
import { card, logo } from "./Icons";
import styles from "./ShopPage.module.css";
import { PureComponent } from "react";
import { Link } from "react-router-dom";

class ShopPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      categories: [],
      clothes: {},
      tech: {},
      currencies: [],
      currency: [],
      favourites: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      const queryResult = await axios.post(Constans.GRAPHQL_API, {
        query: Constans.GET_CATEGORY,
      });

      const result = queryResult.data.data;
      this.setState({
        categories: result.categories,
        currencies: result.currencies,
      });
    };

    fetchData();
  }

  componentDidUpdate() {
    this.state.categories.map((category) => {
      if (category.name === "clothes") {
        return this.setState({ clothes: category });
      } else return this.setState({ tech: category });
    });
  }

  render() {
    const addToFavourite = (product) => {
      const newFavouriteList = [...this.state.favourites, product];
      const saveToLocalStorage = (product) => {
        localStorage.setItem("favourite-product", JSON.stringify(product));
      };

      saveToLocalStorage(newFavouriteList);
      this.setState({ favourites: newFavouriteList });
    };

    console.log(this.state.favourites);
    return (
      <div className={styles.content}>
        <nav>
          <ul className={styles.nav_links}>
            <li>
              <a href="/">Women</a>
            </li>
            <li>
              <a href="/">Men</a>
            </li>
            <li>
              <a href="/">Kids</a>
            </li>
          </ul>

          <span className={styles.nav_logo}>{logo}</span>

          <div className={styles.nav_card}>
            <select className={styles.nav_select}>
              {this.state.currencies.map((currency, index) => {
                return (
                  <option value={currency} key={index}>
                    {currency}
                  </option>
                );
              })}
            </select>
            <span className={styles.nav_card_icon}>{card}</span>
          </div>
        </nav>

        {/* ///main */}

        <div className={styles.category_name}>
          <h1>{this.state.tech.name}</h1>
        </div>

        <section className={styles.product}>
          {this.state.tech.products === undefined
            ? null
            : this.state.tech.products.map((product, index) => (
                <div
                  className={styles.product_block}
                  key={index}
                >
                  {/* <Link
                    className={styles.product_text_decoration}
                    to={`/productpage/${product.id}`}
                  > */}
                    <img src={product.gallery[0]} alt="" />
                    <p>{product.name}</p>
                    <div className={styles.product_currency}>
                      <span>{product.prices[0].currency}</span>
                      <span>{product.prices[0].amount}</span>
                    </div>
                  {/* </Link> */}
                </div>
              ))}
        </section>
      </div>
    );
  }
}

export default ShopPage;
