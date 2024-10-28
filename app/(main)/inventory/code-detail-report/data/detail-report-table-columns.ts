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
    field: "codTipoInventario",
    header: "Codigo de Inv.",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "tipoInventarioName",
    header: "Descripción inv",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "codTipoTransaccion",
    header: "Codigo Trn",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "tipoTransaccionName",
    header: "Desc. Trn",
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