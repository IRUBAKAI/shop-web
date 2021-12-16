import React, { PureComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TechPage } from "./components/MainPages";
import { ClothesPage } from "./components/MainPages";
import { Navbar } from "./components/Navbar";
import { GetId } from "./components/ProductInfo";
import CartPage from "./components/Cart/CartPage";
import * as Constans from "./components/utils/Constants";
import axios from "axios";
import Checkout from "./components/Cart/Checkout";
import FinishPage from "./components/Cart/FinishPage";

class App extends PureComponent {
  state = {
    favourites: [],
    categories: [],
    clothes: [],
    tech: [],
    currency: "USD",
  };

  handleOnClickAdd = (product, color, capacity, withUSB, size, inTouch) => {
    const exist = this.state.favourites.find((x) => x.id === product.id);
    if (exist) {
      this.setState({
        favourites: this.state.favourites.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        ),
      });
    } else
      this.setState({
        favourites: [
          ...this.state.favourites,
          {
            ...product,
            qty: 1,
            attr: [color, capacity, size, withUSB, inTouch]
          },
        ],
      });
  };

  handleOnClickRemove = (product) => {
    const exist = this.state.favourites.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      this.setState({
        favourites: this.state.favourites.filter((x) => x.id !== product.id),
      });
    } else {
      this.setState({
        favourites: this.state.favourites.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        ),
      });
    }
  };

  componentDidMount() {
    const fetchData = async () => {
      const queryResult = await axios.post(Constans.GRAPHQL_API, {
        query: Constans.GET_CATEGORY,
      });

      const result = queryResult.data.data;
      this.setState({
        categories: result.categories,
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
            handleOnClickAdd={this.handleOnClickAdd}
            handleOnClickRemove={this.handleOnClickRemove}
          />
          <Routes>
            <Route
              path="/"
              element={
                <TechPage
                  currency={this.state.currency}
                  favourites={this.state.favourites}
                  tech={this.state.tech}
                />
              }
            />
            <Route
              path="/clothespage"
              element={
                <ClothesPage
                  currency={this.state.currency}
                  favourites={this.state.favourites}
                  clothes={this.state.clothes}
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
