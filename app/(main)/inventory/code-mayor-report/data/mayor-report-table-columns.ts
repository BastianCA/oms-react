import { ColumnMeta } from "@/app/shared-components/shared-table";
import { FilterMatchMode } from "primereact/api";
export const mayorReportTableColumns: ColumnMeta[] = [

  {
    field: "codigoMaestro",
    header: "Codigo",
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