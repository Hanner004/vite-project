import React from "react";

import ButtonToAdd from "../Button/ButtonToAdd";

export default function Toolbar() {
  return (
    <div className="row">
      {/* mt-4 mb-4 added in div class col-12 */}
      <div className="col-12 mt-4 mb-4 text-center">
        <ButtonToAdd />
        {/* possible search button */}
      </div>
    </div>
  );
}
