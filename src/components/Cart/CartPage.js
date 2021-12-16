import { PureComponent } from "react";
import styles from "./CartPage.module.css";
import CartComponent from "./CartComponent";

class CartPage extends PureComponent {
  state = {
    amount: "",
  };

  render() {
    return (
      <>
        <div className={styles.content}>
          <h1>CART</h1>
          {this.props.favourites.map((favourite) => (
            <CartComponent
              currency={this.props.currency}
              favourite={favourite}
              handleOnClickAdd={this.props.handleOnClickAdd}
              handleOnClickRemove={this.props.handleOnClickRemove}
              styles={styles}
            />
          ))}
        </div>
      </>
    );
  }
}

export default CartPage;
