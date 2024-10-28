"use client";
import { createEditOrganismDocuments, createEditOrganismImage, deleteAgencyPhoto, deleteOrganismDocuments } from "@/API/api-imagenes";
import { getOrganismXlsx } from "@/API/api-reports-xlsx";

import { getComboDocumentTypeOrganism, getOrganismById, getOrganismByName } from "@/API/apis";
import { Constants } from "@/API/constants";
import HelpDialog from "@/app/shared-components/help-dialog";
import SearchInput from "@/app/shared-components/search-input";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { FaBook } from "react-icons/fa";
import { IoCarOutline, IoPerson } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import OrganimsPdf from "./pdf/organism";
const useUtils = require('@/app/utils')

export interface Organism {
  id?: number | null;
  blameUser: number;
  agencyName: string;
  contactName: string;
  email: string;
  rut: string;
  phoneNumber: string;
  address: string;
  executiveName: string;
  executivePhoneNumber: string;
  executiveEmail: string;
}

export interface Auditors {
  name: string;
  documentNumber: string;
  phoneNumber: string;
  email: string;
  state: string;
  idAgency: string;
  blameUser: string;
  id?: number | null;
}

const defaultValues = {
  id: null,
  agencyName: "",
  contactName: "",
  email: "",
  rut: "",
  phoneNumber: "",
  address: "",
  executiveName: "",
  executivePhoneNumber: "",
  executiveEmail: "",
};

