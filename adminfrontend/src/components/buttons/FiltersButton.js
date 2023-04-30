import React, { Fragment } from "react";
import GeneralPopover from "../popover/GeneralPopover";
import FiltersContent from "../popover/content/FiltersContent";

const FiltersButton = () => {
  return (
    <Fragment>
      <GeneralPopover
        trigger="click"
        title="Anketleri Filtrele"
        content={<FiltersContent />}
        placement="bottom"
      >
        <button className="btn btn-dark rounded-pill">
          {" "}
          Filtrele <i class="fa-solid fa-filter"></i>
        </button>
      </GeneralPopover>
    </Fragment>
  );
};

export default FiltersButton;
