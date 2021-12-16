import { PureComponent } from "react";
import styles from "./Navbar.module.css";
import * as Constans from "../utils/Constants";
import axios from "axios";
import { cart } from "../utils/Icons";
import { Link } from "react-router-dom";
import MiniCart from "../Cart/MiniCart";
import logo from "../utils/logo.png";

const techHost = "http://localhost:3000/";
const clothHost = "http://localhost:3000/clothespage";

class Navbar extends PureComponent {
  state = {
    currencies: [],
    status: "unActive",
    pageUrl: window.location.href,
  };

  componentDidMount() {
    const fetchData = async () => {
      const queryResult = await axios.post(Constans.GRAPHQL_API, {
        query: Constans.GET_CATEGORY,
      });

      const result = queryResult.data.data;
      this.setState({
        currencies: result.currencies,
      });
    };
    fetchData();
  }

  statusCart() {
    if (this.state.status === "unActive") {
      this.setState({ status: "active" });
    } else this.setState({ status: "unActive" });
  }

  render() {
    let quantity = 0;
    for (let i = 0; i < this.props.favourites.length; i++) {
      quantity += this.props.favourites[i].qty;
    }
    return (
      <div>
        <div
          className={
            this.state.status === "active" ? styles.background_dark : null
          }
        ></div>
        <nav>
          <ul className={styles.nav_links}>
            <li>
              <Link
                className={
                  techHost === window.location.href ? styles.activeUrl : null
                }
                onClick={(e) => this.setState({ urlStatus: e.target.href })}
                to="/"
              >
                Tech
              </Link>
            </li>
            <li>
              <Link
                className={
                  clothHost === window.location.href ? styles.activeUrl : null
                }
                onClick={(e) => this.setState({ urlStatus: e.target.href })}
                to="/clothespage"
              >
                Clothes
              </Link>
            </li>
          </ul>

          <Link
            className={styles.nav_logo}
            to="/"
            onClick={(e) => this.setState({ urlStatus: e.target.href })}
          >
            <img className={styles.nav_logo} src={logo} alt="" />
          </Link>

          <div className={styles.nav_card}>
            <select
              className={styles.nav_select}
              onChange={(e) => this.props.updateCurrency(e.target.value)}
            >
              {this.state.currencies.map((currency, index) => (
                <option value={currency} key={index}>
                  {Constans.currencySignMap[currency]}
                </option>
              ))}
            </select>
            <span
              className={styles.nav_card_icon}
              onClick={() => this.statusCart()}
            >
              {cart}
            </span>
            <span
              className={
                quantity >= 1 ? styles.favourites_number : styles.unActive
              }
            >
              {quantity}
            </span>
            {this.state.status === "active" ? (
              <MiniCart
                attr={this.props.attr}
                quantity={quantity}
                currency={this.props.currency}
                favourites={this.props.favourites}
                handleOnClickAdd={this.props.handleOnClickAdd}
                handleOnClickRemove={this.props.handleOnClickRemove}
                styles={styles}
              />
            ) : null}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
