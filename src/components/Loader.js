import React from "react";
import Loadr from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <Loadr type="Puff" color="#00BFFF" height={100} width={100} />
    </div>
  );
};

export default Loader;
