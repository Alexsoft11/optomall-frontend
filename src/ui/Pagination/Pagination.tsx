import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import type { PaginationProps } from 'antd';

const Pagination = ({ current, pageSize, onChange, total, prevIcon, nextIcon }: PaginationProps) => {
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
