import { createEditInventoryType } from "@/API/apis";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

export interface CreateEditMayorReportDialogProps {
    data: any;
    handleClose: any;
}

export const CreateEditMayorReportDialog: React.FC<CreateEditMayorReportDialogProps> = ({
    data,
    handleClose,
}) => {
    const [comboStatus, setComboStatus] = useState<any>([
        { name: 'ACTIVO', codigoMaestro: 'ACTIVO' },
        { name: 'INACTIVO', codigoMaestro: 'INACTIVO' },
    ]);

    const [title, setTitle] = useState<string>("Crear");
    const [disableForm, setDisaleForm] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        descripcion: "",
        codigoMaestro: "",
        estado: { name: "", codigoMaestro: "" },
    });

    useEffect(() => {
        let valores = data?.data
        if (data.action === "edit") {
            setTitle("Editar")
            setFormData(values => ({
                ...values,
                descripcion: valores?.descripcion ?? '',
                codigoMaestro: valores?.codigoMaestro ?? '',
                estado: { name: valores?.estado, codigoMaestro: valores?.estado } ?? '',
            }))

        } else if (data === "") {
            setTitle("Crear")
        } else {
            setTitle("Ficha")
            setFormData(values => ({
                ...values,
                descripcion: valores?.descripcion ?? '',
                codigoMaestro: valores?.codigoMaestro ?? '',
                estado: { name: valores?.estado, codigoMaestro: valores?.estado } ?? '',
            }))

            setDisaleForm(true)
        }


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
            codigoMaestro: formData.codigoMaestro ?? '',
            descripcion: formData.descripcion ?? '',
            estado: formData.estado.codigoMaestro ?? '',
        }
        console.log(body);

        createEditInventoryType(body, body.codigoMaestro !== "" ? "PUT" : "POST").then((a: any) => {
            handleClose(body.codigoMaestro !== "" ? "editado" : "creado")
        }, err => {
            handleClose(body.codigoMaestro !== "" ? "Error editar" : "Error crear")
        })
    }

    return (
        <div>
            <div className="w-full flex mb-3 justify-content-between">
                <div className="flex align-items-center">
                    <span className="pi pi-file-edit text-red-600 text-2xl mr-2"></span>
                    <div className="font-bold text-2xl">{title + ' codigo reporte mayor'}</div>
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-content-around">
                <div className="w-5 flex flex-column">
                    <label htmlFor="codigoMaestro">Codigo</label>
                    <InputText name="codigoMaestro" value={formData.codigoMaestro} disabled={disableForm}
                        onChange={handleChange} />
                </div>

                <div className="w-5 flex flex-column mb-3">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText name="descripcion" value={formData.descripcion} disabled={disableForm}
                        onChange={handleChange} />
                </div>
                <div className="w-5 flex flex-column">
                    <label htmlFor="estado">Estado</label>
                    <Dropdown
                        name="estado"
                        value={formData.estado}
                        disabled={disableForm}
                        onChange={handleChange}
                        options={comboStatus}
                        optionLabel="name"
                        placeholder="Seleccione"
                        className="w-full" />
                </div>
                <div className="w-5 p-2">

                </div>
            </div>
            {title !== "Ficha" && (

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
                        disabled={formData.codigoMaestro === null || formData.descripcion === "" || formData.estado.codigoMaestro === ""}
                        onClick={() => {
                            handleSubmit();
                        }}
                    ></Button>
                </div>
            )}
        </div >
    );
};

export default CreateEditMayorReportDialog;
