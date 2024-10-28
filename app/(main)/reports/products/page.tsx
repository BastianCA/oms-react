"use client";

import { getComboOrganism, getReportData } from "@/API/apis";
import {
  ColumnMeta,
  SharedTableFilter,
} from "@/app/shared-components/shared-table";
import { LayoutContext } from "@/layout/context/layoutcontext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTableFilterMeta } from "primereact/datatable";
import { useContext, useEffect, useState } from "react";
import { productsReportTableColumns } from "./data/products-report-table-columns";
const useUtils = require('@/app/utils')

const defaultFilters: DataTableFilterMeta = {};

const ProductsReport = () => {
  const util = useUtils();
  const { setLayoutConfig } = useContext(LayoutContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const columns: ColumnMeta[] = productsReportTableColumns;

  useEffect(() => {
    setLayoutConfig((prevState) => ({ ...prevState, menuMode: "drawer" }));
    getReportData("sku").then((a) => {
      if(a) {
        const nuevoArreglo = a[0].reporte.map((objeto: any) => {
          return {
            ...objeto,
            fecha_actualizacion_f: util.localDate(objeto.fecha_actualizacion),
            fecha_creacion_f: util.localDate(objeto.fecha_creacion),
            vencimiento_e_energia_f: util.localDate(objeto.vencimiento_e_energia),
          };
        });
        setDataSource(nuevoArreglo);
        setLoading(true);
      }
      else setLoading(true);
    });
    getComboOrganism().then((data: any) => {
      if (data) {
        columns[15].filterOption = data.map((e: any) => ({
          value: e.agencyName,
          label: e.agencyName,
        }));
      }
    });
    //columna organismo se carga con servicio de organismo
    columns.forEach((item: any) => {
      defaultFilters[item.field] = {
        operator: FilterOperator.AND,
        constraints: [
          {
            value: "",
            matchMode: item.matchMode ? item.matchMode : FilterMatchMode.EQUALS,
          },
        ],
      };
    });
  }, [setLayoutConfig]);

  return (
    <div>
      <div className="text-3xl">Reporte de</div>
      <div className="text-6xl mb-3 ">Visualización de datos de producto</div>
      <SharedTableFilter
        dataSource={dataSource}
        tableColumns={columns}
        filterTable={defaultFilters}
        loader={loading}
        exportXlsx="products"
      />
    </div>
  );
};
export default ProductsReport;
