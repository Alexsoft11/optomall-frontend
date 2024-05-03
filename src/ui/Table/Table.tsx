import React, { useEffect, useState } from "react";
import { ColumnsType, TableLocale } from "antd/lib/table/interface";
import { Table as AntdTable } from "antd";
import {
  FilterValue,
  Key,
  SortOrder,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Link from "next/link";

type TypeType = "page" | "prev" | "next" | "jump-prev" | "jump-next";

export type TableFilterType = {
  pageIndex: number;
  pageSize: number;
  options?: any[];
  sortBy?: string;
  orderBy?: string;
  dateFrom?: string;
  dateTo?: string;
  email?: string;
  modules?: string;
};

export interface TableProps {
  locale?: TableLocale;
  loading?: boolean;
  rowKey?: string;
  saveData?: any;
  columns: ColumnsType<any>;
  dataSource?: object[];
  size?: "small" | "large" | "middle";
  rowClassName?: string;
  onRow?: any;
  onChange?: any;
  disablePagination?: boolean;
  components?: any;
  scroll?: any;
  linkProps?: {
    url: string;
    recordKey?: string;
  };
  url?: string;
  filter?: TableFilterType;
  defaultSort?: string;
  enableSelectedRow?: boolean;
  reload?: number;
  setSelectedRows?: any;
  setSelectedKeys?: any;
  rowSelectionFunction?: TableRowSelection<any>;
  pagination?: TablePaginationConfig;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex?: string;
  record: any;
  className: string;
  colSpan?: number;
}

interface SorterResult {
  order?: SortOrder;
  field?: string;
  columnKey?: Key;
}

export const Table = ({
  locale,
  loading,
  rowKey = "id",
  columns,
  dataSource,
  size,
  rowClassName,
  saveData,
  onRow,
  onChange,
  disablePagination,
  components,
  scroll,
  linkProps,
  url,
  filter,
  defaultSort = "",
  enableSelectedRow,
  reload,
  setSelectedRows,
  setSelectedKeys,
  rowSelectionFunction,
}: TableProps) => {
  const [innerData, setInnerData] = useState<any>(dataSource || []);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<string | undefined>(defaultSort);
  const [orderBy, setOrderBy] = useState<string>("");
  const [localPagination, setLocalPagination] = useState<any>({
    showSizeChanger: false,
    showQuickJumper: false,
  });

  useEffect(() => {
    setInnerData(dataSource);
  }, [dataSource]);

  const { refetch, isLoading } = useQueryApiClient({
    request: {
      url: url || "",
      data: {
        pageIndex: currentPage,
        pageSize: pageSize,
        options: [],
        sortBy: sortBy,
        orderBy: orderBy,
        dateFrom: filter?.dateFrom,
        dateTo: filter?.dateTo,
        email: filter?.email,
        modules: filter?.modules,
      },
      disableOnMount: true,
    },
    onSuccess: (response) => {
      setInnerData(response.data.items);
      saveData?.(response.data.items);
      setCurrentPage(response.data.pageIndex);
      setLocalPagination({
        ...localPagination,
        // lastPage: response.lastPage,
        current: response.data.pageIndex,
        total: response.data.totalItems,
      });
    },
  });

  // useEffect(() => {
  //   if (url) {
  //     refetch();
  //   }
  // }, [pageSize, sortBy, currentPage, orderBy, filter, reload]); // eslint-disable-line react-hooks/exhaustive-deps

  // if (!locale) {
  //   locale = {
  //     emptyText: intl.formatMessage({ id: 'general.found_no_data' }),
  //     filterConfirm: intl.formatMessage({ id: 'general.filter' }),
  //     filterReset: intl.formatMessage({ id: 'general.clear' }),
  //   };
  // }

  // function itemRender(current: number, type: TypeType, originalElement: React.ReactElement<HTMLElement>) {
  //   if (type === 'prev') {
  //     return <button className="pagination-left-button">{intl.formatMessage({ id: 'previous' })}</button>;
  //   }

  //   if (type === 'next') {
  //     return <button className="pagination-right-button">{intl.formatMessage({ id: 'next' })}</button>;
  //   }

  //   return originalElement;
  // }

  // const pagination = {
  //   showSizeChanger: true,
  //   showQuickJumper: true,
  //   pageSizeOptions: [10],
  //   defaultPageSize: 10,
  //   itemRender: itemRender,
  // };

  const element = document.getElementsByClassName(
    "anticon anticon-down ant-select-suffix"
  );

  element[0]?.classList?.add("far");
  element[0]?.classList?.add("fa-angle-down");
  element[0]?.classList?.remove("anticon");
  element[0]?.classList?.remove("anticon-down");
  element[0]?.classList?.remove("ant-select-suffix");

  const EditableCell: React.FC<EditableCellProps> = ({
    record,
    children,
    className,
    ...rest
  }) => {
    // actions dont have link
    if (rest.dataIndex === "id" || rest.dataIndex === undefined) {
      return (
        <td className={className} colSpan={rest.colSpan}>
          {children}
        </td>
      );
    }

    let parsedProps = {
      url: linkProps?.url,
      recordKey: linkProps?.recordKey,
    };

    //default key is id
    if (!parsedProps?.recordKey) {
      parsedProps.recordKey = "id";
    }

    // for data not found
    if (rest.colSpan) {
      parsedProps.url = undefined;
    }

    if (!linkProps?.url) {
      return (
        <td className={className} colSpan={rest.colSpan}>
          {children}
        </td>
      );
    }

    return (
      <td className={className + " history-clickable"} colSpan={rest.colSpan}>
        <Link
          href={linkProps.url.replace(
            ":id",
            record?.[parsedProps.recordKey] || "undefined"
          )}
        >
          {children}
        </Link>
      </td>
    );
  };

  const parsedColumns = columns.map((col: any) => {
    if (components) {
      return { ...col };
    }

    return {
      ...col,
      onCell: (record: object) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const onTableChange = async (
    { current, pageSize }: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    { field, order }: SorterResult
  ) => {
    setPageSize(pageSize || 10);

    if (!order) {
      field = field || "";
      order = order || null;
    }

    setCurrentPage(current);
    setOrderBy(order === "descend" ? "desc" : "asc");
    setSortBy(field);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: object) => {
      setSelectedRows && setSelectedRows(selectedRows);
      setSelectedKeys && setSelectedKeys(selectedRowKeys);
    },
  };

  return (
    <>
      <AntdTable
        locale={locale}
        loading={isLoading || loading}
        rowKey={rowKey}
        columns={parsedColumns}
        dataSource={innerData}
        size={size}
        pagination={
          !disablePagination &&
          localPagination.total > 10 && { ...localPagination }
        }
        rowClassName={rowClassName}
        onRow={onRow}
        onChange={onChange || onTableChange}
        components={{
          body: {
            cell: EditableCell,
          },
          ...components,
        }}
        showSorterTooltip={false}
        scroll={scroll}
        rowSelection={
          enableSelectedRow ? rowSelectionFunction ?? rowSelection : undefined
        }
      />
    </>
  );
};
