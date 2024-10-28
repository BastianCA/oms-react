import { ColumnMeta } from "@/app/shared-components/shared-table";
import { FilterMatchMode } from "primereact/api";
export const productsReportTableColumns: ColumnMeta[] = [

  {
    field: "codigo",
    header: "Tipo",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "descripcion",
    header: "Descripción",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "disponibleVenta",
    header: "Disponible para la Venta",
    filterType: "check",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "aplicaCentroDistribucion",
    header: "Aplica a Centro Distribución",
    filterType: "check",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "aplicaTienda",
    header: "Aplica a las Tiendas",
    filterType: "check",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "estado",
    header: "Estado",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "actions",
    header: "Actions",
    filterType: "actions",
    actions: [
      { text: "Editar", color: 'primary', icon: "pi-pencil", action: "editar" },
      { text: "Ver ficha", color: 'info', icon: "pi-eye", action: "borrar" },
    ]
  },


];

export const headerButtons = [
  { text: "Agregar", color: 'success', icon: "pi-plus", action: "crear" },
]