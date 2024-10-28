"use client";
import { getXlsx } from "@/API/api-reports-xlsx";
import { elements } from "chart.js";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterEvent, DataTableFilterMeta, DataTablePageEvent, DataTableSortEvent } from "primereact/datatable";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
const useUtils = require('@/app/utils')


export interface ColumnMeta {
  field: string;
  header: string;
  matchMode?: string;
  filterType: "select" | "inputText" | "inputNumber" | "date" | "check" | "none" | "actions";
  filterOption?: FilterOption[];
  dataType?: "number";
  align?: "center" | "right" | "left";
  alignHeader?: "center" | "right" | "left";
  sortField?: string;
  actions?: any
}



interface FilterOption {
  value: number | string;
  label: string;
}

interface PaginatorParams {
  rows: number,
  rowsNumber: any[],
  page: number
}

interface SharedTableFilterProps {
  dataSource: any[];
  tableColumns: ColumnMeta[];
  filterTable: DataTableFilterMeta;
  loader: boolean;
  exportXlsx?: string | any;
  tableActions?: any
  headerActions?: any
  filterAction?: any;
  headerButtons?: any
}

// const reportIndex: any = {
//   lotes: {
//     route: 'excel/lotes',
//     fileName: 'Informe-Lotes.xlsx'
//   },
//   sli: {
//     route: 'excel/sli',
//     fileName: 'Informe-sli.xlsx'
//   },
//   external: {
//     route: 'excel/thirdParties',
//     fileName: 'Informe-Externos.xlsx'
//   },
//   revision: {
//     route: 'excel/revisions',
//     fileName: 'Informe-Incidencias.xlsx'
//   },
//   products: {
//     route: 'excel/products',
//     fileName: 'Informe-Productos.xlsx'
//   },

// }
interface LazyTableState {
  first: any;
  rows: any;
  page: any;
  sortField?: any;
  sortOrder?: any;
  filters: DataTableFilterMeta;
}

