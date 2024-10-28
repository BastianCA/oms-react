"use client";
import { createEditSkuDocuments, deleteSkuDocuments } from "@/API/api-imagenes";
import { getCertificationSkuXlsx } from "@/API/api-reports-xlsx";

import { createSkuOdbms, getComboDocumentType, getOrganimsByProtocols, getProductByCode, getProtocolsCombo, getSkuOdbms, getSkuOdbmsSecondSearch } from "@/API/apis";
import { Constants } from "@/API/constants";
import HelpDialog from "@/app/shared-components/help-dialog";
import SearchInput from "@/app/shared-components/search-input";
import { useRouter } from "next/navigation";
import { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { OverlayPanel } from "primereact/overlaypanel";
import { ProgressSpinner } from "primereact/progressspinner";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { IoMdBarcode } from "react-icons/io";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import SkuPdf from "./pdf/sku";
const useUtils = require('@/app/utils')



const SkuPage = () => {
  const util = useUtils();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
  const [comboOrganism, setComboOrganism] = useState<any>([]);
  const [quickSearchSku, setQuickSearchSku] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [selectedfileArray, setSelectedfileArray] = useState<any>([]);
  const [comboDocuments, setComboDocuments] = useState<any>([]);
  const [products, setProducts] = useState([]);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const op: any = useRef<OverlayPanel>(null);
  const toast = useRef<Toast>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const inputFileRef = useRef<any>();
  const [protocols, setProtocols] = useState<any[]>([]);
  const [selectedProtocol, setSelectedProtocol] = useState<any>(null);
  const [filteredProtocols, setFilteredProtocols] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<any>([]);
  const [loadingNewSkuButton, setLoadingNewSkuButton] = useState(false);
  const [loadingSaveButton, setLoadingSaveButton] = useState(false);
  const [lockSaveButton, setLockSaveButton] = useState<boolean>();
  const [loading, setLoading] = useState(true);
  const requiredFieldsIndex = [
    'idAgency',
    'idProtocol',
    'certNumber',
    'certModel',
    'idQr',
    'typeCertificationId'
  ]
  const certFormModel = {
    id: "",
    sku: "",
    id_agency: { id: "", name: "" },
    createdAt: "",
    updatedAt: "",
    energyEfficiencyExpire: "",
    idProtocol: { id: "", name: "" },
    certNumber: "",
    certModel: "",
    idQr: "",
    typeCertificationsId: "",
    skuCertificationDocuments: "",
  }
  const [certForm, setCertForm] = useState(certFormModel);
  const [documentForm, setDocumentForm] = useState({
    typeDocument: { id: "", name: "" },
    documentName: "",
    comentary: "",
  });

  const [urlSodimac, setUrlSodimac] = useState<string>("");

  const searchProtocol = (event: AutoCompleteCompleteEvent) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredProtocols;

      if (!event.query.trim().length) {
        _filteredProtocols = [...protocols];
      }
      else {
        _filteredProtocols = protocols.filter((element) => {
          return element.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredProtocols(_filteredProtocols);
    }, 250);
  }



  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      router.push("/");
    }

    getProtocolsCombo().then(
      (data: any) => {
        if (data.response) {
          setProtocols(
            data.response.map((e: any) => ({
              id: e.id,
              name: e.name,
            }))
          );
        }
      },
      () => util.toastShow(toast, "En el servicio, intente más tarde.", "error")
    );
    getComboDocumentType().then(
      (data: any) => {
        setComboDocuments(data);
      },
      () => util.toastShow(toast, "En el servicio, intente más tarde.", "error")
    );
  }, []);

  const handleChange = (event: any) => {

    setLockSaveButton(false)
    if (event.target.name === "idProtocol") {
      setLockSaveButton(true)
      setSelectedProtocol(event.target.value)
      if (event.target.value.id !== undefined) {
        getOrganimsByProtocols(event.target.value.id).then(a => {
          const arr = a.response?.map((b: any) => ({
            id: b.id,
            name: b.name
          }))
          setComboOrganism(arr);
        })
      }
    }
    const { name, value } = event.target;
    setCertForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: any) => {
    setLockSaveButton(false);
    const { id, value } = event.target;
    setCertForm((prevData) => ({
      ...prevData,
      [id]: value,
    }))

  }

  const handleDocumentChange = (event: any) => {
    const { name, value } = event.target;
    setDocumentForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const commonSetCertForm = (source: any) => {
    setCertForm((prev: any) => ({
      ...prev,
      id: source.skuCertification?.id,
      sku: source?.sku,
      createdAt: source.skuCertification?.createdAt,
      updatedAt: source.skuCertification?.updatedAt,
      energyEfficiencyExpire: source.skuCertification?.energyEfficiencyExpire,
      idProtocol: setProtocol(source.skuCertification?.protocol?.id, source.skuCertification?.agency?.id),
      certNumber: source.skuCertification?.certNumber,
      certModel: source.skuCertification?.certModel,
      idQr: source.skuCertification?.idQr,
      typeCertificationsId: source.skuCertification?.typeCertificationsId,
      skuCertificationDocuments:
        source.skuCertification?.skuCertificationDocuments,
    }));
  }

  const productSelect = (e: any) => {
    if (e.data.skuCertification !== null) {
      commonSetCertForm(e.data)
    } else {
      setCertForm(() => ({
        ...certFormModel,
        sku: e.data.sku
      }));
    }

    setSelectedfileArray(
      e.data.skuCertification?.skuCertificationDocuments.map(
        (element: any) => ({
          ...element,
          createdAt: util.localDate(element.createdAt),
          documentType: element.documentType.name,
        })
      )
    );
    setUrlSodimac(util.URL_SODIMAC + e.data.sku);
    setImageSrc(util.IMAGE_SRC + e.data.sku);

    setShowForm(true);
    setSelectedFile("");
    const fileInput = document.getElementById(
      "upload-button"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
    setDocumentForm((a) => ({
      ...a,
      typeDocument: { id: "", name: "" },
      documentName: "",
      comentary: "",
    }));

    setQuickSearchSku("")
    op.current.hide();
  };

  const handleFileChange = () => {
    const selectedFile: any = inputFileRef.current.files[0];

    if (selectedFile?.type === "application/pdf") {
      setSelectedFile(selectedFile);
      setDocumentForm((prevData) => ({
        ...prevData,
        documentName: selectedFile.name,
      }));
    } else {
      util.toastShow(toast, "Ingrese un documento valido. (pdf)", "error");
    }
  };


  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-file-pdf"
          rounded
          text
          tooltip="Ver Archivo"
          tooltipOptions={{
            position: "left",
            at: "left+6 top+18",
            my: "right center+2"
          }}
          aria-label="PDF"
          onClick={() => {
            const document: any = window.open("", "_blank");
            document.location.assign(
              `${Constants.API_URL_IMAGE}/filebyid/${rowData.idFile}`
            );
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          tooltip="Eliminar Archivo"
          tooltipOptions={{
            position: "left",
            at: "left+6 top+18",
            my: "right center+2"
          }}
          aria-label="Delete"
          onClick={() => {
            deleteSkuDocuments(rowData).then(() =>
              util.toastShow(toast, "Documento eliminado correctamente.")
            );
            const _files = selectedfileArray.filter(
              (val: any) => +val.id !== +rowData.id
            );
            setSelectedfileArray(_files);
          }}
        />
      </div>
    );
  };

  const checkRequiredFields = (form: any) => {
    let result = false
    requiredFieldsIndex.forEach((key) => {
      if (["", "null"].includes(form[key] + ''))
        result = true
    })
    return result
  }

  const handleSubmit = () => {
    console.log(selectedProtocol);

    setLoadingSaveButton(true);
    const body: any = {
      id: certForm.id,
      sku: certForm.sku,
      idAgency: certForm.id_agency?.id,
      idProtocol: +selectedProtocol.id,
      energyEfficiencyExpire: certForm.energyEfficiencyExpire,
      certNumber: certForm.certNumber,
      certModel: certForm.certModel,
      idQr: certForm.idQr,
      typeCertificationId: certForm.typeCertificationsId,
      blameUser: JSON.parse(localStorage.getItem("userData") ?? "{}").id,
    };

    if (checkRequiredFields(body)) {
      util.toastShow(toast, "Complete los campos obligatorios.", "warn")
      setLoadingSaveButton(false);
    }
    else {

      // createEditSku(body, certForm.id ? "PUT" : "POST").then(
      //   (data: any) => {
      //     setLoadingSaveButton(false);
      //     setLockSaveButton(true);
      //     if (data?.success) {
      //       util.toastShow(toast, data.message);
      //       if (data.response !== null) {
      //         updateSelectedProduct(data.response);
      //       }
      //     } else {
      //       util.toastShow(toast, data.message, "error");
      //     }
      //   },
      //   () => {
      //     setLoadingSaveButton(false);
      //     setLockSaveButton(true);
      //     util.toastShow(toast, "En el servicio, intente más tarde.", "error");
      //   }
      // );

    }
  };

  const handleClick = (e: any) => {
    setTimeout(() => {
      getProducts("");
    }, 1000);

    op.current.toggle(e);
  };

  const getProducts = (data: any) => {
    getProductByCode(data.target?.value ? data.target?.value : "").then((data: any) => {
      if (data?.success) {
        // console.log("data", data)
        setProducts(
          data.response.map((element: any) => ({
            ...element,
            updatedAt: util.localDate(element?.skuCertification?.updatedAt),
            updatedAt_o: element?.skuCertification?.updatedAt,
            state_f: util.skuState(element.state),
          }))
        );
      } else {
        util.toastShow(toast, "En el servicio, intente más tarde.", "error");
      }
      setLoading(false);
    },
      (err: any) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  const searchSKUValue = (value: any) => {
    setQuickSearchSku(value.target.value);
    setNewProduct([])
    setLoading(true);
    if (value.target.value.length >= 3) {
      getProducts(value);
      op.current.show(value);
    } else {
      op.current.hide();
    }
  }
  const getNewSkuFromODBMS = () => {
    setLoadingNewSkuButton(true)
    getSkuOdbms(quickSearchSku).then((data) => {
      if (data?.sku) {
        setLoadingNewSkuButton(false)
        setNewProduct([data]);
      } else {
        getNewSkuFromODBMSSecondSearch()
      }
    });
  }

  const getNewSkuFromODBMSSecondSearch = () => {
    getSkuOdbmsSecondSearch(quickSearchSku).then((data) => {
      setLoadingNewSkuButton(false)
      if (data?.sku) {
        setNewProduct([data]);
      } else {
        setVisible(true);
      }
    });
  }
  const updateSelectedProduct = (product: any) => {
    if (product?.skuCertification) {
      product.skuCertification.updatedAt = util.localDate(product?.skuCertification?.updatedAt)
      product.skuCertification.updatedAt_o = product?.skuCertification?.updatedAt
    }
    product.state_f = util.skuState(product.state)

    setSelectedProduct(product)
    productSelect({ data: product });
  }

  const postNewSkuFromODBMS = (product: any) => {
    setLoadingNewSkuButton(true)
    createSkuOdbms(product).then((data) => {
      // console.log("data", data)
      setNewProduct([])
      setLoadingNewSkuButton(false)
      if (data?.success) {
        updateSelectedProduct(data.response[0])
      } else {
        util.toastShow(toast, "Error en el servicio, intente más tarde.", "error");
      }
    });
  }


  const setProtocol = async (id: number | null, idAgency: number | null): Promise<string | void> => {
    if (id !== null && id !== undefined) {
      const object = protocols.find((a: any) => a?.id === id);

      if (object) {
        setSelectedProtocol(object);
        // const response = await getOrganimsByProtocols(object.id);
        const response: any = { response: [] };
        const arr = response.response?.map((b: any) => ({
          id: b.id,
          name: b.name
        }));
        setComboOrganism(arr);
        const object2 = arr.filter((a: any) => +a?.id === idAgency);

        setCertForm((prev: any) => ({
          ...prev,
          idProtocol: object.id,
          id_agency: object2[0] ?? "",
        }));

        return object.id;

      }
    }
    return "";
  };

  const exportExcel = () => {
    getCertificationSkuXlsx(selectedProduct.sku).then(
      () => {
        util.downloadExcel(`excel/certificationsku/${selectedProduct.sku}`, 'Producto.xlsx');
      },
      () => util.toastShow(toast, "Error al intententar exportar.", "error")
    );
  }

  const loadFile = () => {
    const formDataApi = new FormData();
    formDataApi.append("file", selectedFile);
    formDataApi.append("sku", selectedProduct.sku);
    formDataApi.append("comment", documentForm.comentary);
    formDataApi.append(
      "document_type_id",
      documentForm.typeDocument.id
    );
    formDataApi.append(
      "sku_certification_id",
      selectedProduct.skuCertification.id
    );

    createEditSkuDocuments(formDataApi).then((data) => {
      if (data?.success) {
        productSelect({ data: data.response });
        util.toastShow(toast, "Documento ingresado correctamente.");
      }
    });
    const fileFormat = {
      createdAt: util.localDate(selectedFile.lastModifiedDate),
      documentName: selectedFile.name,
      documentType: documentForm.typeDocument.name,
      comment: documentForm.comentary,
    };
    setSelectedFile("");
    setSelectedfileArray([
      ...selectedfileArray,
      fileFormat
    ])

    setDocumentForm((data) => ({
      ...data,
      typeDocument: { id: "", name: "" },
      documentName: "",
      comentary: "",
    }));
    const fileInput = document.getElementById(
      "upload-button"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  }


  return (
    <div>
      <Toast ref={toast} />
      <p className="general-title" style={{ minHeight: "84px" }}>
        Mantenedor de Producto
      </p>
      <div className="w-full flex justify-content-between align-content-center mb-4">
        <div className="flex flex-wrap align-content-center">
          <div className="general-text mr-5 maintainer-search-label">
            Ingresar Sku
            <HelpDialog
              sourceTitle="Buscador de producto"
              sourceContent="Puede buscar por Sku, Modelo y N° de Certificado."
            />
          </div>
          <div
            id="search-icon"
            onClick={(e) => {
              setLoading(true);
              handleClick(e);
            }}
          />
          <div className="align-items-end flex mb-2">
            <span className="p-input-icon-left mr-5" style={{ display: "flex" }} >
              <i className="pi pi-search lupa-padding" />
              <SearchInput
                sourceOnChange={searchSKUValue}
              />
            </span>
          </div>
          <Button
            label="Ver todos"
            icon="pi pi-bars"
            outlined
            rounded
            className="font-bold min-button-width mb-2"
            onClick={() => {
              document.getElementById("search-icon")?.click();
            }}
          />
        </div>
      </div>
      {showForm && (
        <>
          <div className="card flex justify-content-between">
            <div className="flex flex-column">
              <div className="w-11 flex flex-wrap mb-5 justify-content-between">
                <div className="text-2xl mb-3">
                  <label className="font-bold mr-3">Sku : {selectedProduct.sku} </label>
                </div>
                <div className="text-2xl mb-3">
                  <label className="font-bold mr-3">Modelo : {selectedProduct.modelSkuProduct} </label>
                </div>
                <div className="text-2xl mb-3">
                  <label className="font-bold mr-3">Marca : {selectedProduct.brandSkuProduct} </label>
                </div>
              </div>
              <div className="text-6xl font-light mb-6">
                {selectedProduct.descriptionSkuProduct}
              </div>
              <div className="flex flex-wrap">
                <div className="flex mb-5" >
                  <label style={{ width: "140px" }} className="font-bold mr-2">Estado de Sku:</label>
                  <div style={{ width: "200px" }}>
                    <Tag severity={selectedProduct.state_f === "Activo" ? "success" : "danger"} value={selectedProduct.state_f}></Tag>
                  </div>
                </div>
                <div className="flex mb-5" >
                  <label style={{ width: "140px" }} className="font-bold mr-2">Usuario Actualización:</label>
                  <div style={{ width: "200px" }} className="font-light">{selectedProduct.skuCertification?.user.fullName}</div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="flex mb-5" >
                  <label style={{ width: "140px" }} className="font-bold mr-2">Fecha Creación:</label>
                  <div style={{ width: "200px" }} className="font-light">{util.localDate(selectedProduct.createdAt)}</div>
                </div>
                <div className="flex mb-5" >
                  <label style={{ width: "140px" }} className="font-bold mr-2">Fecha Actualización:</label>
                  <div style={{ width: "200px" }} className="font-light">{util.localDate(selectedProduct.skuCertification?.updatedAt)}</div>
                </div>
              </div>
              {/* <div>
                <Button className="border-round-3xl" outlined icon={selectedProduct.state_f === "Activo" ? "pi pi-lock" : "pi pi-lock-open"}
                  label={selectedProduct.state_f === "Activo" ? "Inactivar SKU" : "Activar SKU"}
                  severity={selectedProduct.state_f === "Activo" ? "danger" : "success"} onClick={() => {
                    // inactivateSku(selectedProduct.sku).then(a => {
                    //   if (a.success) {
                    //     util.toastShow(toast, "Estado de sku actualizado correctamente.")
                    //     setSelectedProduct((prevData: any) => ({
                    //       ...prevData,
                    //       state_f: selectedProduct.state_f === "Activo" ? "Inactivo" : "Activo"
                    //     }))
                    //   } else {
                    //     util.toastShow(toast, a.message, "error")
                    //   }
                    // }, () => {
                    //   util.toastShow(toast, "En el servicio, intente más tarde.", "error")
                    // })
                  }} />
              </div> */}
            </div>
            <div className="flex justify-content-center align-items-start w-4" style={{ minWidth: "340px" }}>
              <div className="flex justify-content-center flex-column align-items-center">
                {!imageSrc && (
                  <div
                    className="border-round bg-primary font-bold  m-3 flex align-items-center justify-content-center"
                    style={{ width: "150px", height: "150px" }}
                  >
                    imagen
                  </div>
                )}
                {imageSrc && (
                  <div className="border-round border-primary border-solid p-3 m-3 flex align-items-center justify-content-center">
                    <img
                      src={imageSrc}
                      style={{ width: "150px", height: "150px" }}
                      alt="Imagen seleccionada"
                    />
                  </div>
                )}
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    const nuevaVentana: any = window.open("", "_blank");
                    nuevaVentana.location.assign(urlSodimac);
                  }}
                >
                  Ver en Sodimac.cl
                </div>
              </div>
              <div className="flex flex-column justify-content-center align-items-center">
                <Button
                  outlined
                  label="Exportar PDF"
                  icon="pi pi-file-pdf"
                  rounded
                  className="mt-3"
                  style={{ height: "40px", width: "150px" }}
                  onClick={() => {

                    console.log(selectedProduct);

                    SkuPdf(imageSrc, selectedProduct, certForm, selectedfileArray, protocols)
                  }}
                />
                <Button
                  outlined
                  label="Exportar XLS"
                  icon="pi pi-file-excel"
                  rounded
                  className="mt-3"
                  style={{ height: "40px", width: "150px" }}
                  onClick={() => exportExcel()}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-content-between">
            <div className="card flex flex-column" style={{ width: "49%" }}>
              <div className="flex align-items-start">
                <IoMdBarcode className="text-2xl text-primary title-icon-top-margin" />
                <div className="text-2xl font-bold ml-3 mb-4">
                  DETALLE SKU
                </div>
              </div>
              <div className="flex flex-column">
                <div className="w-full flex flex-wrap   ">
                  <div className="flex mb-2 mt-2 mr-5 ">
                    <label style={{ width: "110px" }} className="font-bold ">Departamento:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.descDepto}</div>
                  </div>
                  <div className="flex mb-2 mt-2">
                    <label style={{ width: "110px" }} className="font-bold">Grupo:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.descGrupo}</div>
                  </div>
                </div>

                <div className="w-full flex flex-wrap   ">
                  <div className="flex mb-2 mt-2 mr-5 ">
                    <label style={{ width: "110px" }} className="font-bold ">Familia:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.descFamilia}</div>
                  </div>
                  <div className="flex mb-2 mt-2">
                    <label style={{ width: "110px" }} className="font-bold">Conjunto:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.descConjunto}</div>
                  </div>
                </div>
                <div className="w-full flex flex-wrap ">
                  <div className="flex mb-2 mt-2 mr-5">
                    <label style={{ width: "110px" }} className="font-bold ">SubFamilia:</label>
                    <div style={{ width: "170px" }} className="font-light ">{selectedProduct.skuDetail?.descSubFamilia}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card flex flex-column" style={{ width: "49%" }}>
              <div className="flex align-items-start">
                <LiaMapMarkerAltSolid className="text-2xl text-primary title-icon-top-margin" />
                <div className="text-2xl font-bold ml-3 mb-4 ">ORIGEN</div>
              </div>
              <div className="flex flex-column">
                <div className="w-full flex flex-wrap">
                  <div className="flex mb-2 mt-2 mr-5 ">
                    <label style={{ width: "110px" }} className="font-bold ">Proveedor:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.provider?.providerName}</div>
                  </div>
                  <div className="flex mb-2 mt-2">
                    <label style={{ width: "110px" }} className="font-bold ">Origen de producto:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.origin}</div>
                  </div>
                </div>
                <div className="w-full flex flex-wrap">
                  <div className="flex mb-2 mt-2 mr-5 ">
                    <label style={{ width: "110px" }} className="font-bold ">Gerente:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.manager}</div>
                  </div>
                  <div className="flex mb-2 mt-2">
                    <label style={{ width: "110px" }} className="font-bold ">Jefe:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.chief}</div>
                  </div>
                </div>
                <div className="w-full flex flex-wrap">
                  <div className="flex mb-2 mt-2 mr-5 ">
                    <label style={{ width: "110px" }} className="font-bold ">Comprador:</label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.buyer}</div>
                  </div>
                  <div className="flex mb-2 mt-2">
                    <label style={{ width: "110px" }} className="font-bold "> Tipo de compra: </label>
                    <div style={{ width: "170px" }} className="font-light">{selectedProduct.skuDetail?.ordertype}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="card w-full">
            <div className="flex align-items-start">
              <FaBook className="text-2xl text-primary title-icon-top-margin" />
              <div className="text-2xl font-bold mb-4 ml-3">CERTIFICACIÓN</div>
            </div>
            <div className="flex align-items-center mb-5">
              <div style={{ width: "200px" }} className="mt-3 mb-3 mr-5">
                <label className="font-bold block mb-2">Sistema de certificación</label>
                <div className="flex align-items-center mt-4">
                  <RadioButton
                    inputId="certifiation13"
                    name="typeCertificationsId"
                    value={13}
                    onChange={handleChange}
                    checked={+certForm.typeCertificationsId === 13}
                    className={certForm.typeCertificationsId === "" ? "p-invalid" : ""}
                  />
                  <label htmlFor="certifiation13" className="ml-2">
                    Sistema 013
                  </label>
                </div>
                <div className="flex align-items-center mt-4">
                  <RadioButton
                    inputId="certification22"
                    name="typeCertificationsId"
                    value={22}
                    onChange={handleChange}
                    checked={+certForm.typeCertificationsId === 22}
                    className={certForm.typeCertificationsId === "" ? "p-invalid" : ""}
                  />
                  <label htmlFor="certification22" className="ml-2">
                    Sistema 022
                  </label>
                </div>
              </div>
              <div className="mt-3 mb-3 mr-5" style={{ width: "35%" }}>
                <label htmlFor="idProtocol" className="font-bold block mb-6">
                  Protocolo
                </label>
                <AutoComplete
                  className={certForm.idProtocol?.id === "" ? "p-invalid" : ""}
                  style={{ width: "100%" }}
                  maxLength={200}
                  field="name"
                  name="idProtocol"
                  value={selectedProtocol}
                  suggestions={filteredProtocols}
                  completeMethod={searchProtocol}
                  onChange={handleChange}
                  dropdown
                />

              </div>
              <div className="mt-3 mb-3 mr-5" style={{ width: "25%" }}>
                <label htmlFor="certModel" className="font-bold block mb-6">Modelo certificado</label>
                <InputText
                  name="certModel"
                  maxLength={50}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  value={certForm.certModel}
                  className={certForm.certModel === "" ? "p-invalid" : ""}
                />
              </div>

            </div>
            <div className="flex align-items-center">
              <div className="w-full flex flex-wrap">
                <div className="flex flex-column mt-3 mb-3 mr-5 flex-wrap">
                  <label htmlFor="id_agency" className="font-bold">Organismo</label>
                  <Dropdown
                    style={{ width: "200px" }}
                    id="id_agency"
                    options={comboOrganism}
                    value={certForm.id_agency}
                    optionLabel="name"
                    onChange={handleSelectChange}
                    className={certForm?.id_agency?.id === "" ? "p-invalid" : ""}
                  ></Dropdown>
                </div>
                <div className="flex flex-column mt-3 mb-3 mr-5 flex-wrap">
                  <label htmlFor="energyEfficiencyExpire" className="font-bold">
                    Vencimiento Eficiencia Energética (E.E)
                  </label>
                  <Calendar
                    name="energyEfficiencyExpire"
                    value={util.dateWithoutTimezone(certForm.energyEfficiencyExpire)}
                    onChange={handleChange}
                    showIcon
                    dateFormat={'dd/mm/yy'}
                    locale="es"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="flex flex-wrap align-items-center">
                  <div className="flex flex-column mt-3 mb-3 mr-5 flex-wrap">
                    <label htmlFor="certNumber" className="font-bold">N° de certificado</label>
                    <InputText
                      name="certNumber"
                      maxLength={100}
                      style={{ width: "200px" }}
                      onChange={handleChange}
                      value={certForm.certNumber}
                      className={certForm.certNumber === "" ? "p-invalid" : ""}
                    />
                  </div>
                  <div className="flex flex-column mt-3 mb-3 mr-5 flex-wrap">
                    <label htmlFor="idQr" className="font-bold">Código QR</label>
                    <InputText
                      name="idQr"
                      maxLength={45}
                      style={{ width: "200px" }}
                      onChange={handleChange}
                      value={certForm.idQr}
                      className={certForm.idQr === "" ? "p-invalid" : ""}
                    />
                  </div>
                </div>
              </div>
            </div> */}

          {/* <div className="w-full flex justify-content-end">
              <div>
                <Button
                  label="Cancelar"
                  rounded
                  className="mt-3 ml-5"
                  style={{ height: "35px" }}
                  onClick={() => setShowForm(false)}
                />
                <Button
                  label="Guardar"
                  loading={loadingSaveButton}
                  rounded
                  disabled={lockSaveButton}
                  className="mt-3 ml-5"
                  style={{ height: "35px" }}
                  onClick={() => handleSubmit()}
                />
              </div>
            </div> 
          </div>
            */}

          {/* {selectedProduct.skuCertification !== null && (
            <div className="card w-full">
              <div className="flex align-items-start">
                <MdAttachFile className="text-2xl text-primary title-icon-top-margin" />
                <div className="text-2xl font-bold ml-3 mb-4">
                  DOCUMENTOS ADJUNTOS
                </div>
              </div>
              <div className="w-full flex align-items-center mb-5 flex-wrap">
                <div className="flex flex-column mr-4">
                  <label htmlFor="typeDocument">Tipo de archivo</label>
                  <Dropdown
                    style={{ width: "300px" }}
                    name="typeDocument"
                    options={comboDocuments}
                    emptyMessage="Sin registros."
                    value={documentForm.typeDocument}
                    optionLabel="name"
                    onChange={(e: any) =>
                      setDocumentForm((prevData) => ({
                        ...prevData,
                        typeDocument: e.target.value,
                      }))
                    }
                  ></Dropdown>
                </div>
                <div className="flex flex-column mr-4">
                  <span
                    className="p-input-icon-right"
                    onClick={() => {
                      const input: any =
                        document.getElementById("upload-button");
                      input.click();
                    }}
                  >
                    <label htmlFor="documentName">Adjuntar certificado</label>
                    <InputText
                      style={{ width: "100%" }}
                      name="documentName"
                      value={documentForm.documentName}
                      onChange={handleDocumentChange}
                      placeholder="Adjuntar archivo"
                      disabled
                    />
                    <i className="pi pi-upload" style={{ marginTop: "0px" }} />
                  </span>
                </div>
                <input
                  id="upload-button"
                  className="hidden"
                  type="file"
                  accept=".pdf"
                  ref={inputFileRef}
                  onChange={handleFileChange}
                />
                <div className="flex flex-wrap align-items-center">
                  <div className="flex flex-column mr-4">
                    <label htmlFor="comentary">Comentario</label>
                    <InputText
                      maxLength={150}
                      name="comentary"
                      value={documentForm.comentary}
                      onChange={handleDocumentChange}
                      style={{ width: "400px" }}
                    />
                  </div>
                  <Button
                    label="Cargar Archivo"
                    icon="pi pi-upload"
                    rounded
                    className="mt-3"
                    style={{ height: "40px" }}
                    disabled={
                      documentForm.typeDocument.id === "" ||
                      documentForm.comentary === "" ||
                      selectedFile.type !== "application/pdf"
                    }
                    onClick={() => loadFile()}
                  />
                </div>
              </div>
              <div className="border-solid border-round div-5 border-50">
                <DataTable
                  value={selectedfileArray}
                  rows={5}
                  paginator
                  emptyMessage="Sin Archivos"
                >
                  <Column
                    style={{ maxWidth: "4.5rem" }}
                    field="createdAt"
                    header="Fecha"
                    align="center"
                  />
                  <Column
                    style={{ maxWidth: "10rem" }}
                    field="documentType"
                    header="Tipo de documento"
                  />
                  <Column
                    style={{ maxWidth: "12rem", wordWrap: "break-word" }}
                    field="documentName"
                    header="Nombre archivo"
                  />
                  <Column
                    field="comment"
                    header="Comentario"
                    style={{ maxWidth: "14rem", wordWrap: "break-word" }}
                  />
                  <Column
                    body={actionBodyTemplate}
                    header="Acciones"
                    align="center"
                  />
                </DataTable>
              </div>
            </div>
          )} */}
        </>
      )}
      <OverlayPanel
        ref={op}
        onHide={() => { setNewProduct([]) }}
        dismissable={false}
        showCloseIcon
        className="product-search-overlay"
        style={{ minWidth: "120vh" }}
      >
        {loading && (
          <ProgressSpinner className="flex justify-content-center align-items-center" />
        )}
        {!loading && newProduct.length === 0 && (
          <DataTable
            value={products}
            selectionMode="single"
            paginator
            rows={5}
            removableSort
            emptyMessage="No se encontraron resultados."
            selection={selectedProduct}
            onSelectionChange={(e: any) => {
              setSelectedProduct(e.value);
            }}
            onRowClick={productSelect}
          >
            <Column
              field="sku"
              header="Sku"
              sortable
              style={{ width: "6rem" }}
              align="center"
            />
            <Column
              field="modelSkuProduct"
              header="Modelo"
              sortable
              className="td-ellipsis"
              style={{ maxWidth: "6rem", minWidth: "6rem" }}
            />
            <Column
              field="descriptionSkuProduct"
              header="Descripción"
              sortable
              className="td-ellipsis"
              style={{ maxWidth: "14rem", minWidth: "14rem" }}
            />
            <Column
              field="updatedAt"
              header="Última gestión"
              sortable
              style={{ maxWidth: "10rem" }}
              align="center"
              sortField="updatedAt_o"
            />
            <Column
              field="skuCertification.certNumber"
              header="N° Certificado"
              style={{ maxWidth: "9rem", minWidth: "9rem" }}
              align="center"
              className="td-ellipsis"
            />
            <Column
              field="state_f"
              header="Estado"
              sortable
              align="center"
              sortField="state"
              style={{ width: "6rem" }}
            />
          </DataTable>
        )}
        {products.length === 0 && !loading && newProduct.length === 0 && (
          <div className="flex justify-content-end pt-2">
            <Button
              label="Buscar Sku en ODBMS"
              loading={loadingNewSkuButton}
              onClick={() => getNewSkuFromODBMS()}
            />
          </div>
        )}
        {newProduct.length !== 0 && (
          <div>
            <DataTable
              value={newProduct}
              emptyMessage="No se encontraron resultados."
            >
              <Column
                field="sku"
                header="Sku"
                style={{ minWidth: "12rem" }}
                align="center"
              />
              <Column
                field="descripcion_producto"
                header="Descripción"
                style={{ minWidth: "8rem" }}
              />
              <Column
                field="modelo"
                header="Modelo"
                style={{ minWidth: "8rem" }}
              />
              <Column
                field="marca"
                header="Marca"
                style={{ minWidth: "8rem" }}
              />
              <Column
                field="nombre_proveedor"
                header="Nombre proveedor"
                style={{ minWidth: "8rem" }}
              />
            </DataTable>
            <div className="flex justify-content-end pt-2">
              <Button
                label="Importar Sku"
                loading={loadingNewSkuButton}
                onClick={() => postNewSkuFromODBMS(newProduct[0])}
              />
            </div>
          </div>
        )}
      </OverlayPanel>
      {!showForm && (
        <div>
          <div className="p-4 absolute bottom-0 right-0 font-semibold text-xl flex align-items-center">
            <div className="logo-tricot 2"></div>
          </div>
        </div>
      )}
      <Dialog
        header="No existe SKU"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="m-1">
          Ese producto no existe en ODBMS, consulta con el administrador.
        </div>
        <div className="w-full flex justify-content-end">
          <Button
            rounded
            label="Aceptar"
            onClick={() => {
              setVisible(false)
              op.current.hide();
            }}
          />
        </div>
      </Dialog>

    </div>
  );
};

export default SkuPage;
