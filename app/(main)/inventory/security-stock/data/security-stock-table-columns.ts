import { ColumnMeta } from "@/app/shared-components/shared-table";
import { FilterMatchMode } from "primereact/api";
export const securityStockTableColumns: ColumnMeta[] = [

  {
    field: "idStockSeg",
    header: "ID",
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
  {
    field: "idNombreJerar",
    header: "Jerarquia",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "idNombreCateg",
    header: "Categoria",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "porcentaje",
    header: "Cantidad",
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