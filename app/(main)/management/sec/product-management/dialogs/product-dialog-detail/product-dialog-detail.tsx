"use client";
import { getProductByCode } from "@/API/apis";
import { Constants } from "@/API/constants";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoMdBarcode } from "react-icons/io";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { MdAttachFile } from "react-icons/md";
const useUtils = require('@/app/utils')

export interface ProductDetailProps {
  source_sku: any;
}
export const ProductDetailContent: React.FC<ProductDetailProps> = ({ source_sku, }) => {
  const util = useUtils();
  const toast = useRef<Toast>(null);
  const [documentsArray, setDocumentsArray] = useState<any>([]);
  const [products, setProducts] = useState<any>();


  useEffect(() => {
    getProductByCode(source_sku).then((res: any) => {
      if (res && res.success) {
        // console.log("res",res)
        const data = res.response[0]

        setProducts({
          ...data,
          updatedAt: util.localDate(data.updatedAt),
          state: util.skuState(data.state),
        }
        );

        setDocumentsArray(
          data.skuCertification?.skuCertificationDocuments.map(
            (element: any) => ({
              ...element,
              createdAt: util.localDate(element.createdAt),
              documentType: element.documentType.name,
            })
          )
        );

        // console.log("products",products)
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "En el servicio, intente mas tarde.",
          life: 3000,
        });
      }
    },
      (err) => {
        console.log(err);
      }
    );
  }, [])


  const actionBodyTemplate = (rowData: any) => {
    return (
      <div style={{ maxWidth: "4rem" }} className="flex justify-content-center">
        <Button
          icon="pi pi-file-pdf"
          rounded
          text
          aria-label="PDF"
          onClick={() => {
            const document: any = window.open("", "_blank");
            document.location.assign(
              `${Constants.API_URL_IMAGE}/filebyid/${rowData.idFile}`
            );
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ background: "var(--surface-ground)" }}>
      <div className="w-full text-center mb-5 font-bold text-2xl">
        Producto: {source_sku}
      </div>
      <div className="w-full flex justify-content-between">
        <div className="card flex flex-column w-6 m-2">
          <div className="flex align-items-center">
            <IoMdBarcode className="text-2xl text-primary mr-2" />
            <div className="text-2xl font-bold">DETALLE SKU</div>
          </div>
          <div className="w-full flex justify-content-between pt-5 h-4rem pr-2">
            <div className="flex font-bold mb-3 w-6">
              Departamento: <div className="font-light ml-2">{products?.skuDetail?.descDepto}</div>
            </div>
            <div className="flex font-bold mb-3 w-5">
              Grupo: <div className="font-light ml-2">{products?.skuDetail?.descGrupo}</div>
            </div>
          </div>
          <div className="w-full flex justify-content-between pt-5 h-4rem pr-2">
            <div className="flex font-bold mb-3 w-6">
              Familia: <div className="font-light ml-2">{products?.skuDetail?.descFamilia}</div>
            </div>
            <div className="flex font-bold mb-3 w-5">
              Conjunto: <div className="font-light ml-2">{products?.skuDetail?.descConjunto}</div>
            </div>
          </div>
          <div className="w-full flex justify-content-between pt-5 h-4rem pr-2">
            <div className="flex font-bold mb-3">
              SubFamilia: <div className="font-light ml-2">{products?.skuDetail?.descSubFamilia}</div>
            </div>
          </div>
        </div>
        <div className="card flex flex-column w-6 m-2">
          <div className="flex align-items-center">
            <LiaMapMarkerAltSolid className="text-2xl text-primary mr-2" />
            <div className="text-2xl font-bold ">ORIGEN</div>
          </div>
          <div className="w-full flex justify-content-between pt-5 h-4rem pr-2">
            <div className="flex font-bold mb-3 w-6">
              Proveedor : <div className="font-light ml-2">{products?.provider?.providerName}</div>
            </div>
            <div className="flex font-bold mb-3 w-5">
              Origen de producto : <div className="font-light ml-2">{products?.skuDetail?.origin}</div>
            </div>
          </div>
          <div className="w-full flex justify-content-between pt-5 h-4rem pr-2">
            <div className="flex font-bold mb-3 w-6">
              Gerente : <div className="font-light ml-2">{products?.skuDetail?.manager}</div>
            </div>
            <div className="flex font-bold mb-3 w-5">
              Jefe : <div className="font-light ml-2">{products?.skuDetail?.chief}</div>
            </div>
          </div>
          <div className="w-full flex justify-content-between pt-5 h-4rem pr-2">
            <div className="flex font-bold mb-3 w-6">
              Comprador : <div className="font-light ml-2">{products?.skuDetail?.buyer}</div>
            </div>
            <div className="flex font-bold mb-3 w-5">
              Tipo de compra : <div className="font-light ml-2">{products?.skuDetail?.ordertype}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="card w-4 m-2 flex flex-column">
          <div className="flex">
            <FaBook className="text-2xl text-primary title-icon-top-margin" />
            <div className="text-2xl font-bold mb-4 ml-3">
              CERTIFICACIÓN
            </div>
          </div>
          <div className="flex font-bold mb-4 w-full">
            Sistema de certificación : <div className="font-light ml-2">{products?.skuCertification?.typeCertificationsId}</div>
          </div>
          <div className="flex font-bold mb-4 w-full">
            Código QR : <div className="font-light ml-2">{products?.skuCertification?.idQr}</div></div>
          <div className="flex font-bold mb-4 w-full">
            Modelo certificado : <div className="font-light ml-2">{products?.skuCertification?.certModel}</div></div>
          <div className="flex font-bold mb-4 w-full">
            Vencimiento Eficiencia Energética (E.E) : <div className="font-light ml-2">{products?.skuCertification?.energyEfficiencyExpire}</div>
          </div>
        </div>
        <div className="card w-9 m-2 flex flex-column">
          <div className="flex">
            <MdAttachFile className="text-2xl text-primary title-icon-top-margin" />
            <div className="text-2xl font-bold mb-4 ml-3">
              DOCUMENTOS ADJUNTOS
            </div>
          </div>
          <DataTable
            value={documentsArray}
            rows={5}
            paginator
            emptyMessage="Sin Archivos"
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="createdAt"
              style={{ maxWidth: "4rem" }}
              header="Fecha">
            </Column>
            <Column
              field="documentType"
              style={{ maxWidth: "7rem" }}
              header="Tipo de documento">
            </Column>
            <Column
              field="documentName"
              style={{ maxWidth: "10rem", wordWrap: "break-word" }}
              header="Nombre archivo">
            </Column>
            <Column
              field="comment"
              style={{ maxWidth: "12rem", wordWrap: "break-word" }}
              header="Comentario">
            </Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailContent;
