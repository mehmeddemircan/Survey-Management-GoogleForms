import React from "react";
import { Pagination } from "antd";
const CustomPagination = ({ onChange, current, total, pageSize }) => {
  return (
    <div className="d-flex flex-row justify-content-end">
      <Pagination
        onChange={onChange}
        defaultCurrent={1}
        current={current}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
};

export default CustomPagination;
