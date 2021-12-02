import { PureComponent } from "react";

class CartPage extends PureComponent {
  constructor() {
    super();
    this.state = {
      favourites: [],
    };
  }
  

  componentDidMount() {
    const favouriteProducts = JSON.parse(
      localStorage.getItem("shop-favourites")
    );
    this.setState({ favourites: favouriteProducts})
  }

  render() {
    console.log(this.state.favourites)
    return (
      <>
        <div></div>
      </>
    );
  }
}

export default CartPage;
