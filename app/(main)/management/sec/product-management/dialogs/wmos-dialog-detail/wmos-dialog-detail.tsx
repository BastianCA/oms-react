import { getWmosDetails } from "@/API/apis";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
const useUtils = require('@/app/utils')

export interface WmosContentProps {
  source_poSkuId: any;
}

export const WmosContent: React.FC<WmosContentProps> = ({ source_poSkuId }) => {
  const util = useUtils();
  const [asns, setAsns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const toast = useRef<Toast>(null);
  const xlsxFileName: string = 'Listado de lpns, lote ' + source_poSkuId;

  const tableCols = [
    { paramName: 'lote', visibleName: 'Lote' },
    { paramName: 'distribution_center', visibleName: 'Centro Distribución' },
    { paramName: 'cost_center_wh_number', visibleName: 'CC/WH' },
    { paramName: 'tipo_asn', visibleName: 'Tipo de contenedor"' },
    { paramName: 'contenedor', visibleName: 'Contenedor' },
    { paramName: 'asn', visibleName: 'ASN' },
    { paramName: 'ingreso_bodega', visibleName: 'Ingreso bodega' },
    { paramName: 'lpn', visibleName: 'LPN' },
    { paramName: 'location', visibleName: 'Ubicación' },
    { paramName: 'status_wmos', visibleName: 'Estado WMOS' },
    { paramName: 'status_ccp', visibleName: 'Estado CCP' },
    { paramName: 'updated_at', visibleName: 'Fecha actualización CCP' },
  ];

  useEffect(() => {

    setLoading(true)
    getWmosDetails(source_poSkuId).then((res: any) => {
      if (res.asn?.length > 0) {
        setLoading(false)
        setAsns(
          res.asn.map((asn_element: any) => ({
            ...asn_element,
            ingreso_bodega: util.localDateHour(asn_element.ingreso_bodega),
            lpn_list:
              asn_element.lpn_list.map((lpn_list_elem: any) => ({
                ...lpn_list_elem,
                updated_at: util.localDateHour(lpn_list_elem.updated_at),
              })),
            cost_center_wh_number: asn_element.cost_center + "/" + asn_element.wh_number
          }))
        )
      } else {
        setLoading(false)
        setAsns([])
      }
    },
      () => {
        setLoading(false)
        util.toastShow(toast, "En el servicio, intente más tarde.", "error")
      }
    )
  }, []);

  const exportXls = () => {
    const result: any = [];
    const datos = asns
    datos.forEach(asn => {
      asn.lpn_list.forEach((lpnObj: any) => {
        const newRecord = {
          asn: asn.asn,
          tipo_asn: asn.tipo_asn,
          contenedor: asn.contenedor,
          ingreso_bodega: asn.ingreso_bodega,
          cost_center_wh_number: asn.cost_center_wh_number,
          cost_center: asn.cost_center,
          total_lpn: asn.total_lpn,
          total_lpn_estado_diff: asn.total_lpn_estado_diff,
          lote: source_poSkuId,
          lpn: lpnObj.lpn,
          location: lpnObj.location,
          status_wmos: lpnObj.status_wmos,
          status_ccp: lpnObj.status_ccp,
          updated_at: lpnObj.updated_at
        };
        result.push(newRecord);
      });
    });

    util.exportAsXlsx(
      xlsxFileName,
      result,
      tableCols
    );
  }

  const customRowSelection = (value: string) => {
    if (expandedRows && value in expandedRows) {
      const newOBJ = {}
      Object.keys(expandedRows).forEach((asn: string) => {
        if (asn !== value) {
          // @ts-ignore
          newOBJ[asn] = true
        }
      })
      setExpandedRows(newOBJ)
    }
    else
      setExpandedRows((prevData: any) => ({
        ...prevData,
        [value]: true,
      }))
  }

  const allowExpansion = (rowData: any) => {
    return rowData.lpn_list!.length > 0;
  };

  const lpnTotal = (rowData: any) => {
    return (
      <div>
        {rowData.total_lpn}
        {rowData.total_lpn_estado_diff > 0 && (
          <span className="text-red-500">
            {" (" + rowData.total_lpn_estado_diff + ")"}
          </span>
        )}
      </div>
    );
  };

  const statusCcp = (rowData: any) => {
    return (
      <span className={rowData.status_ccp !== rowData.status_wmos ? "text-red-500" : ""} >
        {rowData.status_ccp}
      </span>
    );
  }

  const rowExpansionTemplate = (data: any) => {
    return (
      <div className="flex justify-content-center">
        <DataTable style={{ width: "100%" }} value={data.lpn_list} scrollable scrollHeight="350px">
          <Column
            style={{ width: "18rem" }}
            field="lpn" header="LPN" sortable
            filter
            showFilterOperator={false}
            showAddButton={false}
            showFilterMatchModes={false}
          ></Column>

          <Column
            style={{ width: "18rem" }}
            field="location"
            header="Ubicación"
            sortable
          ></Column>
          <Column
            style={{ width: "12rem" }}
            field="status_wmos"
            header="Estado WMOS"
            sortable
          ></Column>
          <Column
            style={{ width: "16rem" }}
            field="status_ccp"
            header="Estado CCP"
            sortable
            body={statusCcp}
          ></Column>
          <Column
            style={{ width: "15rem" }}
            field="updated_at"
            header="Fecha actualización CCP"
            sortable
            align="center"
          ></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <div className="wmos-modal">
      <Toast ref={toast} />
      <div className="w-full text-2xl font-bold text-center mb-3">
        Información WMOS
      </div>
      <div className="flex justify-content-end">
        <Button
          label="Exportar"
          icon="pi pi-file-excel"
          rounded
          className="w-1 mb-3 bg-green-600 border-none"
          style={{ height: "35px", minWidth: "100px", maxWidth: "130px" }}
          onClick={exportXls}
        />
      </div>
      <DataTable
        value={asns}
        selectionMode="single"
        expandedRows={expandedRows}
        onRowExpand={(e) => customRowSelection(e.data.asn)}
        onSelectionChange={(e) => customRowSelection(e.value.asn)}
        rowExpansionTemplate={rowExpansionTemplate}
        scrollable
        loading={loading}
        rows={10}
        emptyMessage="No se encontraron registros."
        paginator
        rowHover
        dataKey="asn"
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column
          field="distribution_center"
          header="Centro Distribución"
          sortable
          align={"center"}
        ></Column>
        <Column
          field="cost_center_wh_number"
          header="CC/WH"
          sortable
          align={"center"}
        ></Column>
        <Column field="tipo_asn" header="Tipo de contenedor" sortable align={"center"} />
        <Column field="contenedor" header="Contenedor" sortable align={"center"} />
        <Column field="asn" header="Asn" sortable align={"center"} />
        <Column
          field="ingreso_bodega"
          align={"center"}
          header="Ingreso bodega"
          sortable />
        <Column
          field="total_lpn"
          align={"center"}
          header="Total LPN" sortable
          body={lpnTotal}
        />
      </DataTable>
    </div>
  );
};

export default WmosContent;
