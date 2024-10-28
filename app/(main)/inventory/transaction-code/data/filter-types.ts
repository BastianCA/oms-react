import { CustomButtonProps, FormField } from "@/app/shared-components/shared-form";

export const formFields: FormField[] = [

    {
        type: 'dropdown',
        filterParam: 'id',
        label: 'Tipo',
        className: 'p-field',
        options: [],
    },
    {
        type: 'dropdown',
        filterParam: 'codigoBal',
        label: 'Tipo de Balance',
        className: 'p-field',
        options: [

        ],
    },
    {
        type: 'dropdown',
        filterParam: 'estado',
        label: 'Estado',
        className: 'p-field',
        options: [
            { label: "ACTIVO", value: "ACTIVO" },
            { label: "INACTIVO", value: "INACTIVO" }
        ],
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