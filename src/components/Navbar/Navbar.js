import { PureComponent } from "react";
import styles from "./Navbar.module.css";
import * as Constans from "../Constants";
import axios from "axios";
import { logo, card } from "../Icons";
import { Link } from "react-router-dom";

class Navbar extends PureComponent {
  constructor() {
    super();
    this.state = {
      currencies: [],
      currency: [],
    };
  }

  componentDidMount() {
    const fetchData = async () => {
      const queryResult = await axios.post(Constans.GRAPHQL_API, {
        query: Constans.GET_CATEGORY,
      });

      const result = queryResult.data.data;
      this.setState({
        categories: result.categories,
        currencies: result.currencies,
      });
    };

    fetchData();
  }

  render() {
    return (
      <div>
        <nav>
          <ul className={styles.nav_links}>
            <li>
              <a href="/">Women</a>
            </li>
            <li>
              <a href="/">Men</a>
            </li>
            <li>
              <a href="/">Kids</a>
            </li>
          </ul>

          <span className={styles.nav_logo}>
            <Link to="/">{logo}</Link>
          </span>

          <div className={styles.nav_card}>
            <select className={styles.nav_select}>
              {this.state.currencies.map((currency, index) => {
                return (
                  <option value={currency} key={index}>
                    {currency}
                  </option>
                );
              })}
            </select>
            <span className={styles.nav_card_icon}>{card}</span>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
