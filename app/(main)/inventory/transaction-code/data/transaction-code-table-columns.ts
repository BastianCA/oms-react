import { ColumnMeta } from "@/app/shared-components/shared-table";
import { FilterMatchMode } from "primereact/api";
export const transactionCodeTableColumns: ColumnMeta[] = [

  {
    field: "id",
    header: "Codigo",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
  },
  {
    field: "descripcion",
    header: "Descripción",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
  },
  {
    field: "efectoCosto",
    header: "Tipo de balance",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
  },
  {
    field: "codigoBal",
    header: "Efecto cantidad",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
  },
  {
    field: "efectoCantidad",
    header: "Efecto precio",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
  },
  {
    field: "efectoPrecio",
    header: "Efecto costo",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
  },
  {
    field: "tipoDato",
    header: "Tipo dato",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
  },
  {
    field: "estado",
    header: "Estado",
    filterType: "none",
    matchMode: FilterMatchMode.CONTAINS,
    align:'center'
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