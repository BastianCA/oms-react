import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import { IoMdBarcode } from "react-icons/io";


interface IDetailsHeaderInfo {
  via: string;
  pais: string;
  carpeta: string;
  embarque: string;
  oc_madre: string;
  monto_total: string;
  fecha_arribo: string;
  agente_aduana: string;
  fecha_emision: string;
  fecha_ingreso: string;
  puerto_origen: string;
  estado_carpeta: string;
  total_comprado: string;
  total_internado: string;
}
export interface OcDialogDetailProps {
  details_header_info: IDetailsHeaderInfo[] | any
  details_table_info: any
  details_table_extra_data: any
  source_oc: any
}
export const OcDialogDetailContent: React.FC<OcDialogDetailProps> = (
  {
    details_header_info,
    details_table_info,
    details_table_extra_data,
    source_oc
  }) => {
  const [headerData, setHeaderData] = useState<IDetailsHeaderInfo>();
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    if (details_header_info && details_table_info && details_table_extra_data) {
      setHeaderData(details_header_info)
      setTableData(
        details_table_info.map((elem: any) => {
          const extra = details_table_extra_data.filter((data: any) => data.sku === elem.sku_id)
          return { ...elem, ...extra[0] }
        })
      )
    }


  }, []);
  return (
    <div className="flex flex-column">
      <div className="flex justify-content-center font-bold text-2xl mb-3">
        Orden de compra: {source_oc}
      </div>
      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div className="flex align-items-center mb-3">
          <IoMdBarcode className="text-2xl text-primary mr-2" />
          <div className="text-xl font-bold">Detalle OC</div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex font-bold w-3 mb-4">
            Fecha de emisión: <div className="font-light ml-2">{headerData?.fecha_emision}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Fecha de ingreso: <div className="font-light ml-2">{headerData?.fecha_ingreso}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Carpeta: <div className="font-light ml-2">{headerData?.carpeta}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Estado carpeta: <div className="font-light ml-2">{headerData?.estado_carpeta}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Total comprado: <div className="font-light ml-2">{headerData?.total_comprado}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Total monto: <div className="font-light ml-2">{headerData?.monto_total}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Total internado: <div className="font-light ml-2">{headerData?.total_internado}</div>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div className="flex align-items-center mb-3">
          <IoMdBarcode className="text-2xl text-primary mr-2" />
          <div className="text-xl font-bold">Detalle Embarque</div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex font-bold w-3 mb-4">
            Embarque: <div className="font-light ml-2">{headerData?.embarque}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Fecha arribo: <div className="font-light ml-2">{headerData?.fecha_arribo}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Orden madre: <div className="font-light ml-2">{headerData?.oc_madre}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Agente aduana: <div className="font-light ml-2">{headerData?.agente_aduana}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            País: <div className="font-light ml-2">{headerData?.pais}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Puerto origen: <div className="font-light ml-2">{headerData?.puerto_origen}</div>
          </div>
          <div className="flex font-bold w-3 mb-4">
            Vía: <div className="font-light ml-2">{headerData?.via}</div>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div className="text-xl font-bold mb-3">Producto</div>
        <DataTable
          value={tableData}
          resizableColumns
          rows={5}
          paginator
          scrollHeight="25vh"
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="sku_id" header="SKU" sortable></Column>
          <Column field="producto" header="Producto" sortable></Column>
          <Column field="marca" header="Marca" sortable></Column>
          <Column field="modelo" header="Modelo" sortable></Column>
          <Column
            field="cantidad_comprada"
            header="Cantidad comprada"
            sortable
            align={"center"}
          ></Column>
          <Column
            field="cantidad_internada"
            header="Cantidad recibida"
            sortable
            align={"center"}
          ></Column>
          <Column field="fob" header="FOB" sortable></Column>
          <Column field="providers_code" header="Proveedor" sortable></Column>
          <Column field="providers_name" header="Nombre proveedor" sortable></Column>
          <Column field="cert_number" header="N° Certificado" sortable></Column>
          <Column field="id_qr" header="Código QR" sortable></Column>
          <Column field="agency_name" header="Organismo" sortable></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default OcDialogDetailContent;
