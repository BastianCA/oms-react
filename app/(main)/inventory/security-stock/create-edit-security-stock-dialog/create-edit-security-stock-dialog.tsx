import SharedForm, { FormField } from "@/app/shared-components/shared-form";
import { ColumnMeta, SharedTableFilter } from "@/app/shared-components/shared-table";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { DataTableFilterMeta } from "primereact/datatable";
import { securityStockTableColumns } from "./data/security-stock-table-columns";
import { getComboWarehouse, getGenerateSecurityStock, getHierarchiesCombo, getHierarchiesLevelCombo, } from "@/API/apis";
import { buttonProps, formFields } from "./data/filter-create-edit-stock-security";

export interface CreateEditSecurityStockDialogProps {
    data: any;
    handleClose: any;
}

export const CreateEditSecurityStockDialog: React.FC<CreateEditSecurityStockDialogProps> = ({
    data,
    handleClose,
}) => {
    const defaultFilters: DataTableFilterMeta = {};

    const [dataSource, setDataSource] = useState<any[]>([]);
    const [title, setTitle] = useState<string>("Crear");
    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState<FormField[]>(formFields);
    const columns: ColumnMeta[] = securityStockTableColumns;
    const tableHeader = {};
    const [filterParams, setFilterParams] = useState<any>({
        session: 0,
        sucursal: "",
        tipo: "",
        producto: "",
        nivel: 0,
        categoria: 0,
        padre1: "",
        padre2: null,
        padre3: null,
        padre4: null,
        padre5: null,
        padre6: null,
        fechaInicio: "",
        fechaFin: "",
        flagCommit: "",
    });
    useEffect(() => {
        setLoading(true)
        getHierarchiesCombo('').then(a => {
            if (a.list) {
                form[3].options = a.list.map((e: any) => ({
                    label: e.name,
                    value: e.id,
                    nivel: e.nivel
                }))
            }
        })
        getComboWarehouse().then(b => {
            if (b.list) {
                form[1].options = b.list.map((e: any) => ({
                    label: e.id + ' - ' + e.name,
                    value: e.id,
                }))
                form[1].options = form[1].options?.sort((a: any, b: any) => parseFloat(a.value) - parseFloat(b.value))
            }
        });
    }, []);

    const handleAction = (actionType: string, rowData?: any) => {

    };

    const handleFilterTable = (event: any) => {
        console.log(event);


    }

    const handleFilterChange = (data: { [key: string]: any }) => {

        const disableField = (index: number, isDisabled: boolean) => {
            form[index].disabled = isDisabled;
        };

        // Manejo de jerarquía
        const updateFilterAndParams = (padreKey: any, dataKey: string, formIndex: number, nextIndex: number) => {
            const nivelId: any = form[formIndex].options?.find(
                (element) => +element.value === +data[dataKey]
            );
            if (nivelId) {
                const filter = { id: nivelId?.value, nivel: nivelId?.nivel };
                handleFilterCombo(filter, nextIndex);
                setFilterParams((prev: any) => ({
                    ...prev,
                    categoria: nivelId.value,
                    nivel: nivelId.nivel,
                    [padreKey]: nivelId.padre || 0
                }));
            }
        };
        if (data.tipo === "SKU") {
            disableField(2, false);
            disableField(3, true);
            disableField(4, true);
            disableField(5, true);
            disableField(6, true);
            disableField(7, true);
            disableField(8, true);
            form[4].options = []
            form[5].options = []
            form[6].options = []
            form[7].options = []
            form[8].options = []
        } else if (data.tipo === "JERARQUIA") {
            disableField(3, false);
            disableField(2, true);
        }
        if (data.nivel) {
            updateFilterAndParams('padre1', 'nivel', 3, 4);
            disableField(4, true);
            disableField(5, true);
            disableField(6, true);
            disableField(7, true);
            disableField(8, true);
            form[4].options = []
            form[5].options = []
            form[6].options = []
            form[7].options = []
            form[8].options = []
            buttonProps.disabled = false;

        }
        if (data.linea) {
            updateFilterAndParams('padre2', 'linea', 4, 5);
            disableField(5, true);
            disableField(6, true);
            disableField(7, true);
            disableField(8, true);
            form[5].options = []
            form[6].options = []
            form[7].options = []
            form[8].options = []
        }
        if (data.grupo) {
            updateFilterAndParams('padre3', 'grupo', 5, 6);
            disableField(6, true);
            disableField(7, true);
            disableField(8, true);
            form[6].options = []
            form[7].options = []
            form[8].options = []
        }
        if (data.subGrupo) {
            updateFilterAndParams('padre4', 'subGrupo', 6, 7);
            disableField(7, true);
            form[7].options = []
        }
        if (data.talla) {
            updateFilterAndParams('padre5', 'talla', 7, 8);
            disableField(8, true);
            form[8].options = []
        }


    };

    const handleFilterCombo = (filter: any, fieldIndex: number) => {
        setForm((prevData) => {
            const updatedFields = [...prevData];
            updatedFields[fieldIndex] = { ...updatedFields[fieldIndex], disabled: false };
            getHierarchiesLevelCombo(filter).then((response) => {
                if (response.list) {
                    const options = response.list.map((item: any) => ({
                        label: item.name,
                        value: item.id,
                        nivel: item.nivel,
                        padre: item.padre
                    }));
                    setForm((prevData) => {
                        const updatedFieldsWithOptions = [...prevData];
                        updatedFieldsWithOptions[fieldIndex] = {
                            ...updatedFieldsWithOptions[fieldIndex],
                            options,
                        };
                        return updatedFieldsWithOptions;
                    });
                }
            });
            return updatedFields;
        });
    }
    const handleSubmit = (data: any) => {
        const filters = {
            categoria: filterParams.categoria ?? '',
            sucursal: String(data.sucursal) || '',
            tipo: data.tipo ?? '',
            producto: data.producto ?? '',
            nivel: filterParams.nivel ?? '',
            padre1: filterParams.padre1 ?? '',
            padre2: filterParams.padre2 ?? null,
            padre3: filterParams.padre3 ?? null,
            padre4: filterParams.padre4 ?? null,
            padre5: filterParams.padre5 ?? null,
            padre6: filterParams.padre6 ?? null,
            flagCommit: data.flagCommit ?? 'T',
            cantidad: '30'
        }
        getGenerateSecurityStock(filters).then((a: any) => {
            if (a.validaStockSeg) {
                setDataSource([...a.validaStockSeg]);
                setLoading(true);
            }
            else {
                setLoading(true);
            }
        });
    }

    const handleCleanFilter = (data: any) => {
        form[3].disabled = true
        form[4].disabled = true
        form[5].disabled = true
        form[6].disabled = true
        form[7].disabled = true
        form[8].disabled = true
        form[4].options = []
        form[5].options = []
        form[6].options = []
        form[7].options = []
        form[8].options = []
        buttonProps.disabled = true
    };

    return (
        <div>
            <div className="w-full flex mb-3 justify-content-between">
                <div className="flex align-items-center">
                    <span className="pi pi-file-edit text-red-600 text-2xl mr-2"></span>
                    <div className="font-bold text-2xl">{title + ' stock de seguridad'}</div>
                </div>
            </div>
            <SharedForm title='' fields={form} onSubmit={handleSubmit} onFilterChange={handleFilterChange} onCleanFilter={handleCleanFilter} buttonProps={buttonProps} />
            <SharedTableFilter
                dataSource={dataSource}
                tableColumns={columns}
                filterTable={defaultFilters}
                loader={loading}
                exportXlsx="none"
                tableActions={handleAction}
                headerActions={handleAction}
                filterAction={handleFilterTable}
            />
            {title !== "Ficha" && (
                <div className="flex justify-content-end">
                    <Button
                        label="Cancelar"
                        rounded
                        className="w-2 mt-3 ml-3 bg-primary border-none"
                        style={{ height: "35px" }}
                        onClick={() => handleClose("")}
                    ></Button>
                    <Button
                        label="Procesar"
                        rounded
                        className="w-2 mt-3 ml-3 bg-primary border-none"
                        style={{ height: "35px" }}
                        onClick={() => {
                        }}
                    ></Button>
                </div>
            )}
        </div>
    );
};

export default CreateEditSecurityStockDialog;
