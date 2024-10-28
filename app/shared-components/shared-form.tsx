import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';

export interface FormField {
    type: 'text' | 'dropdown' | 'date';
    filterParam: string;
    label: string;
    className: string;
    disabled?: boolean;
    options?: { label: string; value: any }[];
    defaultValue?: any;
}

export interface CustomButtonProps {
    label?: string;
    icon?: string;
    className?: string;
    iconPos?: 'left' | 'right' | 'top' | 'bottom';
    visible?: boolean;
    rounded?: boolean;
    placeHolder?: string;
    disabled?: boolean
}

interface DynamicFormProps {
    title: string;
    fields: FormField[];
    onSubmit: (data: { [key: string]: any }) => void;
    buttonProps?: CustomButtonProps;
    onCleanFilter?: any;
    onFilterChange: (data: { [key: string]: any }) => void;
}

const SharedForm: React.FC<DynamicFormProps> = ({ title, fields, onSubmit, buttonProps, onFilterChange, onCleanFilter }) => {
    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [cleanFilter, setCleanFilter] = useState<boolean>(false)

    const handleInputChange = (field: string, value: any) => {

        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        onFilterChange({ [field]: value })
        setCleanFilter(true)
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };


    useEffect(() => {
        const defaultValues: { [key: string]: any } = {};
        fields.forEach(field => {
            if (field.defaultValue !== undefined) {
                defaultValues[field.filterParam] = field.defaultValue;
            }
        });
        setFormData(defaultValues);
        onFilterChange(defaultValues);
    }, []);

    const handleClearFilter = () => {
        setFormData({})
        setCleanFilter(false)
        onCleanFilter(true)
    }


    return (
        <div className='card'>
            <h4>{title}</h4>
            <form onSubmit={handleSubmit} className="w-full flex flex-wrap justify-content-around align-items-center">
                {fields.map((field, index) => (
                    <div key={"container-" + index} className={'flex flex-column m-2 ' + field.className}>
                        <label>{field.label}</label>
                        {field.type === 'text' && (
                            <InputText
                                style={{ minWidth: "220px" }}
                                value={formData[field.filterParam] || ''}
                                onChange={(e) => handleInputChange(field.filterParam, e.target.value)}
                                placeholder={'Ingrese ' + field.label}
                                disabled={field.disabled}
                            />
                        )}
                        {field.type === 'dropdown' && field.options && (
                            <Dropdown
                                style={{ minWidth: "220px" }}
                                value={formData[field.filterParam] || ''}
                                options={field.options}
                                onChange={(e) => {
                                    handleInputChange(field.filterParam, e.value)
                                }}
                                placeholder="Seleccione"
                                disabled={field.disabled}
                            />
                        )}
                        {field.type === 'date' && (
                            <Calendar
                                style={{ minWidth: "220px" }}
                                value={formData[field.filterParam] || ''}
                                onChange={(e) => handleInputChange(field.filterParam, e.value)}
                                placeholder={'Ingrese ' + field.label}
                                disabled={field.disabled}
                            />
                        )}
                    </div>
                ))}
                {buttonProps?.visible !== false && (
                    <Button
                        type="submit"
                        label={buttonProps?.label}
                        icon={buttonProps?.icon}
                        className={buttonProps?.className ?? 'mt-3'}
                        iconPos={buttonProps?.iconPos ?? 'left'}
                        rounded={buttonProps?.rounded}
                        tooltip={buttonProps?.placeHolder ?? ''}
                        tooltipOptions={{ position: "top" }}
                        disabled={buttonProps?.disabled ?? false}
                    />
                )}
                {cleanFilter && (

                    <Button className='mt-3' icon="pi pi-trash" onClick={handleClearFilter}
                        rounded severity="danger" aria-label="Cancel" tooltip='Limpiar filtro' tooltipOptions={{ position: "top" }} />
                )}

            </form>
        </div>
    );
};

export default SharedForm;
