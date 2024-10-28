import { ColumnMeta } from "@/app/shared-components/shared-table";
import { FilterMatchMode } from "primereact/api";
export const securityStockTableColumns: ColumnMeta[] = [

  {
    field: "sku",
    header: "SKU",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "fechaCarga",
    header: "Fecha",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "usuarioCarga",
    header: "Usuario",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "nombreSucursal",
    header: "Tienda",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "tipoCarga",
    header: "Tipo de Carga",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },



];
