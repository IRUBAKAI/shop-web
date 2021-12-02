import React from "react";
import * as Constans from "./utils/Constants";
import axios from "axios";
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
    return (
      <>
        <div className={styles.category_name}>
          <h1>{this.state.tech.name}</h1>
        </div>
        <section className={styles.product}>
          {this.state.tech.products === undefined
            ? null
            : this.state.tech.products.map((product, index) => (
                <div className={styles.product_block} key={index}>
                  <Link
                    className={styles.product_text_decoration}
                    to={`/productpage/${product.id}`}
                  >
                    <img src={product.gallery[0]} alt="" />
                    <p>{product.name}</p>
                    <div className={styles.product_currency}>
                      <span>{product.prices[0].currency}</span>
                      <span>{product.prices[0].amount}</span>
                    </div>
                  </Link>
                </div>
              ))}
        </section>
      </>
    );
  }
}

export default ShopPage;
