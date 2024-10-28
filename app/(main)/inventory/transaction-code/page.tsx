"use client";
import SharedForm, { FormField } from '@/app/shared-components/shared-form';
import { ColumnMeta, SharedTableFilter } from '@/app/shared-components/shared-table';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { useContext, useState, useEffect, useRef } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';
import SharedDialog, { usePopup } from '@/app/shared-components/shared-dialog';
import { Toast } from 'primereact/toast';
import { buttonProps, formFields } from './data/filter-types';
import { getBalanceTypesByCombo, getBalanceTypesByFilter, getTransactionCodeByFilter } from '@/API/apis';
import { headerButtons, transactionCodeTableColumns } from './data/transaction-code-table-columns';
import CreateEditTransactionCodeDialog from './create-edit-transaction-code-dialog/create-edit-transaction-code-dialog';
const useUtils = require('@/app/utils')

const defaultFilters: DataTableFilterMeta = {};

const TransactionCode = () => {

    const toast = useRef<Toast>(null);
    const util = useUtils();
    const { setLayoutConfig } = useContext(LayoutContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [styleSelected, setStyleSelected] = useState<any>({ width: "80vw" });
    const formFieldData: FormField[] = formFields;
    const [filterParams, setFilterParams] = useState<any>({
        id: '',
        descripcion: '',
        codigoBal: '',
        efectoCantidad: '',
        efectoPrecio: '',
        efectoCosto: '',
        tipoDato: '',
        estado: '',
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
    const columns: ColumnMeta[] = transactionCodeTableColumns;
    const tableHeader = headerButtons;

    const handleSubmit = (data: { [key: string]: any }) => {
        handleFilterTable(data)
    };

    useEffect(() => {

        setLayoutConfig((prevState) => ({ ...prevState, menuMode: "drawer" }));
        filterTableAction(filterParams, pageParams);
        const filter = {
            estado: ""
        }
        const pageF = {
            page: "1"
        }
        getTransactionCodeByFilter(filter, pageF).then((a: any) => {
            if (a.trnInventoryType) {
                formFieldData[0].options = a.trnInventoryType.map((e: any) => ({
                    label: e.id + " - " + e.descripcion,
                    value: e.id
                }));
                formFieldData[0].options?.sort((a: any, b: any) => parseFloat(a.label) - parseFloat(b.label));
            }
        });
        getBalanceTypesByCombo(pageF).then((a: any) => {
            if (a.inventoryBalance) {
                formFieldData[1].options = a.inventoryBalance.map((e: any) => ({
                    label: e.id,
                    value: e.id
                }));
                formFieldData[1].options?.sort((a: any, b: any) => parseFloat(a.label) - parseFloat(b.label));
            }
        });
    }, [setLayoutConfig]);

    const filterTableAction = (filters: any, page: any) => {
        getTransactionCodeByFilter(filters, page).then((a: any) => {
            if (a.trnInventoryType) {
                const nuevoArreglo = a.trnInventoryType.sort((a: any, b: any) => parseFloat(a.id) - parseFloat(b.id))

                setDataSource([...nuevoArreglo]);
                setLoading(true);
            }
            else setLoading(true);
        });
    }



    const handleCloseDialog = (data: any) => {

        if (data === "creado") {
            util.toastShow(toast, "Tipo de balance creado correctamente.")
            filterTableAction(filterParams, pageParams)
        }
        if (data === "editado") {
            util.toastShow(toast, "Tipo de balance editado correctamente.")
            filterTableAction(filterParams, pageParams)
        }

        if (data?.message ? data?.message.includes("Error") : data?.includes("Error")) {
            util.toastShow(toast, data, "error")
        }
        handleHidePopup();
    };

    const handleFilterTable = (event: any) => {
        const filters = {
            id: event.id ?? event.codigo ?? '',
            estado: event.estado ?? '',
            codigoBal: event.codigoBal ?? '',
        }
        const currentPage = Number.isInteger(event.page) ? event.page : 0;
        const values = {
            page: currentPage === 0 ? 1 : (currentPage + 1),
            allItemsPerPage: ''
        }
        filterTableAction(filters, values);
    }


    const handleAction = (actionType: string, rowData?: any) => {
        switch (actionType) {
            case 'crear':
                setStyleSelected({ width: "60vw" });

                handleShowPopup(
                    <CreateEditTransactionCodeDialog
                        data={''}
                        handleClose={handleCloseDialog}
                    />
                );
                break;
            case 'editar':
                setStyleSelected({ width: "60vw" });
                handleShowPopup(
                    <CreateEditTransactionCodeDialog
                        data={{ data: rowData, action: "edit" }}
                        handleClose={handleCloseDialog}
                    />
                );
                break;
            case 'borrar':
                setStyleSelected({ width: "60vw" });

                handleShowPopup(
                    <CreateEditTransactionCodeDialog
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
                    Codigo de Transacción
                </p>
                <SharedForm title='Filtros' onFilterChange={(e) => console.log(e)} fields={formFieldData} onSubmit={handleSubmit} buttonProps={buttonProps} />
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

export default TransactionCode;
