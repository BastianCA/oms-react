"use client";
import { useContext, useState, useEffect, useRef } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { buttonProps, formFields } from './data/filter-types';
import { headerButtons, mayorReportTableColumns } from './data/detail-report-table-columns';
import CreateEditEditReportDialog from './create-edit-detail-report-dialog/create-edit-detail-report-dialog';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import SharedForm, { FormField } from '../../../shared-components/shared-form';
import { getDetailReportByFilter, getMayorReportByFilter } from '../../../../API/apis';
import SharedDialog, { usePopup } from '../../../shared-components/shared-dialog';
import { ColumnMeta, SharedTableFilter } from '../../../shared-components/shared-table';
const useUtils = require('@/app/utils')

const defaultFilters: DataTableFilterMeta = {};

const TypeOfBalance = () => {

    const toast = useRef<Toast>(null);
    const util = useUtils();
    const { setLayoutConfig } = useContext(LayoutContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [styleSelected, setStyleSelected] = useState<any>({ width: "80vw" });
    const [formFieldData, setFormFieldData] = useState<FormField[]>(formFields);
    const [filterParams, setFilterParams] = useState<any>({
        codigoMaestro: '',
        descripcion: '',
        estado: '',
        page: 1
    });
    const [pageParams, setPageParams] = useState<any>({
        page: 1,
        registersCount: 50,
        orderBy: "",
        order: "",
        allItemsPerPage: false
    });
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [showPopup, popupContent, handleShowPopup, handleHidePopup] =
        usePopup();
    const columns: ColumnMeta[] = mayorReportTableColumns;
    const tableHeader = headerButtons;

    const handleSubmit = (data: { [key: string]: any }) => {
        console.log(data);
        
        handleFilterTable(data)
    };

    const handleFilterCombo = async (fieldIndex: number) => {
        const response = await getMayorReportByFilter(filterParams, pageParams);

        if (response.masterReportCode) {
            const options = response.masterReportCode.map((item: any) => ({
                label: item.codigoMaestro + '-' + item.descripcion,
                value: item.codigoMaestro,
            }));

            setFormFieldData((prevData) => {
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
        setLoading(true)
        handleFilterCombo(0)
    }, [setLayoutConfig],);

    const filterTableAction = (filters: any) => {
        getDetailReportByFilter(filters).then((a: any) => {
            if (a.detailReportCode) {
                const nuevoArreglo = a.detailReportCode.sort((a: any, b: any) => parseFloat(a.id) - parseFloat(b.id))
                setDataSource([...nuevoArreglo]);
                setLoading(true);
            }
            else setLoading(true);
        });
    }



    const handleCloseDialog = (data: any) => {
        if (data === "creado") {
            util.toastShow(toast, "reporte detalle creado correctamente.")
            filterTableAction(filterParams)
        }
        if (data === "editado") {
            util.toastShow(toast, "reporte detalle editado correctamente.")
            filterTableAction(filterParams)
        }
        if (data?.message ? data?.message.includes("Error") : data?.includes("Error")) {
            util.toastShow(toast, data, "error")
        }
        handleHidePopup();
    };

    const handleFilterTable = (event: any) => {
        const filters = {
            codigoMaestro: event.reportMaestro ?? '',
            page: 1
        }
        filterTableAction(filters);
    }


    const handleAction = (actionType: string, rowData?: any) => {
        switch (actionType) {
            case 'crear':
                setStyleSelected({ width: "40vw" });

                handleShowPopup(
                    <CreateEditEditReportDialog
                        data={''}
                        handleClose={handleCloseDialog}
                    />
                );
                break;
            case 'editar':
                setStyleSelected({ width: "40vw" });
                handleShowPopup(
                    <CreateEditEditReportDialog
                        data={{ data: rowData, action: "edit" }}
                        handleClose={handleCloseDialog}
                    />
                );
                break;
            case 'borrar':
                setStyleSelected({ width: "40vw" });

                handleShowPopup(
                    <CreateEditEditReportDialog
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
                    Codigo Reporte Detalle
                </p>
                <SharedForm title='Filtros' fields={formFieldData} onSubmit={handleSubmit} buttonProps={buttonProps} onFilterChange={(e) => buttonProps.disabled = false} />
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
};

export default TypeOfBalance;
