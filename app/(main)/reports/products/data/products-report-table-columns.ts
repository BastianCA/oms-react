import { ColumnMeta } from "@/app/shared-components/shared-table";
import { FilterMatchMode } from "primereact/api";

export const productsReportTableColumns: ColumnMeta[] = [
  {
    field: "sku",
    header: "Sku",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "nombre_producto",
    header: "Nombre producto",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "estado",
    header: "Estado Sku",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "tipologia",
    header: "Tipología",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "origen",
    header: "Origen",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "modelo_producto",
    header: "Modelo",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "nombre_proveedor",
    header: "Proveedor",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "gerente",
    header: "Gerente",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "jefe",
    header: "Jefe",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "tipo_compra",
    header: "Tipo de compra",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "comprador",
    header: "Comprador",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "sistema_certificacion",
    header: "Sistema de certificación",
    filterType: "select",
    align: "center",
    filterOption: [
      { value: "13", label: "13" },
      { value: "22", label: "22" },
    ],
  },
  {
    field: "protocol_name",
    header: "Protocolo",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "dias_max",
    header: "Días max certificación",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "modelo_certificado",
    header: "Modelo certificado",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "numero_certificado",
    header: "N° de certificado",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "organismo",
    header: "Organismo",
    filterType: "select",
    filterOption: [],
  },
  {
    field: "codigo_qr",
    header: "Código QR",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
  },
  {
    field: "fecha_creacion_f",
    header: "Fecha creación",
    filterType: "date",
    align: "center",
    sortField: "fecha_creacion",
  },
  {
    field: "vencimiento_e_energia_f",
    header: "Fecha Vcto E.E",
    filterType: "date",
    align: "center",
    sortField: "vencimiento_e_energia",
  },
  {
    field: "fecha_actualizacion_f",
    header: "Fecha actualización",
    filterType: "date",
    align: "center",
    sortField: "fecha_actualizacion",
  },
  {
    field: "doc_tipo_1",
    header: "Informe de ensayo - Certificado tipo",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "doc_tipo_2",
    header: "Certificación de Aprobación",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "doc_tipo_3",
    header: "Etiqueta QR",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "doc_tipo_4",
    header: "Certificación EE - Informe de Ensayo",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "doc_tipo_5",
    header: "Certificación EE - Aprobación",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "doc_tipo_6",
    header: "Certificación EE - Etiqueta",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "doc_tipo_7",
    header: "Agenda de Producto",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
  {
    field: "doc_tipo_8",
    header: "Informe Voluntario",
    filterType: "inputText",
    matchMode: FilterMatchMode.CONTAINS,
    align: "center",
  },
];

// "sku": "1043528",
// "estado": "Activo",
// "fecha_actualizacion": "2024-02-26T13:59:26.994-03:00",
// "usuario_actualizacion": "nelson",
// "fecha_creacion": "2024-02-26T10:08:44.201-03:00",
// "nombre_producto": "EXTENSION 3M VERDE",
// "tipologia": null,
// "gerencia": null,
// "origen": null,
// "modelo_producto": "20W261D",
// "nombre_proveedor": "CIXI CITY WANBANG INDUSTRY CO., LTD.",
// "gerente": "prueba",
// "jefe": "prueba",
// "tipo_compra": "prueba",
// "comprador": "prueba",
// "vencimiento_e_energia": null,
// "sistema_certificacion": "Certificación por Lotes",
// "dias_promedio": 1,
// "modelo_certificado": "prueba123123123",
// "numero_certificado": "1",
// "organismo": "DICTUC",
// "codigo_qr": "21321",
// "doc_tipo_1": 3,
// "doc_tipo_2": 0,
// "doc_tipo_3": 0,
// "doc_tipo_4": 0,
// "doc_tipo_5": 0
