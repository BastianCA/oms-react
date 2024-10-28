import { getOrganismById } from "@/API/apis";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { LiaStoreAltSolid } from "react-icons/lia";
import { LuBookMarked } from "react-icons/lu";
export interface OrganismDetailProps {
  data: any;
  handleClose: any;
}
export const OrganismDetailContent: React.FC<OrganismDetailProps> = ({
  data
}) => {

  const [organismData, setOranismData] = useState<any>()

  useEffect(() => {
    getOrganismById(data.id).then((datos: any) => {
      setOranismData(datos)

    })
  }, [])
  return (
    <div className="flex flex-column">
      <div className="flex justify-content-center font-bold text-2xl mb-3">
        Detalle Organismo
      </div>

      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div className="flex align-items-center mb-3">
          <LiaStoreAltSolid className="text-primary text-2xl mr-2" />
          <div className="flex font-bold text-2xl">
            {organismData?.agencyName ?? ""}
          </div>
        </div>
        <div className="flex align-items-center mb-3">
          <div className="font-bold w-5 flex">Contacto: <div className="font-light ml-2">{organismData?.contactName ?? ""}</div></div>
          <div className="font-bold w-5 flex">RUT Organismo: <div className="font-light ml-2">{organismData?.rut ?? ""}</div></div>
        </div>
        <div className="flex align-items-center mb-3">
          <div className="font-bold w-5 flex">Teléfono: <div className="font-light ml-2">{organismData?.phoneNumber ?? ""}</div></div>
          <div className="font-bold w-5 flex">Dirección: <div className="font-light ml-2">{organismData?.address ?? ""}</div></div>
        </div>
        <div className="flex align-items-center mb-5">
          <div className="font-bold w-5 flex ">Email:
            <div className="font-light ml-2" >{organismData?.email ?? ""}</div>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: "1rem", marginBottom: "1rem" }}>
        <div className="flex justify-content-start align-items-center mb-4">
          <LuBookMarked className="text-primary text-2xl mr-2" />
          <div className="flex font-bold text-2xl">Ejecutivos de cuentas</div>
        </div>
        <DataTable
          rows={5}
          paginator
          value={organismData?.executives}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage="No se encontraron registros."
        >

          <Column field="executiveName" header="Nombre" />
          <Column field="executiveEmail" header="Email" />
          <Column field="executivePhoneNumber" header="Telefono" />

        </DataTable>
        {/* <div className="flex justify-content-start align-items-center mb-4">
              <LuBookMarked className="text-primary text-2xl mr-2" />
              <div className="flex font-bold text-2xl">Ejecutivo de cuentas</div>
            </div>
            <div className="flex align-items-center mb-3">
              <div className="font-bold w-5 flex">Nombre: <div className="font-light ml-2">{organismData?.executiveName ?? ""}</div></div>
              <div className="font-bold w-5 flex">Teléfono: <div className="font-light ml-2">{organismData?.executivePhoneNumber ?? ""}</div></div>
            </div>
            <div className="flex align-items-center mb-3">
              <div className="font-bold w-5 flex">Email: <div className="font-light ml-2" >
                {organismData?.executiveEmail.replace(/;/g, ' ')}</div>
              </div>
            </div> */}
      </div>
    </div>
  );
};

export default OrganismDetailContent;
