import React from "react";

import ButtonToAdd from "../Button/ButtonToAdd";

export default function Toolbar() {
  return (
    <div className="row">
      <div className="col-12 mb-4 text-center">
        <ButtonToAdd />
        {/* possible search button */}
      </div>
    </div>
  );
}