export const SharedTableFilter: React.FC<SharedTableFilterProps> = ({
  dataSource,
  tableColumns,
  filterTable,
  loader,
  exportXlsx,
  tableActions,
  headerButtons,
  filterAction,
  headerActions,
}) => {
  const util = useUtils();
  const [loading, setLoading] = useState<boolean>(true);
  const [tableValues, setTableValues] = useState<any[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>(filterTable);
  const [lazyState, setLazyState] = useState<LazyTableState>({
    first: 0,
    rows: 50,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {

    }
  });
  const [pageParams, setPageParams] = useState<PaginatorParams>({
    rows: 50,
    rowsNumber: [50],
    page: 1,
  });
  const dataTable = useRef<any>(null);
  const toast = useRef<Toast>(null);


  useEffect(() => {
    if (loader) {
      setFilters(filterTable);
      setTableValues(dataSource);
      setLoading(false);
      dataTable.current.reset();
    }
  }, [dataSource, filterTable, filters, loader, tableColumns, tableValues, filterAction]);

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.field}
        onChange={(e: any) => util.localDateFilter(e.value, options)}
        dateFormat="dd-mm-yy"
        placeholder="dd-mm-yyyy"
        mask="99-99-9999"
      />
    );
  };

  const actionButtonsTemplate = (rowData: any) => {
    const actionColumn = tableColumns.find(column => column.field === 'actions');
    if (actionColumn?.actions) {
      return (
        <>
          {actionColumn.actions?.map((action: any, index: number) => (
            <Button
              key={`action-button-${index}`}
              icon={"pi " + action.icon}
              className={action.color ? `p-button-${action.color} m-1` : 'p-button-primary m-1'}
              onClick={() => tableActions(action.action, rowData)}
              rounded
              tooltip={action.text}
            />
          ))}
        </>
      );
    }

    return null;
  };

  const selectFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    let filteredOptions: any;
    const index = tableColumns.findIndex(
      (element: ColumnMeta) =>
        element.filterType === "select" && element.field === options.field
    );
    filteredOptions = tableColumns[index].filterOption;
    return (
      <Dropdown
        value={options.value}
        options={filteredOptions}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        optionLabel="label"
        placeholder="Seleccione"
        className="p-column-filter"
        showClear
      />
    );
  };

  const bodyCheckTemplate = (data: boolean) => {
    return (
      <Checkbox checked={data} disabled></Checkbox>
    )
  }

  const onPage = (event: any) => {
    setLazyState(event);
    filterAction(event);
  };

  const onSort = (event: any) => {
    setLazyState(event);
    filterAction(event);
  };

  // const handleXlsxExport = () => {
  //   getXlsx(reportIndex[exportXlsx].route).then(
  //     () => {
  //       util.downloadExcel(
  //         reportIndex[exportXlsx]?.route,
  //         reportIndex[exportXlsx]?.fileName, () => {
  //           setLoadingButton(false);
  //         });
  //     },
  //     () => {
  //       util.toastShow(toast, "Al intentar exportar.", "error")
  //       setLoadingButton(false);
  //     }
  //   );
  // };

  const renderHeader = () => {
    return (
      <>
        {exportXlsx !== "none" && (
          <div className="flex justify-content-between">
            {/* <Button
              className="border-round-3xl"
              type="button"
              icon="pi pi-file-excel"
              label="Exportar en XLS"
              outlined
              loading={loadingButton}
              onClick={() => {
                setLoadingButton(true);
                handleXlsxExport();
              }}
            /> */}
            <Button
              className="border-round-3xl"
              type="button"
              icon="pi pi-filter-slash"
              label="Limpiar Filtros"
              outlined
              onClick={() => {
                dataTable.current.reset();
              }}
            />
          </div>
        )}
        {
          headerButtons?.map((elements: any, index: any) => (
            < Button
              key={`header-button-${index}`}
              icon={"pi " + elements.icon}
              label={elements.text}
              className={elements.color ? `p-button-${elements.color} m-1` : 'p-button-primary m-1'}
              onClick={() => {
                headerActions(elements.action)
              }}
            />
          ))
        }
      </>
    );
  };

  const handleFilter = (event: any) => {
    filterAction(event);
    setPageParams((element: any) => ({
      ...element,
      rows: event.rows,
    }))
  }

  const header = renderHeader();

  return (
    <div>
      <Toast ref={toast} />
      <DataTable
        id="data-table"
        removableSort
        value={tableValues}
        ref={dataTable}
        paginator
        scrollable
        loading={loading}
        filters={filters}
        scrollHeight="35vh"
        rowsPerPageOptions={pageParams.rowsNumber}
        resizableColumns
        header={header}
        emptyMessage="No se encontraron resultados."
        lazy
        totalRecords={tableValues.length}
        first={lazyState.first}
        rows={lazyState.rows}
        onPage={onPage}
        onSort={onSort}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        onFilter={handleFilter}
      >
        {tableColumns.map((col) => {
          let filterComponent;
          switch (col.filterType) {
            case "inputText":
              filterComponent = (
                <Column
                  key={col.field + "-filter"}
                  sortable
                  field={col.field}
                  header={col.header}
                  filter
                  align={col.align}
                  showAddButton={false}
                  showFilterOperator={false}
                  showFilterMatchModes={false}
                  filterPlaceholder="Buscar"
                />
              );
              break;
            case "select":
              filterComponent = (
                <Column
                  key={col.field + "-filter"}
                  sortable
                  field={col.field}
                  header={col.header}
                  filter
                  align={col.align}
                  showAddButton={false}
                  showFilterMatchModes={false}
                  showFilterOperator={false}
                  filterElement={selectFilterTemplate}
                />
              );
              break;
            case "check":
              filterComponent = (
                <Column
                  key={col.field + "-filter"}
                  field={col.field}
                  header={col.header}
                  align={col.align}
                  sortable
                  showFilterMatchModes={false}
                  showAddButton={false}
                  showFilterOperator={false}
                  body={(e: any) => bodyCheckTemplate(e[col.field])
                  }
                />
              );
              break;
            case "date":
              filterComponent = (
                <Column
                  key={col.field + "-filter"}
                  sortable
                  header={col.header}
                  field={col.field}
                  dataType="date"
                  filter
                  align={col.align}
                  filterElement={dateFilterTemplate}
                  showFilterMatchModes={false}
                  showAddButton={false}
                  showFilterOperator={false}
                  sortField={col.sortField}
                />
              );
              break;
            case "actions":
              filterComponent = (
                <Column
                  key={col.field + "-filter"}
                  header=" "
                  body={actionButtonsTemplate}
                />
              );
              break;

            default:
              filterComponent = (
                <Column
                  key={col.field + "-filter"}
                  field={col.field}
                  header={col.header}
                  sortable
                  showFilterMatchModes={false}
                  showAddButton={false}
                  showFilterOperator={false}
                />
              );
              break;
          }

          return filterComponent;
        })}
      </DataTable>
    </div>
  );
};

