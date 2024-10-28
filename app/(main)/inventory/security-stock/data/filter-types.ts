import { CustomButtonProps, FormField } from "@/app/shared-components/shared-form";

export const formFields: FormField[] = [

    {
        type: 'dropdown',
        filterParam: 'tipoConsulta',
        label: 'Tipo',
        className: '',
        options: [
            { label: 'JERARQUIA', value: 'JERARQUIA' },
            { label: 'SKU', value: 'SKU' }
        ],
        disabled: false
    },
    {
        type: 'dropdown',
        filterParam: 'sucursal',
        label: 'Tienda',
        className: '',
        options: [
        ],
        disabled: false
    },
    {
        type: 'text',
        filterParam: 'producto',
        label: 'SKU',
        className: '',
        disabled: true,

    },
    {
        type: 'dropdown',
        filterParam: 'jerarquia',
        label: 'Depto',
        className: '',
        disabled: true,
        options: []
    },
    {
        type: 'dropdown',
        filterParam: 'linea',
        label: 'Linea',
        className: '',
        disabled: true,
        options: []

    },
    {
        type: 'dropdown',
        filterParam: 'grupo',
        label: 'Grupo',
        className: '',
        disabled: true,
        options: []

    },
    {
        type: 'dropdown',
        filterParam: 'subGrupo',
        label: 'Sub-Grupo',
        className: '',
        disabled: true,
        options: []

    },
    {
        type: 'dropdown',
        filterParam: 'talla',
        label: 'Talla',
        className: '',
        disabled: true,
        options: []

    },
    {
        type: 'dropdown',
        filterParam: 'superProducto',
        label: 'Super Producto',
        className: '',
        disabled: true,
        options: []

    },
    {
        type: 'date',
        filterParam: 'fechaInicio',
        label: 'Fecha Inicio',
        className: '',
        disabled: false,

    },
    {
        type: 'date',
        filterParam: 'fechaFin',
        label: 'Fecha Fin',
        className: '',
        disabled: true,

    },


];
// sucursal
// tipoConsulta
// sku
// idCategoria
// departamento
// linea
// grupo
// subGrupo
// talla
// superProducto
// stStartDate
// stEndDate
// flagCommit

export const buttonProps: CustomButtonProps = {
    icon: 'pi pi-search',
    iconPos: 'left',
    visible: true,
    rounded: true,
    placeHolder: 'Filtrar',
    className: "mt-3",
    disabled: true
};