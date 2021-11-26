import { PureComponent } from "react";

class ProductPage extends PureComponent {

  render() {
    const{product} = this.props
    console.log(product)
    return (
      <div>
        {/* <h1>{product}</h1> */}
      </div>
    );
  }
}
export default ProductPage
