import React from "react";
import { Pagination as AntdPagination } from "antd";

interface PaginationProps {
  current: any;
  pageSize: number;
  onChange: any;
  total: number;
  prevIcon: any;
  nextIcon: any;
}

const Pagination = ({
  current,
  pageSize,
  onChange,
  total,
  prevIcon,
  nextIcon,
}: PaginationProps) => {
  return (
    <AntdPagination
      current={current}
      pageSize={pageSize}
      onChange={onChange}
      total={total}
      prevIcon={prevIcon}
      nextIcon={nextIcon}
    />
  );
};

export default Pagination;
