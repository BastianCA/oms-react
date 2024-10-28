import { generateAditionalServices, getAditionalCategory, getAditionalServices } from "@/API/apis";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";

export interface AditionalServicesDialogProps {
    data: any;
    handleClose: any;
}

export const AditionalServicesDialog: React.FC<AditionalServicesDialogProps> = ({
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
        costoRegularizacion: "0",
        observations: "",
    });

    useEffect(() => {
        getAditionalServices().then((a: any) => {
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

        const body = {
            blameUser: JSON.parse(localStorage.getItem("userData") || "{}").id,
            id: "",
            date: formData.incidentDate,
            comment: formData.observations,
            additionalClass: formData.incidentCategory.id,
            certificationId: data.idCertificacion,
            costoRegularizacion: formData.costoRegularizacion,
        }
        generateAditionalServices(body).then(() => {
            // console.log(a)
            handleClose("Servicio adicional creado")
        }, err => {
            handleClose("Error")
        })
    }

    return (
        <div>
            <div className="w-full flex mb-3 justify-content-between">
                <div className="flex align-items-center">
                    <span className="pi pi-plus text-primary text-2xl mr-2"></span>
                    <div className="font-bold text-2xl">Servicios Adicionales</div>
                </div>
            </div>
            <div className="w-full flex ">
                <div className="flex flex-column">
                    <label htmlFor="incidentType">Tipo de servicio</label>
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
                            // console.log(e);

                            getAditionalCategory(e.target.value.id).then((a: any) => {
                                if (a.success) {
                                    setComboIncidentCategory(a.response)
                                }
                            })
                        }}
                        className={formData.incidentType === null ? "p-invalid" : ""}
                    ></Dropdown>
                </div>
                <div className="flex flex-column ml-4">
                    <label htmlFor="incidentCategory">Clasificación de Servicio</label>
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
                    <label htmlFor="incidentDate">Fecha</label>
                    <Calendar
                        name="incidentDate"
                        value={formData.incidentDate}
                        onChange={handleChange}
                        showIcon
                        dateFormat="dd/mm/yy"
                    />
                </div>
                <div className="flex flex-column ml-4">
                    <label htmlFor="costoRegularizacion">Costo (UF)</label>

                    <InputText
                        name="costoRegularizacion"
                        value={formData.costoRegularizacion}
                        onChange={handleChange}
                        type="number"
                        min={0}
                    />
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

export default AditionalServicesDialog;
