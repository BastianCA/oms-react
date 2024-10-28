import { CustomButtonProps, FormField } from "@/app/shared-components/shared-form";

export const formFields: FormField[] = [

    {
        type: 'dropdown',
        filterParam: 'reportMaestro',
        label: 'Reporte Maestro',
        className: 'p-field',
        options: [],
    },

];

export const buttonProps: CustomButtonProps = {
    icon: 'pi pi-search',
    iconPos: 'left',
    visible: true,
    rounded: true,
    placeHolder: 'Filtrar',
    className: "mt-3",
    disabled: true
};