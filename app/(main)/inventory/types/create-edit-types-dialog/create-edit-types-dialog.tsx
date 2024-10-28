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

export const CreateEditTypesDialog: React.FC<CreateEditTypesDialogProps> = ({
    data,
    handleClose,
}) => {
    const [comboStatus, setComboStatus] = useState<any>([
        { name: 'ACTIVO', id: 'ACTIVO' },
        { name: 'INACTIVO', id: 'INACTIVO' },
    ]);

    const [title, setTitle] = useState<string>("Crear");
    const [check1, setCheck1] = useState(Boolean);
    const [disableForm, setDisaleForm] = useState<boolean>(false);
    const [check2, setCheck2] = useState(Boolean);
    const [check3, setCheck3] = useState(Boolean);
    const [formData, setFormData] = useState({
        aplicaCentroDistribucion: false,
        aplicaTienda: false,
        descripcion: "",
        codigo: "",
        disponibleVenta: false,
        estado: { name: "", id: "" },
    });

    useEffect(() => {
        let valores = data?.data
        if (data.action === "edit") {
            setTitle("Editar")
            setFormData(values => ({
                ...values,
                aplicaCentroDistribucion: valores?.aplicaCentroDistribucion ?? false,
                aplicaTienda: valores?.aplicaTienda ?? false,
                descripcion: valores?.descripcion ?? '',
                codigo: valores?.codigo ?? '',
                disponibleVenta: valores?.disponibleVenta ?? false,
                estado: { name: valores?.estado, id: valores?.estado } ?? '',
            }))
            setCheck1(valores?.aplicaCentroDistribucion)
            setCheck2(valores?.aplicaTienda)
            setCheck3(valores?.disponibleVenta)
        } else if (data === "") {
            setTitle("Crear")
        } else {
            setTitle("Ficha")
            setFormData(values => ({
                ...values,
                aplicaCentroDistribucion: valores?.aplicaCentroDistribucion ?? false,
                aplicaTienda: valores?.aplicaTienda ?? false,
                descripcion: valores?.descripcion ?? '',
                codigo: valores?.codigo ?? '',
                disponibleVenta: valores?.disponibleVenta ?? false,
                estado: { name: valores?.estado, id: valores?.estado } ?? '',
            }))
            setCheck1(valores?.aplicaCentroDistribucion ?? false)
            setCheck2(valores?.aplicaTienda ?? false)
            setCheck3(valores?.disponibleVenta ?? false)
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
            aplicaCentroDistribucion: check1 ? 'SI' : 'NO',
            aplicaTienda: check2 ? 'SI' : 'NO',
            descripcion: formData.descripcion ?? '',
            codigo: formData.codigo ?? '',
            disponibleVenta: check3 ? 'SI' : 'NO',
            estado: formData.estado.id ?? '',
        }
        console.log(body);

        createEditInventoryType(body, body.codigo !== "" ? "PUT" : "POST").then((a: any) => {
            handleClose(body.codigo !== "" ? "editado" : "creado")
        }, err => {
            handleClose(body.codigo !== "" ? "Error editar" : "Error crear")
        })
    }

    return (
        <div>
            <div className="w-full flex mb-3 justify-content-between">
                <div className="flex align-items-center">
                    <span className="pi pi-file-edit text-red-600 text-2xl mr-2"></span>
                    <div className="font-bold text-2xl">{title + ' tipo de inventario'}</div>
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-content-around">
                <div className="w-5 flex flex-column">
                    <label htmlFor="codigo">Tipo</label>
                    <InputText name="codigo" value={formData.codigo} disabled={disableForm}
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
                    <div className="w-full flex flex-column gap-3 justify-content-center">
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="aplicaCentroDistribucion"
                                name="aplicaCentroDistribucion"
                                disabled={disableForm}
                                onChange={(a: any) => setCheck1(a.checked)}
                                checked={check1}
                            />
                            <label htmlFor="aplicaCentroDistribucion" className="ml-2">Aplica centro de distribución</label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="disponibleVenta"
                                name="disponibleVenta"
                                disabled={disableForm}
                                onChange={(a: any) => setCheck2(a.checked)}
                                checked={check2}
                            />
                            <label htmlFor="disponibleVenta" className="ml-2">Disponible para la venta</label>
                        </div>
                        <div className="flex align-items-center">
                            <Checkbox
                                inputId="aplicaTienda"
                                name="aplicaTienda"
                                disabled={disableForm}
                                onChange={(a: any) => setCheck3(a.checked)}
                                checked={check3}
                            />
                            <label htmlFor="aplicaTienda" className="ml-2">Aplica tienda</label>
                        </div>
                    </div>
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
                        disabled={formData.codigo === null || formData.descripcion === "" || formData.estado.id === ""}
                        onClick={() => {
                            handleSubmit();
                        }}
                    ></Button>
                </div>
            )}
        </div >
    );
};

export default CreateEditTypesDialog;
