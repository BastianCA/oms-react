"use client";
import { createEditCertDocuments, deleteCertDocuments } from "@/API/api-imagenes";
import { getCertificationDocumentType, getCertificationDocuments, getCertificationLote, getCertificationSli, getChangeHistory, getProductByCode, getWmosDetails, saveCertification } from "@/API/apis";
import { Constants } from "@/API/constants";
import SharedDialog, { usePopup } from "@/app/shared-components/shared-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Timeline } from "primereact/timeline";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaDatabase, FaRegBell } from "react-icons/fa";
import { IoIosAdd, IoMdBarcode } from "react-icons/io";
import {
  IoInformationCircleOutline,
  IoOpenOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { LuSearchCheck } from "react-icons/lu";
import { MdAttachFile, MdOutlineLock, MdOutlineLockOpen } from "react-icons/md";
import { RxCounterClockwiseClock } from "react-icons/rx";
import IncidentDialogContent from "./action-dialogs/add-incident-dialog/add-incident-dialog";
import AditionalServicesDialog from "./action-dialogs/aditional-services/aditional-services";
import GenerateNotificationsContent from "./action-dialogs/generate-notifications-dialog/generate-notifications-dialog";
import { UpdateOpDialogContent } from "./action-dialogs/update-op/update-op";
import OcDialogDetailContent from "./dialogs/oc-detail-dialog/oc-dialog-detail";
import OrganismDetailContent from "./dialogs/organism-dialog-detail/organism-dialog-detail";
import ProductDetailContent from "./dialogs/product-dialog-detail/product-dialog-detail";
import ProtocolDialog from "./dialogs/protocol-dialog/protocol-dialog";
import WmosContent from "./dialogs/wmos-dialog-detail/wmos-dialog-detail";

const useUtils = require('@/app/utils')


const ProductManagement = () => {
  const util = useUtils();
  const [selectedFile, setSelectedFile] = useState<any>("");
  const [styleSelected, setStyleSelected] = useState<any>({ width: "80vw" });
  const router = useSearchParams();
  const routerLink = useRouter();
  const [titleDialog, setTitleDialog] = useState<any>("");
  const [iconDialog, setIconDialog] = useState<any>("");
  const [styleDialog, setStyleDialog] = useState<any>("");
  const [certificationData, setCertificationData] = useState<any>();
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [wmosWarning, setWmosWarning] = useState<boolean>(false);
  const [sliData, setSliData] = useState<any>()
  const [skuData, setSkuData] = useState<any>()
  const [bodyContentDialog, setBodyContentDialog] = useState<any>("");
  const [comboDocuments, setComboDocuments] = useState<any>([]);
  const [historyChanges, setHistoryChanges] = useState<any>([]);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [sliGetError, setSliGetError] = useState('');
  const toast = useRef<Toast>(null);
  const [selectedfileArray, setSelectedfileArray] = useState<any>([]);

  const [comboFase, setComboFase] = useState<any>([]);
  const comboResolution = useMemo(() => [
    { id: 1, name: "Rechazada" },
    { id: 2, name: "Aceptada" },
  ], []);
  const [showPopup, popupContent, handleShowPopup, handleHidePopup] =
    usePopup();
  const [formData, setFormData] = useState({
    fase: { id: "", name: "" },
    resolution: { id: "", name: "" },
    coordinationDate: "",
    inspectionDate: "",
    sendedExamples: "",
    emisionDate: "",
    trackingCertificate: "",
    numCi: "",
    sendExamples: "",
    translateGuide: "",
    transfer: "",
    observation: "",
    statusVa: false,
    initialTest: "",
  });
  const inputFileRef = useRef<any>();
  const [documentForm, setDocumentForm] = useState({
    typeDocument: { id: "", name: "" },
    documentName: "",
  });

  const dialogIndex: any = {
    fechaCoordinacion: {
      title: "Fecha de coordinación",
      content: "Registro de cuando se envía la notificación al organismo certificador.",
      width: "30vw"
    },
    inspectionDate: {
      title: "Fecha de inspección",
      content: "Fecha de compromiso del organismo certificador para asistir a la inspección del lote en bodega.",
      width: "30vw"
    },
    sendExamples: {
      title: "Fecha envío de muestras",
      content: "Fecha en que el transportista envía muestras al laboratorio.",
      width: "30vw"
    },
    initialTest: {
      title: "Fecha inicio de ensayos",
      content: "Fecha que las muestras se encuentran en dependencias del organismo certificador para los ensayos.",
      width: "30vw"
    },
    fechaFinEnsayo: {
      title: "Fecha fin de ensayo",
      content: "Fecha calculada a partir de los días hábiles promedio de certificación, ingresados en el mantenedor de productos y la fecha de inspección registrada.",
      width: "30vw"
    },
    notification: {
      title: "Notificación",
      content: "Aquí podrás cargar todos los adjuntos correspondientes, tanto guías, certificados, entre otros. Recuerda subirlos en formato PDF.",
      width: "30vw"
    },
    incidents: {
      title: "Incidencias",
      content: " Por favor, registra las incidencias en el proceso de certificación. Consulta el historial de cambios para seguimiento.",
      width: "30vw"
    },
    services: {
      title: "Servicios adicionales",
      content: " Por favor, registra los servicios adicionales en el proceso de certificación. Consulta el historial de cambios para seguimiento.",
      width: "30vw"
    }
  }

  const handleCloseDialog = (data: any) => {

    if (data === "Incidencia creada") {
      util.toastShow(toast, "Incidencia creada correctamente.")
      getAndLoadHistory(certificationData.idCertificacion)
    }
    if (data === "notification") {
      util.toastShow(toast, "Notificación envíada correctamente.")
      getAndLoadHistory(certificationData.idCertificacion)
    }
    if (data === "Servicio adicional creado") {
      util.toastShow(toast, "Servicio agregado correctamente.")
      getAndLoadHistory(certificationData.idCertificacion)
    }
    if (data?.message && data?.message === "OP Actualizada") {
      util.toastShow(toast, "Lote actualizado correctamente.")
      getCertificationLote(data?.lote).then((a) => {
        if (a?.success && a?.response) {
          setCertificationData(a.response)

          getAndLoadProduct(a.response.sku)
          getAndLoadHistory(a.response.idCertificacion)
          getAndLoadDocuments(a.response.idCertificacion);
          getAndLoadSLI(a.response?.oc, a.response.sku)

          setFormData((prev: any) => ({
            ...prev,
            fase: getFase(a.response?.phaseTypeId),
            resolution: getResolutionValue(a.response.resolucion),
            coordinationDate: util.validateDate(a.response?.fechaCoordinacion),
            emisionDate: util.validateDate(a.response?.fechaEmision),
            inspectionDate: util.validateDate(a.response?.fechaInspeccion),
            trackingCertificate: util.blankIfNull(a.response?.numeroCertificadoSeguimiento),
            numCi: util.blankIfNull(a.response?.ciNumber),
            sendExamples: util.validateDate(a.response?.fechaEnvioMuestras),
            sendedExamples: util.blankIfNull(a.response?.numeroMuestras),
            translateGuide: util.blankIfNull(a.response?.numeroGuia),
            transfer: util.blankIfNull(a.response?.transferencia),
            observation: util.blankIfNull(a.response?.observaciones),
            statusVa: a.response?.batchStateId === 2,
            initialTest: util.validateDate(a.response?.fechaInicioEnsayo),
          }))
        }
        getWmosDetails(data?.lote).then((res: any) => {
          setWmosWarning(res.warningLpn)
        })
      });
    }
    if (data?.message ? data?.message.includes("Error") : data?.includes("Error")) {
      util.toastShow(toast, data, "error")
    }
    handleHidePopup();
  };

  const handleDocumentChange = (event: any) => {
    const { name, value } = event.target;
    setDocumentForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoadingSave(true);
    const body = {
      blameUser: JSON.parse(localStorage.getItem("userData") ?? "{}").id,
      poSkuDetailId: evalEmptyValue(certificationData.lote),
      batchStateId: formData.statusVa ? 2 : 1,
      fechaCoordinacion: evalEmptyValue(certificationData.fechaCoordinacion),
      fechaInspeccion: evalEmptyValue(formData.inspectionDate),
      idCertificacion: evalEmptyValue(certificationData.idCertificacion),
      fechaEnvioMuestras: evalEmptyValue(formData.sendExamples),
      numeroMuestras: evalEmptyValue(formData.sendedExamples),
      numeroGuia: evalEmptyValue(formData.translateGuide),
      transferencia: evalEmptyValue(formData.transfer),
      fechaInicioEnsayo: evalEmptyValue(formData.initialTest),
      fechaFinEnsayo: evalEmptyValue(certificationData.fechaFinEnsayo),
      numeroCertificacionSeguimiento: evalEmptyValue(formData.trackingCertificate),
      fechaEmision: evalEmptyValue(formData.emisionDate),
      resolucion: evalEmptyValue(formData.resolution.id),
      observaciones: evalEmptyValue(formData.observation),
      phaseTypeId: evalEmptyValue(formData.fase.id),
      numeroCi: evalEmptyValue(formData.numCi),
    }
    saveCertification(body).then(a => {
      if (a?.success) {
        setLoadingSave(false)
        util.toastShow(toast, "Información actualizada correctamente.")
        getChangeHistory(certificationData.idCertificacion).then(a => {
          if (a.response && a.response.length !== 0) {
            setHistoryChanges(a.response)
          } else {
            setHistoryChanges([])
          }
        });
      } else {
        setLoadingSave(false)
        util.toastShow(toast, a.message, "error")
      }
    }, () => {
      setLoadingSave(false)
      util.toastShow(toast, "Error en el servicio.", "error")
    })
  }

  const evalEmptyValue = (value: any) => {
    return value === "" ? null : value
  }

  const handleFileChange = () => {
    const selectedFile: any = inputFileRef.current.files[0];
    if (selectedFile.type === "application/pdf") {
      setSelectedFile(selectedFile);
      setDocumentForm((prevData) => ({
        ...prevData,
        documentName: selectedFile.name,
      }));
    } else {
      util.toastShow(toast, "Ingrese un tipo de archivo válido. (PDF)", "error")
    }
  };


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (event.target.name === "initialTest") {
      certificationData.fechaFinEnsayo = sumarDiasHabiles(event.target.value, skuData?.skuCertification?.certAveragePeriod)
    }
  };

  const customizedMarker = (item: any) => {
    return (
      <span
        className={
          "flex w-1rem h-1rem align-items-center justify-content-center text-white border-circle z-1 shadow-1 dot-color " +
          item.titulo.toLowerCase()
        }
      ></span>
    );
  };

  const customizedContent = (item: any) => {
    return (
      <div
        className={
          "card flex flex-column border-round-3xl surface-ground card-certification-sec " +
          item.titulo.toLowerCase()
        }
        style={{ width: "520px", minHeight: "130px", paddingTop: "1rem" }}
      >
        <div className="font-bold text-black-alpha-90">
          {item.titulo === "Incidencia" && (<span className="pi pi-exclamation-triangle text-orange-600 mr-3"></span>)}
          {item.titulo.toUpperCase()}</div>
        <div className="flex align-items-center mt-2 font-light text-600">
          <div >{util.localDateHour(item.fecha) + " - " + item.usuario}</div>
        </div>
        <div className="mt-2 mb-2 max-w-max font-light text-600" style={{ wordBreak: "break-word" }}>
          {item.descripcion}
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex justify-content-center">
        <Button
          icon="pi pi-file-pdf"
          tooltip="Ver Archivo"
          tooltipOptions={{
            position: "left",
            at: "left+6 top+18",
            my: "right center+2"
          }}
          rounded
          text
          onClick={() => {
            const document: any = window.open("", "_blank");
            document.location.assign(
              `${Constants.API_URL_IMAGE}/filebyid/${rowData.idFile}`
            );
          }}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Eliminar Archivo"
          tooltipOptions={{
            position: "left",
            at: "left+6 top+18",
            my: "right center+2"
          }}
          rounded
          text
          onClick={() => {
            deleteCertDocuments(rowData).then(() =>
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

  const getResolutionValue = (id: any) => {
    if (id === null) {
      return { id: null, name: null }
    }
    if (id === 1) {
      return { id: 1, name: "Rechazada" }
    }
    return { id: 2, name: "Aceptada" }
  }

  useEffect(() => {
    const data = router.get("lote");
    const filteredFase = JSON.parse(localStorage.getItem("fases") ?? "{}");
    setComboFase(filteredFase.map((a: any) => ({ id: a.id, name: a.name })));
    getCertificationLote(data).then((a) => {
      if (a?.success && a?.response) {
        setCertificationData(a.response)

        getAndLoadProduct(a.response.sku)
        getAndLoadHistory(a.response.idCertificacion)
        getAndLoadDocuments(a.response.idCertificacion);
        getAndLoadSLI(a.response?.oc, a.response.sku)

        setFormData((prev: any) => ({
          ...prev,
          fase: getFase(a.response?.phaseTypeId),
          resolution: getResolutionValue(a.response.resolucion),
          coordinationDate: util.validateDate(a.response?.fechaCoordinacion),
          emisionDate: util.validateDate(a.response?.fechaEmision),
          inspectionDate: util.validateDate(a.response?.fechaInspeccion),
          trackingCertificate: util.blankIfNull(a.response?.numeroCertificadoSeguimiento),
          numCi: util.blankIfNull(a.response?.ciNumber),
          sendExamples: util.validateDate(a.response?.fechaEnvioMuestras),
          sendedExamples: util.blankIfNull(a.response?.numeroMuestras),
          translateGuide: util.blankIfNull(a.response?.numeroGuia),
          transfer: util.blankIfNull(a.response?.transferencia),
          observation: util.blankIfNull(a.response?.observaciones),
          statusVa: a.response?.batchStateId === 2,
          initialTest: util.validateDate(a.response?.fechaInicioEnsayo),
        }))
      }
      getWmosDetails(a.response?.lote).then((res: any) => {
        setWmosWarning(res.warningLpn)
      })
    });

    getCertificationDocumentType().then(
      (data: any) => {
        setComboDocuments(data?.response || []);
      },
      (err) => {
        util.toastShow(toast, err.message, "error")
      }
    );
  }, []);

  const getFase = (id: any) => {
    const filteredFase = JSON.parse(localStorage.getItem("fases") ?? "{}").map((a: any) => ({ id: a.id, name: a.name }));
    const object = filteredFase.filter((a: any) => +a.id === +id)
    return object[0]
  }

  const headerDialogTemplate = () => {
    return (
      <div className="flex justify-content-center font-bold align-items-center">
        <span
          className={"pi " + iconDialog + " text-primary text-2xl mr-2"}
        ></span>{" "}
        {titleDialog}
      </div>
    );
  };

  const bodyDialogTemplate = () => {
    return (
      <div className="flex justify-content-center align-items-center text-center">
        {bodyContentDialog}
      </div>
    );
  };
  const getAndLoadDocuments = (certification_id: any) => {
    getCertificationDocuments(certification_id).then(i => {
      const formatValues = i.response.map((element: any) => ({
        ...element,
        createdAt: util.localDate(element.createdAt)
      }));
      setSelectedfileArray(formatValues)
    })
  }

  const getAndLoadHistory = (certification_id: any) => {
    getChangeHistory(certification_id).then(a => {
      if (a.response && a.response.length !== 0) {
        setHistoryChanges(a.response)
      } else {
        setHistoryChanges([])
      }
    });
  }

  const getAndLoadProduct = (sku_id: any) => {
    getProductByCode(sku_id).then(
      (data: any) => {
        if (data?.success) {
          setSkuData(data.response[0])
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  const getAndLoadSLI = (po_id: any, sku: any) => {
    getCertificationSli(po_id, sku).then((a) => {
      if (a?.success) {
        setSliGetError('')
        setSliData(a)
      }
      else {
        setSliGetError(a?.error)
      }
    });
  }

  const sumarDiasHabiles = (fecha: any, diasASumar: any) => {
    // Verificar si diasASumar es null o 0
    if (diasASumar === null || diasASumar === 0) {
      // Retorna la fecha original sin hacer ningún cambio
      return new Date(fecha);
    }
    // Creamos una nueva instancia de la fecha para evitar modificaciones en la fecha original
    let nuevaFecha = new Date(fecha);
    // Iteramos sobre el número de días a sumar
    for (let i = 0; i < diasASumar; i++) {
      // Añadimos un día a la fecha
      nuevaFecha.setDate(nuevaFecha.getDate() + 1);
      // Verificamos si la fecha resultante es sábado (6) o domingo (0)
      if (nuevaFecha.getDay() === 6 || nuevaFecha.getDay() === 0) {
        // Si es sábado o domingo, sumamos un día más
        nuevaFecha.setDate(nuevaFecha.getDate() + 1);
        // Restamos uno al contador de días a sumar para compensar
        i--;
      }
    }
    // Retornamos la fecha resultante
    return nuevaFecha;
  }


  const loadFile = () => {
    const formDataApi = new FormData();
    formDataApi.append("file", selectedFile);
    formDataApi.append("certification_id", certificationData.idCertificacion);
    formDataApi.append("document_type_id", documentForm.typeDocument.id);

    createEditCertDocuments(formDataApi).then((a) => {
      if (a?.success) {
        getAndLoadDocuments(certificationData.idCertificacion)
        util.toastShow(toast, "Documento guardado correctamente.")
      } else {
        util.toastShow(toast, a.message, "error")
      }
    }, () => {
      util.toastShow(toast, "Error al intentar guardar archivo.", "error")
    });
    setDocumentForm((a) => ({
      ...a,
      typeDocument: { id: "", name: "" },
      documentName: "",
    }));
  }

  const showHelpDialog = (value: any) => {
    setTitleDialog(dialogIndex[value].title);
    setBodyContentDialog(dialogIndex[value].content);
    setStyleDialog({ width: dialogIndex[value].width });
    setIconDialog("pi-info-circle");
    setVisibleDialog(true);
  }

  return (
    <div>
      <Toast ref={toast} />
      <Tooltip target=".custom-target-icon" />
      <div className="general-title">Certificación</div>
      <div className="flex mb-5">
        <div className="w-9 flex flex-column m-2">
          <div className="card" style={{ padding: "1rem", marginBottom: "0.5rem" }}>
            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center">
                <LiaBookSolid className="text-3xl text-primary mr-2" />
                <div className="text-3xl font-bold text-primary flex align-items-center">
                  LOTE:
                  <div className="text-3xl font-bold ml-2 text-primary">{util.blankIfNull(certificationData?.lote)}</div>
                </div>
              </div >
              {/* <Button
                className="border-round-3xl mb-2"
                label="Información WMOS"
                iconPos="right"
                icon={certificationData?.lpnStateWarning ? 'pi pi-exclamation-triangle text-red-500' : null}
                outlined
                onClick={() => {
                  setStyleSelected({ width: "75vw" });
                  handleShowPopup(<WmosContent source_poSkuId={router.get("lote")} />);
                }}
              /> */}
            </div >
            <div className="flex flex-wrap justify-content-around">
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">Sistema:
                  <div className="font-light ml-2">{util.blankIfNull(certificationData?.typeCertificationsId)}</div>
                </label>
              </div>
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">Cantidad SKU:
                  <div className="font-light ml-2">{util.formatMiles(certificationData?.cantidad)}</div>
                </label>
              </div>
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">Bloqueo VA:
                  <div className="font-light ml-2">{util.localDate(certificationData?.bloqueoVa)}</div>
                </label>
              </div>
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">Desbloqueo VA:
                  <div className="font-light ml-2">{util.localDate(certificationData?.desbloqueoVa)}</div>
                </label>
              </div>
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">N° DI:
                  <div className="font-light ml-2">{util.blankIfNull(sliData?.main_info.documento_di)}</div>
                </label>
              </div>
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">Total USD:
                  <div className="font-light ml-2">{util.formatDollar(certificationData?.totalUsd)}</div>
                </label>
              </div>
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">Recepción:
                  <div className="font-light ml-2">{util.localDate(certificationData?.fechaCreacion)}</div>
                </label>
              </div>
              <div className="font-bold mb-1 mt-3 flex flex-wrap mr-2 " style={{ width: "20%" }}>
                <label className="mr-2 flex">Ult. actualización:
                  <div className="font-light ml-2">{
                    util.localDate(certificationData?.ultimaGestion)
                  }</div>
                </label>
              </div>
            </div >
          </div >
          <div className="card" style={{ padding: "1rem", marginBottom: "0.5rem" }}>
            <div className="flex align-items-baseline justify-content-between">
              <div className="flex flex-wrap align-items-center">
                <LuSearchCheck className="text-2xl text-primary mr-2" />
                <div className="text-xl font-bold">
                  COORDINACIÓN DE INSPECCIÓN
                </div>
              </div>
              <div>
                <div className="flex align-items-center mt-2">
                  <label htmlFor="fase" className="font-bold">
                    Fase:{" "}
                  </label>
                  <Dropdown
                    id="fase"
                    emptyMessage="Sin registros."
                    style={{ maxWidth: "150px" }}
                    className={
                      "w-full ml-3 dropDown-sec " +
                      formData.fase.name.toLowerCase()
                    }
                    options={comboFase}
                    value={formData.fase}
                    optionLabel="name"
                    onChange={(e: any) => {
                      setFormData((prevData: any) => ({
                        ...prevData,
                        fase: e.target.value,
                      }))
                      if (e.target.value.name === "Coordinación") {
                        certificationData.fechaCoordinacion = new Date()
                      }
                    }}
                  ></Dropdown>
                </div>
                <div className="flex align-items-center mt-3">
                  <label htmlFor="statusVa" className="font-bold">
                    Estado VA:{" "}
                  </label>
                  <MdOutlineLock className="ml-3 mr-1 text-3xl text-red-700" />
                  <InputSwitch
                    className="ml-2 mr-2 status-va"
                    name="statusVa"
                    checked={formData.statusVa}
                    onChange={(e: InputSwitchChangeEvent) => handleChange(e)}
                  />
                  <MdOutlineLockOpen className="ml-1 text-3xl text-green-700" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap ">
              <div className="flex flex-wrap align-items-center mt-3 mb-3 mr-5">
                <label
                  style={{ minWidth: "140px" }}
                  className="font-bold mr-3">
                  Fecha coordinación{" "}

                  <IoInformationCircleOutline
                    className="text-primary cursor-pointer"
                    onClick={() => showHelpDialog("fechaCoordinacion")}
                  />
                </label>
                <span
                  style={{ width: "200px" }}
                  className="text-gray-600"
                >
                  {util.dateYear(certificationData?.fechaCoordinacion)}
                </span>
              </div>
              <div className="flex align-items-center mt-3 mb-3 flex-wrap">
                <label
                  style={{ minWidth: "140px" }}
                  htmlFor="inspectionDate"
                  className="font-bold mr-3"
                >
                  Fecha de inspección{" "}
                  <IoInformationCircleOutline
                    className="text-primary cursor-pointer"
                    onClick={() => showHelpDialog("inspectionDate")}
                  />
                </label>
                <Calendar
                  name="inspectionDate"
                  style={{ width: "200px" }}
                  value={formData.inspectionDate}
                  onChange={handleChange}
                  showIcon
                />
              </div>
            </div>
            <div className="flex flex-column justify-content-between">
              <Divider className="border-solid surface-border border-1" />
              <div className="flex align-items-center flex-wrap " >
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ minWidth: "140px" }}
                    htmlFor="sendExamples"
                    className="font-bold mr-3"
                  >
                    Envío muestras{" "}
                    <IoInformationCircleOutline
                      className="text-primary cursor-pointer"
                      onClick={() => showHelpDialog("sendExamples")}
                    />
                  </label>
                  <Calendar
                    name="sendExamples"
                    style={{ width: "200px" }}
                    value={formData.sendExamples}
                    onChange={handleChange}
                    showIcon
                  />
                </div>
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ minWidth: "140px" }}
                    htmlFor="sendedExamples"
                    className="font-bold mr-3"
                  >
                    Muestras enviadas
                  </label>
                  <InputNumber
                    name="sendedExamples"
                    value={+formData.sendedExamples}
                    onValueChange={handleChange}
                    showButtons
                    min={0}
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ minWidth: "140px" }}
                    htmlFor="translateGuide"
                    className="font-bold mr-3"
                  >
                    N° Guía Traslado
                  </label>
                  <InputText
                    maxLength={60}
                    min={0}
                    type="number"
                    name="translateGuide"
                    onChange={handleChange}
                    style={{ width: "200px" }}
                    value={formData.translateGuide}
                  />
                </div>
                <div className="flex align-items-center mt-3 mb-3 flex-wrap">
                  <label
                    style={{ minWidth: "140px" }}
                    htmlFor="transfer"
                    className="font-bold mr-3"
                  >
                    Transferencia
                  </label>
                  <InputText
                    maxLength={60}
                    name="transfer"
                    type="number"
                    min={0}
                    onChange={handleChange}
                    style={{ width: "200px" }}
                    value={formData.transfer}
                  />
                </div>
              </div>
              <Divider className="border-solid surface-border border-1" />
              <div className="flex align-items-center flex-wrap " >
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ width: "140px" }}
                    htmlFor="initialTest"
                    className="font-bold mr-3"
                  >
                    Inicio ensayo{" "}
                    <IoInformationCircleOutline
                      className="text-primary cursor-pointer"
                      onClick={() => showHelpDialog("initialTest")}
                    />
                  </label>
                  <Calendar
                    name="initialTest"
                    style={{ width: "200px" }}
                    value={formData.initialTest}
                    onChange={handleChange}
                    showIcon
                  />
                </div>
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ width: "140px" }}
                    htmlFor="initialTest"
                    className="font-bold mr-3"
                  >
                    Fin ensayo{" "}
                    <IoInformationCircleOutline
                      className="text-primary cursor-pointer"
                      onClick={() => showHelpDialog("fechaFinEnsayo")}
                    />
                  </label>
                  <span
                    style={{ width: "200px" }}
                    className="text-gray-600"
                  >
                    {util.dateYear(certificationData?.fechaFinEnsayo)}
                  </span>
                </div>
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ width: "140px" }}
                    htmlFor="emisionDate"
                    className="font-bold mr-3"
                  >
                    Fecha emisión{" "}
                    {/* <IoInformationCircleOutline className="text-primary cursor-pointer" /> */}
                  </label>
                  <Calendar
                    name="emisionDate"
                    style={{ width: "200px" }}
                    value={formData.emisionDate}
                    onChange={handleChange}
                    showIcon
                  />
                </div>
              </div>
              <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ width: "140px" }}
                    htmlFor="trackingCertificate"
                    className="font-bold mr-3"
                  >
                    N° Certificado seguimiento{" "}
                  </label>
                  <InputText
                    maxLength={60}
                    name="trackingCertificate"
                    onChange={handleChange}
                    style={{ width: "200px" }}
                    value={formData.trackingCertificate}
                  />
                </div>
                <div className="flex align-items-center mt-3 mb-3 mr-5 flex-wrap">
                  <label
                    style={{ width: "140px" }}
                    htmlFor="resolution"
                    className="font-bold mr-3"
                  >
                    Resolución
                  </label>
                  <Dropdown
                    style={{ width: "200px" }}
                    name="resolution"
                    options={comboResolution}
                    value={formData.resolution}
                    optionLabel="name"
                    onChange={(e: any) => handleChange(e)}
                    className={"dropDown-resolution " + formData.resolution.name}
                  ></Dropdown>
                </div>
              </div>
              <div className="flex flex-column mt-3 mb-3 flex-wrap">
                <label
                  style={{ width: "140px" }}
                  htmlFor="observation"
                  className="font-bold mr-3"
                >
                  Observaciones
                </label>
                <InputTextarea
                  value={formData.observation}
                  onChange={(e: any) => handleChange(e)}
                  placeholder="Observaciones del proceso"
                  rows={5}
                  maxLength={140}
                  name="observation"
                  aria-describedby="observation-help"
                />
                <small
                  className="mt-1 text-right text-gray-600"
                  id="observation-help"
                >
                  {formData.observation.length + "/140 Caracteres"}
                </small>
              </div>
              <div
                className="flex flex-wrap justify-content-evenly mb-4"
                style={{ fontSize: "1.2rem !important" }}
              >
                <div className="flex align-items-center mt-2" >
                  <div className="flex font-bold align-items-center mr-4">
                    <FaRegBell className="text-primary mr-2" />
                    Notificaciones
                    <IoInformationCircleOutline
                      className="text-primary cursor-pointer ml-2"
                      onClick={() => showHelpDialog("notification")}
                    />
                  </div>
                  {/* <span className="pt-3 pb-3">
                    Aquí podrás cargar todos los adjuntos correspondientes,
                    tanto guías, certificados, entre otros. Recuerda subirlos en
                    formato PDF.
                  </span> */}
                  <Button
                    label="Enviar Notificación"
                    rounded
                    icon="pi pi-bell"
                    className="bg-primary border-none"
                    style={{ maxWidth: "200px", minWidth: "175px", maxHeight: "45px" }}
                    onClick={() => {
                      setStyleSelected({ width: "30vw" });
                      handleShowPopup(
                        <GenerateNotificationsContent
                          data={certificationData?.idCertificacion}
                          handleClose={handleCloseDialog}
                        />
                      );
                    }}
                  />
                </div>
                <div className="flex align-items-center mt-2">
                  <div className="flex font-bold align-items-center mr-4">
                    <IoWarningOutline className="text-orange-600 mr-2" />
                    Incidencias
                    <IoInformationCircleOutline
                      className="text-primary cursor-pointer ml-2"
                      onClick={() => showHelpDialog("incidents")}
                    />
                  </div>

                  <Button
                    label="Agregar incidencia"
                    rounded
                    icon="pi pi-exclamation-triangle"
                    className="bg-primary border-none"
                    style={{ maxWidth: "200px", minWidth: "175px", maxHeight: "45px" }}
                    onClick={() => {
                      setStyleSelected({ minWidth: "650px", maxWidth: "50vw" });
                      handleShowPopup(
                        <IncidentDialogContent
                          data={certificationData}
                          handleClose={handleCloseDialog}
                        />
                      );
                    }}
                  />

                </div>
                <div className="flex align-items-center mt-2">
                  <div className="flex font-bold align-items-center mr-4">
                    <IoIosAdd className="text-primary mr-2" />
                    Servicios adicionales
                    <IoInformationCircleOutline
                      className="text-primary cursor-pointer ml-2"
                      onClick={() => showHelpDialog("services")}
                    />
                  </div>

                  <Button
                    label="Servicios adicionales"
                    rounded
                    icon="pi pi-plus"
                    className="bg-primary border-none"
                    style={{ maxWidth: "200px", minWidth: "175px", maxHeight: "45px" }}
                    onClick={() => {
                      setStyleSelected({ minWidth: "650px", maxWidth: "50vw" });
                      handleShowPopup(
                        <AditionalServicesDialog
                          data={certificationData}
                          handleClose={handleCloseDialog}
                        />
                      );
                    }}
                  />

                </div>
              </div>
            </div>
          </div>
          <div className="card w-full p-3">
            <div className="flex align-items-start">
              <MdAttachFile className="text-2xl text-primary title-icon-top-margin" />
              <div className="text-2xl font-bold ml-3 mb-4">DOCUMENTOS ADJUNTOS</div>
            </div>
            <div className="w-full flex justify-content-between mb-5 flex-wrap">
              <div className="flex">
                <div className="w-full flex flex-column">
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
                <div className="w-full flex flex-column ml-4">
                  <span className="flex flex-column p-input-icon-right" onClick={() => {
                    const input: any =
                      document.getElementById("upload-button");
                    input.click();
                  }}>
                    <label htmlFor="documentName">Adjuntar certificado</label>
                    <InputText
                      maxLength={60}
                      style={{ maxWidth: "200px", minWidth: "20%" }}
                      name="documentName"
                      value={documentForm.documentName}
                      onChange={handleDocumentChange}
                      placeholder="Adjuntar archivo"
                      disabled
                    />
                    <i

                      className="pi pi-upload"
                      style={{ marginTop: "5px" }}
                    />
                  </span>
                </div>
              </div>
              <div className="flex">
                <input
                  id="upload-button"
                  className="hidden"
                  type="file"
                  accept=".pdf"
                  ref={inputFileRef}
                  onChange={handleFileChange}
                />
                <Button
                  label="Cargar Archivo"
                  icon="pi pi-upload"
                  rounded
                  disabled={
                    documentForm.typeDocument.id === "" ||
                    selectedFile.type !== "application/pdf"
                  }
                  className="mt-4"
                  style={{ minHeight: "35px", maxHeight: "45px" }}
                  onClick={() => loadFile()}
                />
              </div>
            </div>
            <div className="border-solid border-round div-5 border-50 documents-cert">
              <DataTable
                value={selectedfileArray}
                emptyMessage="Sin Archivos"
                tableStyle={{ minWidth: "50rem" }}
                rows={5}
                paginator
              >
                <Column field="createdAt" header="Fecha" />
                <Column
                  field="documentType.name"
                  header="Tipo de documento"
                />
                <Column field="documentName" header="Nombre archivo" />
                <Column
                  align="center"
                  header="Acciones"
                  body={actionBodyTemplate}
                />
              </DataTable>
            </div>
          </div>
        </div >
        <div className="w-3 flex flex-column m-2">
          <div className="card bg-primary-50" style={{ padding: "1rem", marginBottom: "0.5rem" }}>
            <div className="flex align-items-center">
              <FaDatabase className="text-2xl text-primary mr-2" />
              <div className="text-xl font-bold flex">INFORMACIÓN WMOS </div>
              <div
                className="font-light ml-2"
                style={{ visibility: wmosWarning ? 'visible' : 'hidden' }}
              >
                <Tooltip target=".custom-target-icon" disabled={certificationData?.lpnStateWarning} />
                <i className="custom-target-icon pi pi-exclamation-triangle p-text-secondary p-overlay-badge"
                  data-pr-tooltip={"Incidencias en el estado de LPNs."}
                  data-pr-position="right"
                  data-pr-at="right+5 top+10"
                  data-pr-my="left center-2"
                  style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'red' }}
                ></i>
              </div>
              <IoOpenOutline
                className="custom-target-icon text-3xl text-primary ml-2 font-bold cursor-pointer"
                data-pr-tooltip="Ver detalle"
                data-pr-position="right"
                data-pr-at="right+5 top+10"
                data-pr-my="left center-2"
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={() => {
                  setStyleSelected({ width: "75vw" });
                  handleShowPopup(<WmosContent source_poSkuId={certificationData?.lote} />);
                }}
              />
            </div>
            <div className="font-bold mt-3 flex flex-wrap">
              <label className="mr-2 flex">Contenedores:
                <div className="font-light ml-2 ">
                  {util.blankIfNull(certificationData?.wmosContainers)}
                </div>
              </label>
            </div>
            <div className="font-bold mt-3 flex flex-wrap">
              <label className="mr-2 flex">LPNs:
                <div className="font-light ml-2">
                  {util.blankIfNull(certificationData?.wmosLpns)}
                </div>
              </label>
            </div>
          </div>
          <div className="card bg-primary-50" style={{ padding: "1rem", marginBottom: "0.5rem" }}>
            <div className="flex justify-content-start">
              <div className="flex align-items-center">
                <IoMdBarcode className="text-2xl text-primary mr-2" />
                <div className="text-xl font-bold flex mr-4">PRODUCTO: <div className="text-xl font-light ml-2">{certificationData?.sku}</div></div>
              </div>
              <IoOpenOutline
                className="custom-target-icon text-3xl text-primary ml-2 font-bold cursor-pointer"
                data-pr-tooltip="Ver detalle"
                data-pr-position="right"
                data-pr-at="right+5 top+10"
                data-pr-my="left center-2"
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={() => {
                  setStyleSelected({ width: "80vw" });
                  handleShowPopup(<ProductDetailContent source_sku={skuData?.sku} />);
                }}
              />
            </div>
            <div className="flex flex-column p-2">
              <div className="font-bold mt-3 flex flex-wrap">
                <label className="mr-2 flex">Descripción:
                  <div className="font-light ml-2 ">{util.blankIfNull(skuData?.descriptionSkuProduct)}</div>
                </label>
              </div>
              <div className="font-bold mt-3 flex flex-wrap">
                <label className="mr-2 flex">Modelo:
                  <div className="font-light ml-2 ">{util.blankIfNull(skuData?.modelSkuProduct)}</div>
                </label>
              </div>
              <div className="font-bold mt-3 flex flex-wrap">
                <label className="mr-2 flex">Marca:
                  <div className="font-light ml-2 ">{util.blankIfNull(skuData?.brandSkuProduct)}</div>
                </ label>
              </div>
              <div className="font-bold mt-3 flex flex-wrap">
                <label className="mr-2 flex">SubFamilia:
                  <div className="font-light ml-2 ">{skuData?.skuDetail?.descSubFamilia}</div>
                </label>
              </div>
              <div className="font-bold mt-3 flex flex-wrap">
                <label className="mr-2 flex">Grupo:
                  <div className="font-light ml-2 ">{skuData?.skuDetail?.descGrupo}</div>
                </label>
              </div>

            </div>
          </div>
          <div
            className="card bg-primary-50"
            style={{ padding: "1rem", marginBottom: "0.5rem" }}
          >
            <div className="flex align-items-center">
              <IoMdBarcode className="text-2xl text-primary mr-2" />
              <div className="text-xl font-bold flex">  CERTIFICACIÓN PRODUCTO</div>
            </div>

            <div className="font-bold mt-3 flex flex-wrap">
              {/* <label className="mr-2 flex">Días hábiles promedio de certificación:
                <div className="font-light ml-2">{util.blankIfNull(skuData?.skuCertification?.certAveragePeriod)}</div>
              </label> */}
            </div>
            <div className="font-bold mt-3 flex flex-wrap">
              <label className="mr-2 flex">N° certificado:
                <div className="font-light ml-2">{util.blankIfNull(skuData?.skuCertification?.certNumber)}</div>
              </label>
            </div>
            <div className="font-bold mt-3 flex flex-wrap align-items-center">
              <label className="mr-2 flex">Protocolo:
                <div className="font-light ml-2">{util.blankIfNull(skuData?.skuCertification?.protocol?.name)}</div>
              </label>
              <IoOpenOutline
                className="custom-target-icon text-3xl text-primary ml-2 font-bold cursor-pointer"
                data-pr-tooltip="Ver detalle"
                data-pr-position="right"
                data-pr-at="right+5 top+10"
                data-pr-my="left center-2"
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={() => {
                  setStyleSelected({ width: "75vw" });
                  handleShowPopup(
                    <ProtocolDialog
                      data={util.blankIfNull(skuData?.skuCertification?.protocol)}
                      handleClose={handleCloseDialog}
                    />
                  );
                }}
              />
            </div>
            <div className="font-bold mt-3 flex flex-wrap">
              <label className="mr-2 flex">Días de certificación:
                <div className="font-light ml-2">{util.blankIfNull(certificationData?.diasHabiles)}</div>
              </label>
            </div>
            <div className="font-bold mt-3 flex flex-wrap">
              <label className="mr-2 flex">Costo UF:
                <div className="font-light ml-2">{util.blankIfNull(certificationData?.montoUf)}</div>
              </label>
            </div>
            <div className="font-bold mt-3 flex flex-wrap align-items-center">
              <label className="mr-2 flex">Organismo:
                <div className="font-light ml-2">{util.blankIfNull(skuData?.skuCertification?.agency?.name)}</div>
              </label>
              <IoOpenOutline
                className="custom-target-icon text-3xl text-primary ml-2 font-bold cursor-pointer"
                data-pr-tooltip="Ver detalle"
                data-pr-position="right"
                data-pr-at="right+5 top+10"
                data-pr-my="left center-2"
                style={{ fontSize: "2rem", cursor: "pointer" }}
                onClick={() => {
                  setStyleSelected({ width: "50vw" });
                  handleShowPopup(
                    <OrganismDetailContent
                      data={util.blankIfNull(skuData?.skuCertification?.agency)}
                      handleClose={handleCloseDialog}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="card bg-primary-50" style={{ padding: "1rem", marginBottom: "0.5rem" }}>
            <div className="flex justify-content-start">
              <div className="flex align-items-center">
                <IoMdBarcode className="text-2xl text-primary mr-2" />
                <div className="text-xl flex mr-2">
                  <div className="flex flex-wrap">
                    <label className="text-xl font-bold mr-2">OC DE SLI: </label>
                    <div className="font-light"> {util.blankIfNull(certificationData?.oc)}</div>
                  </div>
                  <div
                    className="font-light ml-2"
                    style={{ visibility: sliGetError !== '' ? 'visible' : 'hidden' }}
                    onClick={() => {
                      setStyleSelected({ width: "40vw" });
                      handleShowPopup(
                        <UpdateOpDialogContent
                          data={certificationData}
                          handleClose={handleCloseDialog}
                        />)
                    }}
                  >
                    <Tooltip target=".custom-target-icon" disabled={sliGetError === ''} />

                    <i className="custom-target-icon pi pi-exclamation-triangle p-text-secondary p-overlay-badge"
                      data-pr-tooltip={sliGetError}
                      data-pr-position="right"
                      data-pr-at="right+5 top+10"
                      data-pr-my="left center-2"
                      style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'red' }}
                    ></i>
                  </div>
                </div>
              </div>
              {sliGetError === "" && (
                <IoOpenOutline
                  className="custom-target-icon text-3xl text-primary font-bold cursor-pointer"
                  data-pr-tooltip="Ver detalle"
                  data-pr-position="right"
                  data-pr-at="right+5 top+10"
                  data-pr-my="left center-2"
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                  onClick={() => {
                    setStyleSelected({ width: "60vw" });
                    handleShowPopup(
                      <OcDialogDetailContent
                        details_header_info={sliData?.details_header_info}
                        details_table_info={sliData?.details_table_info}
                        details_table_extra_data={sliData?.details_table_extra_data}
                        source_oc={certificationData?.oc}
                      />
                    );
                  }}
                />
              )}
            </div>

            <div className="flex flex-wrap">
              <div className="flex flex-wrap w-7 font-bold mt-4 mr-2">
                <label className="mr-2 flex">Carpeta:</label>
                <div className="font-light ">{sliData?.main_info?.carpeta}</div>
              </div>
              <div className="flex w-3 font-bold mt-4 flex-nowrap mr-2">
                <label className="mr-2 flex">PO Madre:</label>
                <div className="font-light ">{sliData?.main_info?.oc_madre}</div>
              </div>
              <div className="flex w-7 font-bold mt-4 flex-nowrap mr-2">
                <label className="mr-2 flex">Estado embarque:</label>
                <div className="font-light ">{sliData?.main_info?.estado_embarque}</div>
              </div>
              <div className="flex w-3 font-bold mt-4 flex-nowrap mr-2">
                <label className="mr-2 flex">Embarque:</label>
                <div className="font-light">{sliData?.main_info?.embarque}</div>
              </div>
              <div className="w-full font-bold mt-3 flex flex-wrap align-items-center">
                <label className="mr-2">CI - N°:</label>
                <InputText
                  maxLength={30}
                  name="numCi"
                  onChange={handleChange}
                  style={{ width: "200px" }}
                  value={formData.numCi}
                />
              </div>
            </div >
          </div >
          <div className="card bg-primary-50" style={{ padding: "1rem", marginBottom: "0.5rem" }}>
            <div className="flex align-items-center">
              <RxCounterClockwiseClock className="text-2xl text-primary mr-2" />
              <div className="text-xl font-bold">HISTORIAL DE CAMBIOS</div>
            </div>
            <div style={{ height: "880px", overflow: "auto" }}>
              {historyChanges.length !== 0 && (
                <Timeline
                  value={historyChanges}
                  align="left"
                  className="mt-4 historic-width"
                  marker={customizedMarker}
                  content={customizedContent}
                  layout="vertical"
                />
              )}
              {historyChanges.length === 0 &&
                (<div className="text-2xl h-20rem flex align-items-center justify-content-center">
                  No se han registrado cambios.</div>)}
            </div>
          </div>
        </div>
      </div>
      <div
        className="card sticky bottom-0 flex justify-content-end z-5"
        style={{ padding: "1rem", marginBottom: "5px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}
      >
        <Button
          label="Volver"
          rounded
          className="w-1 bg-primary border-none"
          style={{ height: "35px", minWidth: "100px", maxWidth: "130px" }}
          onClick={() => routerLink.push("/management/sec")}
        />
        <Button
          label="Guardar"
          rounded
          className="w-1 ml-3 bg-primary border-none"
          loading={loadingSave}
          style={{ height: "35px", minWidth: "100px", maxWidth: "130px" }}
          onClick={handleSubmit}
        />
      </div>
      <Dialog
        visible={visibleDialog}
        onHide={() => setVisibleDialog(false)}
        draggable={false}
        style={styleDialog}
        header={headerDialogTemplate}
        dismissableMask={true}
      >
        {bodyDialogTemplate()}
      </Dialog>
      <SharedDialog
        visible={showPopup}
        onHide={handleHidePopup}
        content={popupContent}
        styleDialog={styleSelected}
      />
    </div >
  );
};

export default ProductManagement;


