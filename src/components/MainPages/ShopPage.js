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
            <h1>{this.props.product.name}</h1>
          </div>
          <section>
            <ul className={styles.product}>
              {this.props.product.products === undefined
                ? null
                : this.props.product.products.map((product) => (
                    <PageComponent
                      currency={this.props.currency}
                      favourites={this.props.favourites}
                      product={product}
                      handleOnClickAdd={this.props.handleOnClickAdd}
                    />
                  ))}
            </ul>
          </section>
        </div>
      </>
    );
  }
}

export default ShopPage;