const Organism = () => {
  const util = useUtils();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [addPattensAndAuditors, setPattensAndAuditors] =
    useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>("");
  const inputFileRef = useRef<any>();
  const [imageLabel, setImagenLabel] = useState<any>("Imagen");
  const [fileSelected, setFileSelected] = useState<any>();
  const [selectedfileArray, setSelectedfileArray] = useState<any>([]);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const toast = useRef<Toast>(null);
  const [loading, setLoading] = useState(false);
  const [documentForm, setDocumentForm] = useState({
    typeDocument: { id: "", name: "" },
    documentName: "",
    comentary: "",
  });
  const [organism, setOrganism] = useState<any>([]);
  const [auditors, setAuditors] = useState<any>([]);
  const [pattens, setPattens] = useState<any>([]);
  const [ejecutives, setEjecutives] = useState<any>([]);
  const [tabLabel, setTabLabel] = useState("Fiscalizador");
  const [showForm, setShowForm] = useState(false);
  const [showOtherForm, setShowOtherForm] = useState(false);
  const [loadingSaveButton, setLoadingSaveButton] = useState(false);
  const [lockSaveButton, setLockSaveButton] = useState(true);
  const op: any = useRef<OverlayPanel>(null);
  const [selectedOrganism, setSelectedOrganism] = useState<any>(defaultValues);
  const router = useRouter();
  const [comboDocuments, setComboDocuments] = useState<any>([]);
  const [auditorForm, setAuditorForm] = useState({
    auditorName: "",
    auditorRut: "",
    auditorPhone: "",
    auditorEmail: "",
    idAuditor: null,
  });

  const [patentForm, setPatentForm] = useState({
    patentName: "",
    patentModel: "",
    patentBrand: "",
    patentColor: "",
    idPatent: null,
  });

  const [ejecutiveForm, setEjecutiveForm] = useState({
    executiveName: "",
    executivePhoneNumber: "",
    executiveEmail: "",
    state: 1,
    idAgency: "",
    blameUser: "",
    id: null
  });

  const [formData, setFormData] = useState({
    idOrganism: "",
    organismName: "",
    contact: "",
    rut: "",
    email: "",
    image: "",
    phone: "",
    address: "",
    ejecutiveName: "",
    ejecutivePhone: "",
    ejecutiveEmail: "",
  });

  const requiredFieldsIndex = [
    'organismName',
    'rut',
    'email'
  ]

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      router.push("/");
    }
    getComboDocumentTypeOrganism().then(
      (data: any) => {
        setComboDocuments(data.response);
      },
      () => util.toastShow(toast, "En el servicio, intente más tarde.", "error")
    );
    setLoading(true);
  }, []);

  const handleFileChange = () => {
    const selected = inputFileRef.current.files[0];

    if (
      selected?.type === "image/jpg" ||
      selected?.type === "image/jpeg" ||
      selected?.type === "image/png"
    ) {
      setFileSelected(selected);
      setLockSaveButton(false);
      setFormData((prevData) => ({
        ...prevData,
        imagen: selected.name,
      }));
      const imageUrl = URL.createObjectURL(selected);
      setImageSrc(imageUrl);
    } else {
      util.toastShow(toast, "Ingrese un tipo de archivo válido. (jpg, jpeg, png)", "error")
    }
  };

  const exportXLS = () => {
    getOrganismXlsx(selectedOrganism.id).then(
      () => {
        util.downloadExcel(`excel/agency/${selectedOrganism.id}`, "Organismo.xlsx")
      },
      () => {
        util.toastShow(toast, "Al intententar exportar.", "error")
      }
    );
  }

  const handleFileChangePDf = () => {
    const selectedFile: any = inputFileRef.current.files[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setSelectedFile(selectedFile);
      setDocumentForm((prevData) => ({
        ...prevData,
        documentName: selectedFile.name,
      }));
    } else {
      util.toastShow(toast, "Ingrese un documento valido. (pdf)", "error");
    }
  };

  const handleChange = (event: any) => {
    setLockSaveButton(false)
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeAuditor = (event: any) => {
    const { name, value } = event.target;
    setAuditorForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangePatent = (event: any) => {
    const { name, value } = event.target;
    setPatentForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleDocumentChange = (event: any) => {
    const { name, value } = event.target;
    setDocumentForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleChangeEjecutive = (event: any) => {
    const { name, value } = event.target;
    setEjecutiveForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const checkRequiredFields = (form: any) => {
    requiredFieldsIndex.forEach((key) => {
      if (["", "null"].includes(form[key] + ''))
        return true
    })

    return resolveLockSaveButton()
  }

  const handleSubmit = () => {

    const editBody: Organism = {
      id: selectedOrganism.id || null,
      agencyName: formData.organismName,
      contactName: formData.contact,
      email: formData.email,
      rut: formData.rut,
      blameUser: JSON.parse(localStorage.getItem("userData") || "{}").id,
      phoneNumber: formData.phone,
      address: formData.address,
      executiveName: formData.ejecutiveName,
      executivePhoneNumber: formData.ejecutivePhone,
      executiveEmail: formData.ejecutiveEmail,
    };

    if (checkRequiredFields(editBody)) {
      util.toastShow(toast, "Ingrese los campos solicitados.", "error")
    } else {
      setLoadingSaveButton(true);
      // createEditOrganism(editBody, selectedOrganism.id !== null ? "PUT" : "POST").then(
      //   (res: any) => {
      //     setLoadingSaveButton(false);
      //     setLockSaveButton(true);
      //     if (res?.success) {
      //       util.toastShow(toast, res.message)

      //       setOrganismImage(res.response, (response: any) => {
      //         organismSelect({ data: response });
      //       });

      //     } else {
      //       util.toastShow(toast, res?.message, "error")
      //     }
      //   },
      //   () => {
      //     setLoadingSaveButton(false);
      //     setLockSaveButton(true);
      //     util.toastShow(toast, "En el servicio, intente más tarde.", "error");
      //   });
    }
  };

  const setOrganismImage = (res: any, callback: any) => {
    if (fileSelected) {
      setLockSaveButton(false)
      const formDataApi = new FormData();
      formDataApi.append("file", fileSelected);
      formDataApi.append("agencyID", res.id);
      formDataApi.append(
        "userID",
        JSON.parse(localStorage.getItem("userData") || "{}").id
      );
      formDataApi.append("photoID", res.photoID ? res.photoID : "");

      createEditOrganismImage(formDataApi).then((a) => {
        res.photoID = a.response.photoID
        callback(res)
      });
    }
    else callback(res)
  };

  const createAuditors = (body: any) => {
    // createEditAuditor(body, body.id ? "PUT" : "POST").then(
    //   (a: any) => {
    //     if (a.success) {
    //       if (!body.id) {
    //         util.toastShow(toast, "Fiscalizador creado exitosamente.")
    //         body.id = a.response.id;
    //         auditors.push(body);
    //       } else {
    //         const index = auditors.findIndex(
    //           (item: any) => item.id === auditorForm.idAuditor
    //         );

    //         if (index !== -1) {
    //           auditors[index] = {
    //             documentNumber: auditorForm.auditorRut,
    //             id: auditorForm.idAuditor,
    //             name: auditorForm.auditorName,
    //             email: auditorForm.auditorEmail,
    //             phoneNumber: auditorForm.auditorPhone,
    //             state: auditors[index].state,
    //           };
    //         }
    //         util.toastShow(toast, "Fiscalizador editado exitosamente.")
    //       }
    //       setPattensAndAuditors(false);
    //     } else {
    //       util.toastShow(toast, a.message, "error")
    //     }
    //   },
    //   () => {
    //     util.toastShow(toast, "En el servicio.", "error")
    //   }
    // );
  };

  const loadFile = () => {
    const formDataApi = new FormData();
    formDataApi.append("file", selectedFile);
    formDataApi.append("comment", documentForm.comentary);
    formDataApi.append("agencyId", selectedOrganism.id);
    formDataApi.append(
      "documentTypeId",
      documentForm.typeDocument.id
    );


    createEditOrganismDocuments(formDataApi).then((data) => {
      if (data?.success) {
        organismSelect({ data: selectedOrganism });
        util.toastShow(toast, "Documento ingresado correctamente.", "success");
      } else {
        util.toastShow(toast, "Al intentar ingresar un documento.", "error");
      }
    }, err => {
      util.toastShow(toast, "En el servicio, intente más tarde.", "error");
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

  const createEjecutive = (body: any) => {
    body.state = 1
    // createEditEjecutives(body, body.id ? "PUT" : "POST").then(
    //   (a: any) => {
    //     if (a.success) {
    //       if (!body.id) {
    //         util.toastShow(toast, "Ejecutivo creado exitosamente.")
    //         body.id = a.response.id;
    //         ejecutives.push(body);
    //       } else {
    //         const index = ejecutives.findIndex(
    //           (item: any) => item.id === ejecutiveForm.id
    //         );

    //         if (index !== -1) {

    //           ejecutives[index] = {
    //             id: ejecutiveForm.id,
    //             executiveName: ejecutiveForm.executiveName,
    //             executivePhoneNumber: ejecutiveForm.executivePhoneNumber,
    //             executiveEmail: ejecutiveForm.executiveEmail,
    //             agencyId: ejecutiveForm.idAgency,
    //             state: ejecutiveForm.state
    //           };
    //         }
    //         util.toastShow(toast, "Ejecutivo editado exitosamente.")
    //       }
    //       setPattensAndAuditors(false);
    //     } else {
    //       util.toastShow(toast, a.message, "error")
    //     }
    //   },
    //   () => {
    //     util.toastShow(toast, "En el servicio.", "error")
    //   }
    // );
  };
  const createPattents = (body: any) => {
    body.state = 1
    // createEditPattens(body, body.id ? "PUT" : "POST").then(
    //   (a: any) => {
    //     if (a.success) {
    //       if (!body.id) {
    //         util.toastShow(toast, "Patente registrada exitosamente.")
    //         body.id = a.response.id;
    //         pattens.push(body);
    //       } else {
    //         const index = pattens.findIndex(
    //           (item: any) => item.id === patentForm.idPatent
    //         );

    //         if (index !== -1) {
    //           pattens[index] = {
    //             brand: patentForm.patentBrand,
    //             color: patentForm.patentColor,
    //             id: patentForm.idPatent,
    //             model: patentForm.patentModel,
    //             patent: patentForm.patentName,
    //             state: 1,
    //           };
    //         }
    //         util.toastShow(toast, "Patente editada exitosamente.")
    //       }
    //       setPattensAndAuditors(false);
    //     } else {
    //       util.toastShow(toast, a.message, "error")
    //     }
    //   },
    //   () => {
    //     util.toastShow(toast, "En el servicio.", "error")
    //   }
    // );
  };

  const handleSubmitDialog = () => {
    if (tabLabel === "Fiscalizador") {
      const body: any = {
        name: auditorForm.auditorName,
        documentNumber: auditorForm.auditorRut,
        phoneNumber: auditorForm.auditorPhone,
        email: auditorForm.auditorEmail,
        state: 1,
        idAgency: selectedOrganism.id,
        blameUser: JSON.parse(localStorage.getItem("userData") ?? "{}").id,
      };
      if (auditorForm.idAuditor) {
        body.id = auditorForm.idAuditor;
      }
      createAuditors(body);
    } else if (tabLabel === "Patente") {
      const body: any = {
        patent: patentForm.patentName,
        model: patentForm.patentModel,
        brand: patentForm.patentBrand,
        color: patentForm.patentColor,
        idAgency: selectedOrganism.id,
      };
      if (patentForm.idPatent) {
        body.id = patentForm.idPatent;
      }
      createPattents(body);

    } else if (tabLabel === "Ejecutivo") {
      const body: any = {
        executiveName: ejecutiveForm.executiveName,
        executivePhoneNumber: ejecutiveForm.executivePhoneNumber,
        executiveEmail: ejecutiveForm.executiveEmail,
        state: 1,
        idAgency: selectedOrganism.id,
        blameUser: JSON.parse(localStorage.getItem("userData") ?? "{}").id
      };
      if (ejecutiveForm.id) {
        body.id = ejecutiveForm.id;
      }
      createEjecutive(body);
    }
  };

  const organismSelect = (e: any) => {
    setFileSelected(null)
    setLockSaveButton(true)
    setShowForm(true);
    setShowOtherForm(true);
    op.current.hide();
    getOrganismById(e.data.id).then((data: any) => {
      setFormData({
        ...formData,
        idOrganism: util.blankIfNull(data.id),
        organismName: util.blankIfNull(data.agencyName),
        contact: util.blankIfNull(data.contactName),
        rut: util.blankIfNull(data.rut),
        email: util.blankIfNull(data.email),
        phone: util.blankIfNull(data.phoneNumber),
        address: util.blankIfNull(data.address),
        ejecutiveName: util.blankIfNull(data.executiveName),
        ejecutivePhone: util.blankIfNull(data.executivePhoneNumber),
        ejecutiveEmail: util.blankIfNull(data.executiveEmail),
      });
      setSelectedfileArray(
        data.agencyDocuments.map(
          (element: any) => ({
            ...element,
            createdAt: util.localDate(element.createdAt),
            documentType: element.documentType.name,
          })
        )
      );
    });
    util.resolveImage(e.data.photoID, setImageSrc)
    setSelectedOrganism(e.data);
    setAuditors(e.data.inspectors);
    setPattens(e.data.patents);
    setEjecutives(e.data.executives);
  };

  const headerDialogTemplate = () => {
    return (
      <div className="flex justify-content-center font-bold align-items-center">
        {tabLabel === "Fiscalizador" && (
          <i className="pi pi-check text-primary mr-2"></i>
        )}
        {tabLabel === "Patente" && (
          <IoCarOutline className="mr-2 text-primary" />
        )}
        {tabLabel === "Ejecutivo" && (
          <IoPerson className="mr-2 text-primary" />
        )}
        {"Agregar " + tabLabel}
      </div>
    );
  };

  const editElement = (rowData: any) => {
    setPattensAndAuditors(true);
    if (tabLabel === "Fiscalizador") {
      setAuditorForm((prevData) => ({
        ...prevData,
        auditorName: rowData.name,
        auditorRut: rowData.documentNumber,
        auditorPhone: rowData.phoneNumber,
        auditorEmail: rowData.email,
        idAuditor: rowData.id,
      }));
    } else if (tabLabel === "Patente") {
      setPatentForm((prevData) => ({
        ...prevData,
        patentName: rowData.patent,
        patentModel: rowData.model,
        patentBrand: rowData.brand,
        patentColor: rowData.color,
        idPatent: rowData.id,
      }));
    } else {
      setEjecutiveForm((prevData) => ({
        ...prevData,
        executiveName: rowData.executiveName,
        executivePhoneNumber: rowData.executivePhoneNumber,
        executiveEmail: rowData.executiveEmail,
        state: rowData.states?.id,
        idAgency: rowData.agencyId,
        id: rowData.id,
      }))
    }
  }

  const deleteElement = (rowData: any) => {
    if (tabLabel === "Patente") {
      const _patents = pattens.filter(
        (value: any) => +value.id !== +rowData.id
      );
      setPattens(_patents);
      // deletePatent(rowData.id).then(() => {
      //   util.toastShow(toast, "Patente eliminada exitosamente.")
      // });
    } else if (tabLabel === "Fiscalizador") {
      const _auditors = auditors.filter(
        (val: any) => val.id !== rowData.id
      );
      setAuditors(_auditors);
      // deleteAuditor(rowData.id).then(() => {
      //   util.toastShow(toast, "Fiscalizador eliminado exitosamente.")
      // });
    } else {
      const _ejecutives = ejecutives.filter(
        (val: any) => val.id !== rowData.id
      );
      setEjecutives(_ejecutives);
      // deleteEjecutive(rowData.id).then(() => {
      //   util.toastShow(toast, "Ejecutivo eliminado exitosamente.")
      // });
    }
  }

  const actionBodyTemplateDocuments = (rowData: any) => {
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
            deleteOrganismDocuments(rowData).then(() =>
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


  const actionBodyTemplate = (rowData: any) => {

    return (
      <React.Fragment>
        <div className="flex justify-content-center">
          <Button
            icon="pi pi-pencil"
            tooltip={`Editar ${tabLabel}`}
            tooltipOptions={{
              position: "left",
              at: "left+6 top+18",
              my: "right center+2"
            }}
            text
            rounded
            className="font-bold"
            onClick={() => editElement(rowData)}
          />
          <Button
            icon="pi pi-trash"
            tooltip={`Eliminar ${tabLabel}`}
            tooltipOptions={{
              position: "left",
              at: "left+6 top+18",
              my: "right center+2"
            }}
            text
            rounded
            className="font-bold"
            onClick={() => deleteElement(rowData)}
          />
        </div>
      </React.Fragment>
    );
  };



  const handleClick = (e: any) => {
    setTimeout(() => {
      getOrganism("");
    }, 1000);

    op.current.toggle(e);
  };

  const getOrganism = (data: any) => {
    getOrganismByName(data.target?.value ? data.target?.value : "").then(
      (data: any) => {
        if (data.success) {
          setOrganism(data.response);
        }
        setLoading(false);
      }
    );
  };

  const deleteImage = () => {
    deleteAgencyPhoto(selectedOrganism.id).then(a => {
      if (a.success) {
        util.toastShow(toast, "Imagen eliminada correctamente.")
        setImageSrc(null)
      } else {
        util.toastShow(toast, a.message, "error")
      }
    })
  }

  const createAgency = () => {
    setShowForm(true);
    setShowOtherForm(false);
    setFormData({
      ...formData,
      idOrganism: "",
      organismName: "",
      contact: "",
      rut: "",
      email: "",
      image: "",
      phone: "",
      address: "",
      ejecutiveName: "",
      ejecutivePhone: "",
      ejecutiveEmail: "",
    });
    setSelectedOrganism({
      ...selectedOrganism,
      id: null,
      agencyName: "",
      contactName: "",
      email: "",
      rut: "",
      phoneNumber: "",
      address: "",
      executiveName: "",
      executivePhoneNumber: "",
      executiveEmail: "",
    });
    setImageSrc(null);
  }

  const handleSearch = (e: any) => {
    setLoading(true);
    if (e.target.value.length >= 3) {
      getOrganism(e);
      op.current.show(e);
    } else {
      op.current.hide();
    }
  }

  const resolveLockSaveButton = () => {

    return (
      formData.organismName === ""
      ||
      !RegExp(/^\d{1,3}(\.\d{1,3}){2}-[\dkK]$/).exec(formData.rut)
      ||
      !RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).exec(formData.email)
    )
  }


  return (
    <div>
      <Toast ref={toast} />
      <p className="general-title" style={{ minHeight: "84px" }}>
        Mantenedor de Organismos
      </p>
      <div className="w-full flex justify-content-between align-content-center mb-4">
        <div className="flex flex-wrap align-content-center">
          <div className="general-text mr-5 maintainer-search-label">
            Ingresar nombre de organismo
            <HelpDialog
              sourceTitle="Buscador de organismos"
              sourceContent="Puede buscar por Nombre, Email y RUT."
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
            <span className="p-input-icon-left mr-5" style={{ display: "flex" }}>
              <i className="pi pi-search lupa-padding" />
              <SearchInput
                sourceOnChange={handleSearch}
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
        <div className="align-items-baseline flex mb-2">
          <Button
            rounded
            label="Crear organismo"
            icon="pi pi-plus"
            iconPos="left"
            className="maintainer-new-width"
            onClick={() => createAgency()}
          />
        </div>
      </div>
      {showForm && (
        <>
          <div className="card w-full">
            <div className="flex align-items-start">
              <FaBook className="text-2xl text-primary title-icon-top-margin" />
              <div className="text-2xl font-bold ml-3 mb-4">
                AGREGAR O EDITAR ORGANISMOS
              </div>
            </div>
            <div className="flex w-full justify-content-between">
              <div className="flex flex-column mb-5">
                <div className="flex align-items-center ">
                  <div className="w-full flex-wrap flex">
                    <div className="flex flex-column mr-4 mb-2 mt-2">
                      <label htmlFor="organismName">Nombre organismo</label>
                      <InputText
                        name="organismName"
                        maxLength={40}
                        value={formData.organismName}
                        onChange={handleChange}
                        placeholder="Ingresar nombre organismo"
                        style={{ width: "250px" }}
                        className={
                          formData.organismName === "" ? "p-invalid" : ""
                        }
                      />
                    </div>
                    <div className="flex flex-column mb-2 mt-2 mr-4">
                      <label htmlFor="contact">Contacto</label>
                      <InputText
                        name="contact"
                        maxLength={40}
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Ingresar nombre contacto"
                        style={{ width: "250px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex align-items-center ">
                  <div className="w-full flex-wrap flex">
                    <div className="flex flex-column mb-2 mt-2 mr-4">
                      <label htmlFor="email">Email organismo</label>
                      <InputText
                        type="email"
                        name="email"
                        maxLength={40}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ingresar Email"
                        style={{ width: "250px" }}
                        className={
                          !RegExp(
                            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                          ).exec(formData.email)
                            ? "p-invalid"
                            : ""
                        }
                      />
                    </div>
                    <div className="flex flex-column mb-2 mt-2 mr-4">
                      <label htmlFor="rut">RUT organismo</label>
                      <InputText
                        name="rut"
                        value={formData.rut}
                        onInput={(e) => util.formatearRut(e)}
                        onChange={handleChange}
                        placeholder="Ingresar RUT"
                        style={{ width: "250px" }}
                        maxLength={12}
                        className={
                          !RegExp(/^\d{1,3}(\.\d{1,3}){2}-[\dkK]$/).exec(
                            formData.rut
                          )
                            ? "p-invalid"
                            : ""
                        }
                      />
                    </div>
                    <div className="flex flex-column mb-2 mt-2 mr-4">
                      <label htmlFor="phone">Teléfono organismo</label>
                      <InputMask
                        name="phone"
                        maxLength={40}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ingresar número de telefono"
                        style={{ width: "250px" }}
                        mask="+569 9999 9999"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full align-items-center ">
                  <div className="flex flex-wrap flex-column ">
                    <label htmlFor="address">Dirección</label>
                    <InputText
                      name="address"
                      maxLength={40}
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Ingresar dirección"
                      style={{ maxWidth: "520px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-content-center align-items-start w-4" style={{ minWidth: "340px" }}>
                <div className="flex justify-content-center align-items-center ">
                  {!imageSrc && (
                    <div
                      className="flex flex-column align-items-center justify-content-center border-round bg-primary font-bold p-3 m-3 flex align-items-center justify-content-center cursor-pointer hover:bg-black-alpha-60"
                      style={{ width: "150px", height: "150px" }}
                      onClick={() => {
                        const input: any =
                          document.getElementById("upload-button");
                        input.click();
                      }}
                      onMouseOver={() => setImagenLabel("Subir Imagen")}
                      onMouseLeave={() => setImagenLabel("Imagen")}
                    >
                      {imageLabel === "Subir Imagen" && (
                        <i className="pi pi-upload mb-2" />
                      )}
                      {imageLabel}
                    </div>
                  )}
                  {imageSrc && (
                    <div className="flex flex-column justify-content-center align-items-center">
                      <div
                        className="border-round border-primary border-solid p-3 ml-3 mr-3 flex align-items-center justify-content-center cursor-pointer "
                        onClick={() => {
                          const input: any =
                            document.getElementById("upload-button");
                          input.click();
                        }}
                      >
                        <img
                          src={imageSrc}
                          style={{ width: "150px", height: "150px" }}
                          alt="Imagen seleccionada"
                        />
                      </div>
                      <Button
                        className="border-circle mt-0"
                        text icon="pi pi-trash"
                        tooltip="Eliminar imagen"
                        onClick={() => deleteImage()} />
                    </div>
                  )}
                </div>
                <input
                  id="upload-button"
                  className="hidden"
                  type="file"
                  ref={inputFileRef}
                  accept=".jpg, .jpeg, .png"
                  onChange={() => handleFileChange()}
                />
                <div style={{ width: "170px" }}>
                  <Button
                    outlined
                    label="Exportar PDF"
                    icon="pi pi-file-pdf"
                    rounded
                    className="mt-3 min-button-width"
                    style={{ height: "40px", width: "150px" }}
                    onClick={() => {
                      OrganimsPdf(imageSrc, auditors, formData, pattens, ejecutives);
                    }}
                  />
                  <Button
                    outlined
                    label="Exportar XLS"
                    icon="pi pi-file-excel"
                    rounded
                    className="mt-3 min-button-width"
                    style={{ height: "40px", width: "150px" }}
                    onClick={exportXLS}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-wrap justify-content-end">

              <div className="w-full flex justify-content-end align-items-center">
                <Button
                  label="Cancelar"
                  rounded
                  className="mt-3 border-none"
                  style={{ height: "40px", width: "145px" }}
                  onClick={() => setShowForm(false)}
                />
                <Button
                  className="mt-3 ml-5"
                  label="Guardar"
                  rounded
                  loading={loadingSaveButton}
                  style={{ height: "40px", width: "145px" }}
                  onClick={() => handleSubmit()}
                  disabled={lockSaveButton}
                />
              </div>
            </div>
          </div>
          {showOtherForm && (
            <>
              <div className="card relative ">
                <Button
                  rounded
                  style={{ width: "12rem" }}
                  label={"Crear " + tabLabel}
                  icon="pi pi-plus"
                  iconPos="right"
                  className="absolute top-0 right-0 z-1 mr-5 mt-3"
                  onClick={() => {
                    setPattensAndAuditors(true);
                    setAuditorForm((value: any) => ({
                      ...value,
                      auditorName: "",
                      auditorRut: "",
                      auditorPhone: "",
                      auditorEmail: "",
                      idAuditor: null,
                    }));
                    setPatentForm((value: any) => ({
                      ...value,
                      patentName: "",
                      patentModel: "",
                      patentBrand: "",
                      patentColor: "",
                      idPatent: null,
                    }));
                    setEjecutiveForm((values: any) => ({
                      ...values,
                      executiveName: "",
                      executivePhoneNumber: "",
                      executiveEmail: "",
                      state: 1,
                      idAgency: "",
                      blameUser: "",
                      id: null
                    }))
                  }}
                />
                <TabView
                  className="custom-table-wrapper"
                  activeIndex={activeIndex}
                  onTabChange={(e: any) => {
                    setActiveIndex(e.index);
                    if (e.index === 0) {
                      setTabLabel("Fiscalizador");
                    } else if (e.index === 1) {
                      setTabLabel("Patente");
                    } else {
                      setTabLabel("Ejecutivo");
                    }
                  }}
                >
                  <TabPanel header="Fiscalizadores">
                    <DataTable
                      value={auditors}
                      tableStyle={{ minWidth: "50rem" }}
                      rows={5}
                      paginator
                      emptyMessage="No se encontraron registros."
                    >
                      <Column field="name" header="Nombre" />
                      <Column field="documentNumber" header="RUT" />
                      <Column
                        field="phoneNumber"
                        header="Número de contacto"
                      />
                      <Column field="email" header="Email" />
                      <Column
                        body={actionBodyTemplate}
                        header="Acciones"
                        align="center"
                      />
                    </DataTable>
                  </TabPanel>
                  <TabPanel header="Patentes">
                    <DataTable
                      rows={5}
                      paginator
                      value={pattens}
                      tableStyle={{ minWidth: "50rem" }}
                      emptyMessage="No se encontraron registros."
                    >
                      <Column field="patent" header="Patente" />
                      <Column field="model" header="Modelo" />
                      <Column field="brand" header="Marca" />
                      <Column field="color" header="Color" />
                      <Column
                        body={actionBodyTemplate}
                        header="Acciones"
                        align="center"
                      />
                    </DataTable>
                  </TabPanel>
                  <TabPanel header="Ejecutivos">
                    <DataTable
                      rows={5}
                      paginator
                      value={ejecutives}
                      tableStyle={{ minWidth: "50rem" }}
                      emptyMessage="No se encontraron registros."
                    >

                      <Column field="executiveName" header="Nombre" />
                      <Column field="executiveEmail" header="Email" />
                      <Column field="executivePhoneNumber" header="Telefono" />
                      <Column
                        body={actionBodyTemplate}
                        header="Acciones"
                        align="center"
                      />
                    </DataTable>
                  </TabPanel>
                </TabView>
              </div>


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
                          document.getElementById("upload-button-pdf");
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
                    id="upload-button-pdf"
                    className="hidden"
                    type="file"
                    accept=".pdf"
                    ref={inputFileRef}
                    onChange={handleFileChangePDf}
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
                      body={actionBodyTemplateDocuments}
                      header="Acciones"
                      align="center"
                    />
                  </DataTable>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <OverlayPanel
        ref={op}
        className="agency-search-overlay"
        style={{ minWidth: "100vh" }}
      >
        {loading && (
          <ProgressSpinner className="flex justify-content-center align-items-center" />
        )}
        {!loading && (
          <DataTable
            value={organism}
            selectionMode="single"
            paginator
            resizableColumns
            rows={5}
            selection={selectedOrganism}
            onSelectionChange={(e: any) => setSelectedOrganism(e.value)}
            onRowClick={organismSelect}
            emptyMessage="No se encontraron registros."
            sortField="id"
            sortOrder={1}
            removableSort
          >
            <Column
              field="id"
              header="Código"
              sortable
              style={{ minWidth: "4rem" }}
              align="center"
            />
            <Column
              field="rut"
              header="RUT"
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="agencyName"
              header="Nombre Organismo"
              sortable
              style={{ minWidth: "8rem" }}
            />

            <Column
              field="email"
              header="Email"
              sortable
              style={{ minWidth: "8rem" }}
            />
          </DataTable>
        )}
      </OverlayPanel>
      <Dialog
        visible={addPattensAndAuditors}
        onHide={() => setPattensAndAuditors(false)}
        draggable={false}
        header={headerDialogTemplate}
      >
        <div className="flex justify-content-around p-3">
          {tabLabel === "Fiscalizador" && (
            <>
              <div className="flex flex-column ml-4">
                <label htmlFor="auditorName">Nombre</label>
                <InputText
                  name="auditorName"
                  maxLength={40}
                  value={auditorForm.auditorName}
                  onChange={handleChangeAuditor}
                  placeholder="Ingresar nombre"
                  style={{ width: "250px" }}
                  className={
                    auditorForm.auditorName.length === 0 ? "p-invalid" : ""
                  }
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="auditorRut">RUT</label>
                <InputText
                  name="auditorRut"
                  value={auditorForm.auditorRut}
                  onChange={handleChangeAuditor}
                  placeholder="Ingresar rut"
                  style={{ width: "250px" }}
                  onInput={(e) => util.formatearRut(e)}
                  maxLength={12}
                  className={
                    !RegExp(/^\d{1,3}(\.\d{1,3}){2}-[\dkK]$/).exec(
                      auditorForm.auditorRut
                    )
                      ? "p-invalid"
                      : ""
                  }
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="auditorPhone">Teléfono</label>
                <InputMask
                  name="auditorPhone"
                  maxLength={15}
                  value={auditorForm.auditorPhone}
                  onChange={handleChangeAuditor}
                  placeholder="Ingresar telefono"
                  style={{ width: "250px" }}
                  mask="+569 9999 9999"
                  className={
                    auditorForm.auditorPhone.length === 0 ? "p-invalid" : ""
                  }
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="auditorEmail">Email</label>
                <InputText
                  name="auditorEmail"
                  maxLength={40}
                  value={auditorForm.auditorEmail}
                  onChange={handleChangeAuditor}
                  placeholder="Ingresar email"
                  style={{ width: "250px" }}
                  className={
                    !RegExp(
                      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                    ).exec(auditorForm.auditorEmail)
                      ? "p-invalid"
                      : ""
                  }
                />
              </div>
            </>
          )}
          {tabLabel === "Patente" && (
            <>
              <div className="flex flex-column ml-4">
                <label htmlFor="patentName">Patente</label>
                <InputText
                  name="patentName"
                  maxLength={40}
                  value={patentForm.patentName}
                  onChange={handleChangePatent}
                  placeholder="Ingresar Patente"
                  style={{ width: "250px" }}
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="patentModel">Modelo</label>
                <InputText
                  name="patentModel"
                  maxLength={15}
                  value={patentForm.patentModel}
                  onChange={handleChangePatent}
                  placeholder="Ingresar modelo"
                  style={{ width: "250px" }}
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="patentBrand">Marca</label>
                <InputText
                  name="patentBrand"
                  maxLength={15}
                  value={patentForm.patentBrand}
                  onChange={handleChangePatent}
                  placeholder="Ingresar marca"
                  style={{ width: "250px" }}
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="patentColor">Color</label>
                <InputText
                  name="patentColor"
                  maxLength={40}
                  value={patentForm.patentColor}
                  onChange={handleChangePatent}
                  placeholder="Ingresar color"
                  style={{ width: "250px" }}
                />
              </div>
            </>
          )}
          {tabLabel === "Ejecutivo" && (
            <>
              <div className="flex flex-column ml-4">
                <label htmlFor="executiveName">Nombre</label>
                <InputText
                  name="executiveName"
                  maxLength={40}
                  value={ejecutiveForm.executiveName}
                  onChange={handleChangeEjecutive}
                  placeholder="Ingresar Nombre"
                  style={{ width: "250px" }}
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="executiveEmail">Email</label>
                <InputText
                  name="executiveEmail"
                  maxLength={40}
                  value={ejecutiveForm.executiveEmail}
                  onChange={handleChangeEjecutive}
                  placeholder="Ingresar email"
                  style={{ width: "250px" }}
                  className={
                    !RegExp(
                      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                    ).exec(ejecutiveForm.executiveEmail)
                      ? "p-invalid"
                      : ""
                  }
                />
              </div>
              <div className="flex flex-column ml-4">
                <label htmlFor="executivePhoneNumber">Telefono</label>

                <InputMask
                  name="executivePhoneNumber"
                  maxLength={15}
                  value={ejecutiveForm.executivePhoneNumber}
                  onChange={handleChangeEjecutive}
                  placeholder="Ingresar telefono"
                  style={{ width: "250px" }}
                  mask="+569 9999 9999"
                  className={
                    ejecutiveForm.executivePhoneNumber?.length === 0 ? "p-invalid" : ""
                  }
                />
              </div>

            </>
          )}
        </div>
        <div className="flex justify-content-end">
          <Button
            label="Cancelar"
            rounded
            className="mt-3 ml-5"
            style={{ height: "40px" }}
            onClick={() => setPattensAndAuditors(false)}
          />
          {tabLabel === "Fiscalizador" && (
            <Button
              label="Guardar"
              rounded
              className="mt-3 ml-5"
              style={{ height: "40px" }}
              disabled={
                auditorForm.auditorName === "" ||
                auditorForm.auditorPhone === "" ||
                !RegExp(/^\d{1,3}(\.\d{1,3}){2}-[\dkK]$/).exec(
                  auditorForm.auditorRut
                ) ||
                !RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).exec(
                  auditorForm.auditorEmail
                )
              }
              onClick={() => handleSubmitDialog()}
            />
          )}
          {tabLabel === "Patente" && (
            <Button
              label="Guardar"
              rounded
              className="mt-3 ml-5"
              style={{ height: "40px" }}
              disabled={
                patentForm.patentName === "" ||
                patentForm.patentBrand === "" ||
                patentForm.patentColor === "" ||
                patentForm.patentModel === ""
              }
              onClick={() => handleSubmitDialog()}
            />
          )}
          {tabLabel === "Ejecutivo" && (
            <Button
              label="Guardar"
              rounded
              className="mt-3 ml-5"
              style={{ height: "40px" }}
              disabled={
                ejecutiveForm.executiveName === "" ||
                ejecutiveForm.executiveEmail === "" ||
                ejecutiveForm.executivePhoneNumber === ""
              }
              onClick={() => handleSubmitDialog()}
            />
          )}
        </div>
      </Dialog>
      {!showForm && (
        <>
          <div className="p-4 absolute bottom-0 right-0 font-semibold text-xl flex align-items-center">
            <div className="logo-tricot 2"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Organism;
