import { generateIncident, getIncidentCategory, getIncidentType } from "@/API/apis";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";

export interface IncidentDialogProps {
  data: any;
  handleClose: any;
}

export const IncidentDialogContent: React.FC<IncidentDialogProps> = ({
  data,
  handleClose,
}) => {
  const [comboIncidentType, setComboIncidentType] = useState<any>();
  const [comboIncidentCategory, setComboIncidentCategory] = useState<any>();
  const [formData, setFormData] = useState({
    incidentType: { id: "", name: "" },
    incidentCategory: { id: "", name: "" },
    resume: "",
    incidentDate: "",
    trackingCertificate: "",
    costoRegularizacion: 0,
    observations: "",
  });

  useEffect(() => {
    // console.log(data);

    getIncidentType().then((a: any) => {
      setComboIncidentType(a?.response)
    })

  }, []);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // console.log(formData.incidentCategory);

    const body = {
      id: "",
      date: formData.incidentDate,
      comment: formData.observations,
      userId: JSON.parse(localStorage.getItem("userData") || "{}").id,
      revisionClass: formData.incidentCategory.id,
      certificationId: data.idCertificacion,
      costoRegularizacion: formData.costoRegularizacion,
    }
    generateIncident(body).then(() => {
      handleClose("Incidencia creada")
    }, err => {
      handleClose("Error al intentar crear incidencia")
    })
  }

  return (
    <div>
      <div className="w-full flex mb-3 justify-content-between">
        <div className="flex align-items-center">
          <span className="pi pi-exclamation-triangle text-orange-600 text-2xl mr-2"></span>
          <div className="font-bold text-2xl">Incidencia</div>
        </div>
      </div>
      <div className="w-full flex ">
        <div className="flex flex-column">
          <label htmlFor="incidentType">Tipo de incidencia</label>
          <Dropdown
            style={{ width: "200px" }}
            id="incidentType"
            options={comboIncidentType}
            value={formData.incidentType}
            optionLabel="name"
            onChange={(e: any) => {
              setFormData((prevData) => ({
                ...prevData,
                incidentType: e.target.value,
              }));
              getIncidentCategory(e.target.value.id).then((a: any) => {
                if (a.success) {
                  setComboIncidentCategory(a.response)
                }
              })
            }}
            className={formData.incidentType === null ? "p-invalid" : ""}
          ></Dropdown>
        </div>
        <div className="flex flex-column ml-4">
          <label htmlFor="incidentCategory">Clasificación de incidencia</label>
          <Dropdown
            style={{ width: "200px" }}
            id="incidentCategory"
            options={comboIncidentCategory}
            value={formData.incidentCategory}
            optionLabel="name"
            onChange={(e: any) => {
              setFormData((prevData) => ({
                ...prevData,
                incidentCategory: e.target.value,
              }));
            }}
            className={formData.incidentCategory === null ? "p-invalid" : ""}
          ></Dropdown>
        </div>
        <div className="flex flex-column ml-4">
          <label htmlFor="incidentDate">Fecha de incidencia</label>
          <Calendar
            name="incidentDate"
            value={formData.incidentDate}
            onChange={handleChange}
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>
        <div className="flex flex-column ml-4">
          <label htmlFor="costoRegularizacion">Costo Regularización</label>
          {/* <InputText
            name="costoRegularizacion"
            maxLength={50}
            onChange={handleChange}
            style={{ width: "200px" }}
            value={formData.costoRegularizacion}
          /> */}
          <InputNumber
            inputId="costoRegularizacion"
            name="costoRegularizacion"
            value={formData.costoRegularizacion}
            onValueChange={handleChange}
            mode="currency"
            currency="CLP"
            locale="es-CL" />
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-column">
          <label htmlFor="observations">Observaciones</label>
          <InputTextarea
            maxLength={140}
            onChange={handleChange}
            name="observations"
            value={formData.observations}
            rows={5}
          />
          <small
            className="mt-1 text-right text-gray-600"
            id="observation-help"
          >
            {formData.observations.length + "/140 Caracteres"}
          </small>
        </div>
      </div>
      <div className="flex justify-content-end">
        <Button
          label="Cancelar"
          rounded
          className="w-2 mt-3 ml-3 bg-primary border-none"
          style={{ height: "35px" }}
          onClick={() => handleClose("")}
        ></Button>
        <Button
          label="Guardar"
          rounded
          className="w-2 mt-3 ml-3 bg-primary border-none"
          style={{ height: "35px" }}
          disabled={formData.costoRegularizacion == null || formData.incidentType.id == "" || formData.incidentCategory.id == "" || formData.incidentDate == ""}
          onClick={() => {
            handleSubmit();
          }}
        ></Button>
      </div>
    </div >
  );
};

export default IncidentDialogContent;
