import React, { PureComponent } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShopPage from "./components/ShopPage";
import ProductPage from "./components/ProductPage";
import { Navbar } from "./components/Navbar";
import styles from "./components/ShopPage.module.css";

class App extends PureComponent {
  render() {
    return (
      <div className={styles.content}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ShopPage />} />
            <Route exact path="/productpage/:id" element={<ProductPage />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
