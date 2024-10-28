import { createEditInventoryType } from "@/API/apis";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

export interface CreateEditTypesDialogProps {
    data: any;
    handleClose: any;
}

export const CreateEditTransactionCodeDialog: React.FC<CreateEditTypesDialogProps> = ({
    data,
    handleClose,
}) => {
    const [comboStatus, setComboStatus] = useState<any>([
        { name: 'ACTIVO', id: 'ACTIVO' },
        { name: 'INACTIVO', id: 'INACTIVO' },
    ]);

    const [title, setTitle] = useState<string>("Crear");
    const [disableForm, setDisaleForm] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        id: "",
        descripcion: "",
        codigoBal: "",
        efectoCantidad: "",
        efectoPrecio: "",
        efectoCosto: "",
        tipoDato: "",
        estado: { name: "", id: "" },
    });

    useEffect(() => {
        let valores = data?.data
        if (data.action === "edit") {
            setTitle("Editar")
            setFormData(values => ({
                ...values,
                descripcion: valores?.descripcion ?? '',
                id: valores?.id ?? '',
                codigoBal: valores?.codigoBal ?? '',
                efectoCantidad: valores?.efectoCantidad ?? '',
                efectoPrecio: valores?.efectoPrecio ?? '',
                efectoCosto: valores?.efectoCosto ?? '',
                tipoDato: valores?.tipoDato ?? '',
                estado: { name: valores?.estado, id: valores?.estado } ?? '',
            }))

        } else if (data === "") {
            setTitle("Crear")
        } else {
            setTitle("Ficha")
            setFormData(values => ({
                ...values,
                descripcion: valores?.descripcion ?? '',
                id: valores?.id ?? '',
                codigoBal: valores?.codigoBal ?? '',
                efectoCantidad: valores?.efectoCantidad ?? '',
                efectoPrecio: valores?.efectoPrecio ?? '',
                efectoCosto: valores?.efectoCosto ?? '',
                tipoDato: valores?.tipoDato ?? '',
                estado: { name: valores?.estado, id: valores?.estado } ?? '',
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
            descripcion: formData.descripcion ?? '',
            id: formData.id ?? '',
            codigoBal: formData.codigoBal ?? '',
            efectoCantidad: formData.efectoCantidad ?? '',
            efectoPrecio: formData.efectoPrecio ?? '',
            efectoCosto: formData.efectoCosto ?? '',
            tipoDato: formData.tipoDato ?? '',
            estado: formData.estado ?? '',
        }
        console.log(body);

        createEditInventoryType(body, body.id !== "" ? "PUT" : "POST").then((a: any) => {
            handleClose(body.id !== "" ? "editado" : "creado")
        }, err => {
            handleClose(body.id !== "" ? "Error editar" : "Error crear")
        })
    }

    return (
        <div>
            <div className="w-full flex mb-3 justify-content-between">
                <div className="flex align-items-center">
                    <span className="pi pi-file-edit text-red-600 text-2xl mr-2"></span>
                    <div className="font-bold text-2xl">{title + ' codigo de transacción'}</div>
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-content-around">
                <div className="w-5 flex flex-column">
                    <label htmlFor="id">Codigo</label>
                    <InputText name="id" value={formData.id} disabled={disableForm}
                        onChange={handleChange} />
                </div>

                <div className="w-5 flex flex-column mb-3">
                    <label htmlFor="descripcion">Descripción</label>
                    <InputText name="descripcion" value={formData.descripcion} disabled={disableForm}
                        onChange={handleChange} />
                </div>
                <div className="w-5 flex flex-column">
                    <label htmlFor="codigoBal">Tipo de Balance         </label>
                    <InputText name="codigoBal" value={formData.codigoBal} disabled={disableForm}
                        onChange={handleChange} />
                </div>

                <div className="w-5 flex flex-column mb-3">
                    <label htmlFor="efectoCantidad">Efecto Cantidad</label>
                    <InputText name="efectoCantidad" value={formData.efectoCantidad} disabled={disableForm}
                        onChange={handleChange} />
                </div>
                <div className="w-5 flex flex-column mb-3">
                    <label htmlFor="tipoDato">Tipo de Dato</label>
                    <InputText name="tipoDato" value={formData.tipoDato} disabled={disableForm}
                        onChange={handleChange} />
                </div>
                <div className="w-5 flex flex-column">
                    <label htmlFor="efectoCosto">Efecto Costo</label>
                    <InputText name="efectoCosto" value={formData.efectoCosto} disabled={disableForm}
                        onChange={handleChange} />
                </div>

                <div className="w-5 flex flex-column mb-3">
                    <label htmlFor="efectoPrecio">Efecto Precio</label>
                    <InputText name="efectoPrecio" value={formData.efectoPrecio} disabled={disableForm}
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
                        disabled={formData.id === null || formData.descripcion === "" || formData.estado.id === ""}
                        onClick={() => {
                            handleSubmit();
                        }}
                    ></Button>
                </div>
            )}
        </div >
    );
};

export default CreateEditTransactionCodeDialog;
