"use client";
import SharedForm, { FormField } from '@/app/shared-components/shared-form';
import { ColumnMeta, SharedTableFilter } from '@/app/shared-components/shared-table';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { useContext, useState, useRef, useEffect } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import SharedDialog, { usePopup } from '@/app/shared-components/shared-dialog';
import { Toast } from 'primereact/toast';
import { getComboWarehouse, getHierarchiesCombo, getHierarchiesLevelCombo, getSecurityStockByFilter } from '@/API/apis';
import { headerButtons, securityStockTableColumns } from './data/security-stock-table-columns';
import { CreateEditSecurityStockDialog } from './create-edit-security-stock-dialog/create-edit-security-stock-dialog';
import { buttonProps, formFields } from './data/filter-types';
const useUtils = require('@/app/utils')

const defaultFilters: DataTableFilterMeta = {};

const SecurityStock = () => {

    const toast = useRef<Toast>(null);
    const util = useUtils();
    const { setLayoutConfig } = useContext(LayoutContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [styleSelected, setStyleSelected] = useState<any>({ width: "80vw" });
    const [form, setForm] = useState<FormField[]>(formFields);
    const [filterParams, setFilterParams] = useState<any>({
        session: 0,
        sucursal: "",
        tipoConsulta: "",
        producto: "",
        jerarquia: 0,
        categoria: 0,
        padre1: "",
        padre2: "",
        padre3: "",
        padre4: "",
        padre5: "",
        padre6: "",
        fechaInicio: "",
        fechaFin: "",
        flagCommit: "",
    });

    const [dataSource, setDataSource] = useState<any[]>([]);
    const [showPopup, popupContent, handleShowPopup, handleHidePopup] =
        usePopup();
    const columns: ColumnMeta[] = securityStockTableColumns;
    const tableHeader = headerButtons;



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
                    jerarquia: nivelId.nivel,
                    [padreKey]: nivelId.padre || 0
                }));
            }
        };
        if (data.tipoConsulta === "SKU") {
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
        } else if (data.tipoConsulta === "JERARQUIA") {
            disableField(3, false);
            disableField(2, true);
        }
        if (data.jerarquia) {
            updateFilterAndParams('padre1', 'jerarquia', 3, 4);
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
        if (data.fechaInicio) {
            disableField(10, false);
        }
        if (data.fechaFin) {
            buttonProps.disabled = false;
        }

    };

    const handleFilterCombo = async (filter: any, fieldIndex: number) => {
        const response = await getHierarchiesLevelCombo(filter);

        if (response.list) {
            const options = response.list.map((item: any) => ({
                label: item.name,
                value: item.id,
                nivel: item.nivel,
                padre: item.padre,
            }));

            setForm((prevData) => {
                const updatedFields = [...prevData];
                updatedFields[fieldIndex] = {
                    ...updatedFields[fieldIndex],
                    disabled: false,
                    options,
                };
                return updatedFields;
            });
        }
    };

    useEffect(() => {
        setLayoutConfig((prevState) => ({ ...prevState, menuMode: "drawer" }));
        getHierarchiesCombo('').then(a => {
            if (a.list) {
                form[3].options = a.list.map((e: any) => ({
                    label: e.name,
                    value: e.id,
                    nivel: e.nivel
                }))
            }
        });
        getComboWarehouse().then(b => {
            if (b.list) {
                form[1].options = b.list.map((e: any) => ({
                    label: e.id + ' - ' + e.name,
                    value: e.id,
                }))
                form[1].options = form[1].options?.sort((a: any, b: any) => parseFloat(a.value) - parseFloat(b.value))
            }
        });
        setLoading(true)
    }, [setLayoutConfig]);

    const filterTableAction = (filters: any) => {
        getSecurityStockByFilter(filters).then((a: any) => {
            if (a.consultaStockSeg) {
                setDataSource([...a.consultaStockSeg]);
                setLoading(true);
                util.toastShow(toast, "Consulta procesada correctamente")
            }
            else {
                setLoading(true);
                util.toastShow(toast, 'Intente nuevamente.', "error")
            }
        });
    }

    const handleSubmit = (data: { [key: string]: any }) => {
        handleFilterTable(data)
    };

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
    };


    const handleCloseDialog = (data: any) => {
        if (data === "creado") {
            util.toastShow(toast, "Stock de seguridad creado correctamente.")
            filterTableAction(filterParams)
        }
        if (data === "editado") {
            util.toastShow(toast, "Stock de seguridad editado correctamente.")
            filterTableAction(filterParams)
        }
        if (data?.message ? data?.message.includes("Error") : data?.includes("Error")) {
            util.toastShow(toast, data, "error")
        }
        handleHidePopup();
    };

    const convertirFecha = (fechaISO: string) => {
        const fecha = new Date(fechaISO);
        const year = fecha.getUTCFullYear();
        const month = String(fecha.getUTCMonth() + 1).padStart(2, "0"); // Los meses son 0 indexados
        const day = String(fecha.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleFilterTable = (event: any) => {
        const filters = {
            categoria: filterParams.categoria ?? '',
            sucursal: String(event.sucursal) || '',
            tipoConsulta: event.tipoConsulta ?? '',
            producto: event.producto ?? '',
            jerarquia: filterParams.jerarquia ?? '',
            padre1: filterParams.padre1 ?? '',
            padre2: filterParams.padre2 ?? null,
            padre3: filterParams.padre3 ?? null,
            padre4: filterParams.padre4 ?? null,
            padre5: filterParams.padre5 ?? null,
            padre6: filterParams.padre6 ?? null,
            fechaInicio: convertirFecha(event.fechaInicio) ?? '',
            fechaFin: convertirFecha(event.fechaFin) ?? '',
            flagCommit: event.flagCommit ?? 'T',
        }
        filterTableAction(filters);
    }


    const handleAction = (actionType: string, rowData?: any) => {
        switch (actionType) {
            case 'crear':
                setStyleSelected({ width: "80vw" });
                handleShowPopup(
                    <CreateEditSecurityStockDialog
                        data={''}
                        handleClose={handleCloseDialog}
                    />
                );
                break;
            case 'editar':
                setStyleSelected({ width: "80vw" });
                handleShowPopup(
                    <CreateEditSecurityStockDialog
                        data={{ data: rowData, action: "edit" }}
                        handleClose={handleCloseDialog}
                    />
                );
                break;
            case 'borrar':
                setStyleSelected({ width: "80vw" });

                handleShowPopup(
                    <CreateEditSecurityStockDialog
                        data={{ data: rowData, action: "ficha" }}
                        handleClose={handleCloseDialog}
                    />
                );
                break;
            default:
                console.log("Acción no reconocida", actionType);
        }
    };

    return (
        <div className="p-grid p-justify-center">
            <Toast ref={toast} />
            <div className="p-col-12 p-md-6">
                <p className="general-title" style={{ minHeight: "84px" }}>
                    Stock de Seguridad
                </p>
                <SharedForm title='Filtros' fields={form} onSubmit={handleSubmit} onFilterChange={handleFilterChange} onCleanFilter={handleCleanFilter} buttonProps={buttonProps} />
                <SharedTableFilter
                    dataSource={dataSource}
                    tableColumns={columns}
                    headerButtons={tableHeader}
                    filterTable={defaultFilters}
                    loader={loading}
                    exportXlsx="none"
                    tableActions={handleAction}
                    headerActions={handleAction}
                    filterAction={handleFilterTable}
                />
            </div>
            <SharedDialog
                visible={showPopup}
                onHide={handleHidePopup}
                content={popupContent}
                styleDialog={styleSelected}
            />
        </div>
    );
}

export default SecurityStock;
