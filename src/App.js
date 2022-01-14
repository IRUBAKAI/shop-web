import React, { PureComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopPage } from "./components/MainPages";
import { Navbar } from "./components/Navbar";
import { GetId } from "./components/ProductInfo";
import CartPage from "./components/Cart/CartPage";
import * as Constans from "./components/utils/Constants";
import axios from "axios";
import Checkout from "./components/Cart/Checkout";
import FinishPage from "./components/Cart/FinishPage";
import _ from "lodash";

class App extends PureComponent {
  state = {
    favourites: [],
    categories: [],
    clothes: [],
    tech: [],
    currency: "USD",
  };

  handleOnClickAdd = (product, color, capacity, withUSB, size, inTouch) => {
    this.setState({
      favourites: [
        ...this.state.favourites,
        {
          ...product,
          qty: 1,
          attr: { color, capacity, size, withUSB, inTouch },
        },
      ],
    });
  };

  handleOnClickRemove = (product) => {
    const reducedCart = Object.values(this.reduceFav());
    for (let i = 0; i < reducedCart.length; i++) {
      let exist = reducedCart[i].find(
        (x) => JSON.stringify(x.attr) === JSON.stringify(product.attr)
      );
      if (exist.qty === 1) {
        this.setState({
          favourites: this.state.favourites.filter(
            (x) => JSON.stringify(x.attr) !== JSON.stringify(exist.attr)
          ),
        });
      }
    }
  };

  reduceFav = () => {
    const clonedCart = _.cloneDeep(this.state.favourites);
    const reduced = clonedCart.reduce((acc, item) => {
      const itemAttr = Object.values(item.attr).map((key) => {
        return key;
      });
      if (!acc[itemAttr]) {
        acc[itemAttr] = [];
        acc[itemAttr].push(item);
      } else {
        acc[itemAttr].forEach((el) => el.qty++);
      }
      return acc;
    }, {});
    return reduced;
  };

  componentDidMount() {
    const getCategoryFromGraph = async () => {
      const queryResult = await axios.post(Constans.GRAPHQL_API, {
        query: Constans.GET_CATEGORY,
      });

      const result = queryResult.data.data;
      this.setState({
        categories: result.categories,
      });
    };

    getCategoryFromGraph();
  }

  componentDidUpdate() {
    this.state.categories.map((category) => {
      if (category.name === "clothes") {
        return this.setState({ clothes: category });
      } else return this.setState({ tech: category });
    });
  }

  updateCurrency = (value) => {
    this.setState({ currency: value });
  };

  render() {
    return (
      <Router>
        <Navbar
          updateCurrency={this.updateCurrency}
          currency={this.state.currency}
          favourites={this.state.favourites}
          reducedCart={this.reduceFav()}
          handleOnClickAdd={this.handleOnClickAdd}
          handleOnClickRemove={this.handleOnClickRemove}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ShopPage
                currency={this.state.currency}
                favourites={this.state.favourites}
                product={this.state.tech}
                handleOnClickAdd={this.handleOnClickAdd}
              />
            }
          />
          <Route
            exact
            path="/clothespage"
            element={
              <ShopPage
                product={this.state.clothes}
                currency={this.state.currency}
                favourites={this.state.favourites}
                handleOnClickAdd={this.handleOnClickAdd}
              />
            }
          />
          <Route
            exact
            path="/productpage/:id"
            element={
              <GetId
                currency={this.state.currency}
                favourites={this.state.favourites}
                handleOnClickAdd={this.handleOnClickAdd}
                handleOnClickRemove={this.handleOnClickRemove}
              />
            }
          />
          <Route
            exact
            path="/cartpage"
            element={
              <CartPage
                attr={this.state.attr}
                currency={this.state.currency}
                favourites={this.state.favourites}
                reducedCart={this.reduceFav()}
                handleOnClickAdd={this.handleOnClickAdd}
                handleOnClickRemove={this.handleOnClickRemove}
              />
            }
          />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/finishpage" element={<FinishPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
