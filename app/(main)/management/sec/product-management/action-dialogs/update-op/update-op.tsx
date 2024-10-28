import { getUpdateOp, getUpdateOpStep2 } from "@/API/apis";
import { Button } from "primereact/button";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";

export interface UpdateOpDialogProps {
    data: any;
    handleClose: any;
}

export const UpdateOpDialogContent: React.FC<UpdateOpDialogProps> = ({
    data,
    handleClose,
}) => {
    const toast = useRef<Toast>(null);
    const [loadingSave, setLoadingSave] = useState<boolean>(false);
    const [valueInput, setValueInput] = useState('');

    const handleSubmit = (event: any) => {
        setLoadingSave(true)
        getUpdateOp(data.lote, valueInput).then((a) => {
            if (a.success) {
                confirm1(event, a.message);
                setLoadingSave(false);
            } else {
                toast.current?.show({ severity: 'error', detail: a.message, life: 3000 });
                setLoadingSave(false);
            }
        }, err =>
            toast.current?.show({ severity: 'error', detail: 'En el servicio.', life: 3000 }))
    }

    const accept = () => {
        toast.current?.show({ severity: 'info', summary: 'Confirmado', detail: 'Actualización aceptada', life: 3000 });
        getUpdateOpStep2(data.lote, valueInput).then((b) => {
            if (b.success) {
                console.log(b.response);
                toast.current?.show({ severity: 'info', summary: 'Confirmado', detail: 'Actualización aceptada', life: 3000 });
                handleClose({ message: "OP Actualizada", lote: b.response })
            } else {
                toast.current?.show({ severity: 'error', detail: b.message, life: 3000 });
            }
        }, err =>
            toast.current?.show({ severity: 'error', detail: 'En el servicio.', life: 3000 }))
    }

    const reject = () => {
        toast.current?.show({ severity: 'warn', summary: 'Rechazado', detail: 'Actualizaciòn cancelada', life: 3000 });
    }

    const confirm1 = (event: any, message: string) => {
        confirmPopup({
            style: { width: "20vw" },
            target: event.currentTarget,
            message: message,
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    return (
        <div>
            <Toast ref={toast} />
            <ConfirmPopup />
            <div className="flex flex-column">
                <div className="text-xl mb-2">
                    Ingrese nueva orden de compra
                </div>
                <InputText type="number" className="mb-4" value={valueInput} onChange={(e) => setValueInput(e.target.value)} />
                <div className="flex justify-content-center">
                    <Button
                        label="Cancelar"
                        rounded
                        className="w-1 bg-primary border-none"
                        style={{ height: "35px", minWidth: "100px", maxWidth: "130px" }}
                        onClick={() => handleClose("")}
                    />
                    <Button
                        id="submit-button"
                        label="Validar"
                        rounded
                        className="w-1 ml-3 bg-primary border-none"
                        loading={loadingSave}
                        disabled={valueInput === ""}
                        style={{ height: "35px", minWidth: "100px", maxWidth: "130px" }}
                        onClick={(e) => handleSubmit(e)}
                    />
                </div>
            </div>
        </div>
    )
}