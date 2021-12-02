import React, { PureComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShopPage from "./components/ShopPage";
import { Navbar } from "./components/Navbar";
import styles from "./components/ShopPage.module.css";
import { GetId } from "./components/ProductInfo";
import MiniCart from "./components/Cart/MiniCart";
import CartPage from "./components/Cart/CartPage";

class App extends PureComponent {
  render() {
    return (
      <div className={styles.content}>
        <Router>
          <Navbar />
          <MiniCart/>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route exact path="/productpage/:id" element={<GetId />} />
            <Route exact path="/cartpage" element={<CartPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
