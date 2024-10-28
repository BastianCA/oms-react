import { CustomButtonProps, FormField } from "@/app/shared-components/shared-form";

export const formFields: FormField[] = [

    {
        type: 'dropdown',
        filterParam: 'codigo',
        label: 'Tipo',
        className: 'p-field',
        options: [],
    },
    {
        type: 'dropdown',
        filterParam: 'dispVenta',
        label: 'Disponible para la venta',
        className: 'p-field',
        options: [
            { label: "SI", value: "SI" },
            { label: "NO", value: "NO" }
        ],
    },
    {
        type: 'dropdown',
        filterParam: 'aplicaCentroDistribucion',
        label: 'Aplica a centro de distribución',
        className: 'p-field',
        options: [
            { label: "SI", value: "SI" },
            { label: "NO", value: "NO" }],
    },
    {
        type: 'dropdown',
        filterParam: 'aplicaTiendas',
        label: 'Aplica a las tiendas',
        className: 'p-field',
        options: [{ label: "SI", value: "SI" },
        { label: "NO", value: "NO" }],
    },
    {
        type: 'dropdown',
        filterParam: 'estado',
        label: 'Estado',
        className: 'p-field',
        options: [
            { label: "ACTIVO", value: "ACTIVO" },
            { label: "INACTIVO", value: "INACTIVO" }],
    },
];

export const buttonProps: CustomButtonProps = {
    icon: 'pi pi-search',
    iconPos: 'left',
    visible: true,
    rounded: true,
    placeHolder: 'Filtrar',
    className: "mt-3"
};