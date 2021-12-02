import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "./ProductPage";

function GetId() {
  const { id } = useParams();

  return (
    <div>
      <ProductPage productId={id} />
    </div>
  );
}

export default GetId;
