import { PureComponent } from "react";
import React from "react";
const src =
  "https://www.epschool.org/wp-content/uploads/2021/08/Congratulations.jpg";

class FinishPage extends PureComponent {
  render() {
    return (
      <>
        <div>
          <img
            style={{ width: "100%", backgroundSize: "cover" }}
            src={src}
            alt=""
          />
        </div>
      </>
    );
  }
}

export default FinishPage;
