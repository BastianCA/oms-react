import { getProtocolDetail } from "@/API/apis";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Row } from "primereact/row";
import { Tag } from "primereact/tag";
import React, { useEffect, useState } from "react";
import { IoMdBarcode } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
const useUtils = require('@/app/utils')

export interface ProtocolDialogProps {
    data: any;
    handleClose: any;
}
export const ProtocolDialog: React.FC<ProtocolDialogProps> = ({
    data
}) => {
    const util = useUtils();
    const [protocolData, setProtocolData] = useState<any>()
    const [protocolTableData, setProtocolTableData] = useState<any[]>([])
    const [columns, setColumns] = useState<any>([]);
    const [organismHeaders, setOrganismHeaders] = useState<any>([]);

    const transformData = (data: any) => {
        const transformedData: any = [];
        data.forEach((item: any) => {
            const row: any = { cantMuestras: +item[`rangeSamples${item.rango}`] || 0 };
            item.organismos.forEach((org: any) => {
                row[`valorUf${org.organismo}`] = (+org[`rangeUf${item.rango}`] || 0).toLocaleString('es-CL');
                row[`id${org.organismo}`] = +org.organismoId || 0;
                row[`diasHabiles${org.organismo}`] = +org[`rangeBusinessDays${item.rango}`] || 0;
            });
            transformedData.push(row);
        });

        return transformedData;
    };

    const createColumns = (data: any) => {
        const organismos = data[0].organismos.map((org: any) => ({ idOrganism: org.organismoId, organism: org.organismo }));
        const columns: any = [];

        organismos.forEach((org: any) => {
            columns.push({
                field: `valorUf${org.organism}`,
                header: `Valor UF`,
            });
            columns.push({
                field: `diasHabiles${org.organism}`,
                header: `Días certificación`,
            });

        });
        setOrganismHeaders(organismos);
        return columns;
    };




    useEffect(() => {
        getProtocolDetail(data.id).then(a => {
            setProtocolData(a.response);
            const transformedData = transformData(a.response.rangos);
            transformedData[0].rangoPrincipal = "2 a 15"
            transformedData[1].rangoPrincipal = "16 a 50"
            transformedData[2].rangoPrincipal = "51 a 150"
            transformedData[3].rangoPrincipal = "151 a 500"
            transformedData[4].rangoPrincipal = "501 a 32000"
            transformedData[5].rangoPrincipal = "32001 a 35000"
            transformedData[6].rangoPrincipal = "35001 a mas"

            setProtocolTableData(transformedData);
            setProtocolData((prev: any) => ({
                ...prev,
                rangos: transformedData
            }))
            setColumns(createColumns(a.response.rangos));

        })
    }, [])


    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column
                    header=" " colSpan={2}
                />
                {organismHeaders.map((col: any, index: any) => (
                    <Column key={index + "Column"} header={col.organism} colSpan={2} />
                ))}
            </Row>
            <Row>
                <Column
                    header="Rango de lotes"
                />
                <Column
                    header="Muestra"
                />

                {columns.map((col: any, index: any) => (
                    <Column key={index + "Column"} header={col.header} sortable />
                ))}
            </Row>
        </ColumnGroup>
    );


    return (
        <div className="flex flex-column">
            <div className="flex justify-content-center font-bold text-2xl mb-3">
                Detalle protocolo
            </div>
            <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
                <div className="flex justify-content-start align-items-center mb-6">
                    <IoDocumentTextOutline className="text-primary font-bold text-6xl mr-2" />
                    <div className="text-6xl font-light ">
                        {protocolData?.name ?? ""}
                    </div>

                </div>
                <div className="flex flex-wrap">
                    <div className="flex mb-5" >
                        <label style={{ width: "140px" }} className="font-bold mr-2">Fecha creación:</label>
                        <div style={{ width: "200px" }}>
                            {util.localDate(protocolData?.createdAt) ?? ""}
                        </div>
                    </div>
                    <div className="flex mb-5" >
                        <label style={{ width: "140px" }} className="font-bold mr-2">Fecha actualización:</label>
                        <div style={{ width: "200px" }}>
                            {util.localDate(protocolData?.updatedAt) ?? ""}
                        </div>
                    </div>
                    <div className="flex mb-5" >
                        <label style={{ width: "140px" }} className="font-bold mr-2">Usuario Actualización:</label>
                        <div style={{ width: "200px" }} className="font-light">{protocolData?.user ?? ""}</div>
                    </div>
                    <div className="flex mb-5" >
                        <label style={{ width: "140px" }} className="font-bold mr-2">Estado Protocolo:</label>
                        <div style={{ width: "200px" }}>
                            <Tag severity={protocolData?.states?.description === "Activo" ? "success" : "danger"} value={protocolData?.states?.description}></Tag>
                        </div>
                    </div>

                    <div className="flex mb-5" >
                        <label style={{ width: "140px" }} className="font-bold mr-2">Tipo:</label>
                        <div style={{ width: "200px" }}>
                            {protocolData?.type ? protocolData?.type : protocolData?.protocolType ?? ""}
                        </div>
                    </div>
                    <div className="flex mb-5" >
                        <label style={{ width: "230px" }} className="font-bold mr-2">Denominación tecnica:</label>
                        <div style={{ width: "100%" }}>
                            {util.localDate(protocolData?.denominacionTecnica) ?? ""}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
                <div className="text-2xl mb-2 flex align-items-center mb-3">
                    <IoMdBarcode className="text-2xl text-primary title-icon-top-margin mr-2" />Cantidad de muestras por rango
                </div>
                <DataTable
                    value={protocolTableData}
                    headerColumnGroup={headerGroup}
                    scrollable
                    removableSort
                    resizableColumns
                    scrollHeight="350px"
                    tableStyle={{ minWidth: '50rem' }}
                >
                    <Column
                        field="rangoPrincipal"
                        header="Rango de lotes"
                    />

                    <Column
                        field="cantMuestras"
                        header="Muestra"
                        key={"cantMuestraColumn"}
                    />
                    {columns.map((col: any, index: any) => (
                        <Column
                            key={index + "Column"}
                            field={col.field}
                            sortable
                            header={col.header}
                        />
                    ))}
                </DataTable>
            </div>
        </div >
    );
};

export default ProtocolDialog;
