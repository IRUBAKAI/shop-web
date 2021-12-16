import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "./ProductPage";

function GetId({
  favourites,
  handleOnClickAdd,
  handleOnClickRemove,
  currency,
}) {
  const { id } = useParams();

  return (
    <div>
      <ProductPage
        currency={currency}
        productId={id}
        favourites={favourites}
        handleOnClickAdd={handleOnClickAdd}
        handleOnClickRemove={handleOnClickRemove}
      />
    </div>
  );
}

export default GetId;
