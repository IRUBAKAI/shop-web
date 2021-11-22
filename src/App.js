import React, { PureComponent } from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ShopPage from "./components/ShopPage";
import ProductPage from './components/ProductPage'

class App extends PureComponent {
  render() {
    return (
      <>
        <Router>
          <ShopPage/>
          <Route></Route>
          <ProductPage/>
        </Router>
      </>
    )
  }
}

export default App
