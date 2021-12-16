import React from "react";
import styles from "./ShopPage.module.css";
import { PureComponent } from "react";
import PageComponent from "./PageComponent";

class ShopPage extends PureComponent {
  render() {
    return (
      <>
      <div className={styles.content}>
        <div className={styles.category_name}>
          <h1>{this.props.tech.name}</h1>
        </div>
        <section className={styles.product}>
          {this.props.tech.products === undefined
            ? null
            : this.props.tech.products.map((product) => (
                <PageComponent
                  currency={this.props.currency}
                  favourites={this.props.favourites}
                  product={product}
                />
              ))}
        </section>
        </div>
      </>
    );
  }
}

export default ShopPage;
