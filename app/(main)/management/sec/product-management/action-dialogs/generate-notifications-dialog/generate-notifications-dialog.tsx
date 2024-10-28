import { generateNotificationCert } from "@/API/apis";
import { Button } from "primereact/button";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { useState } from "react";

export interface GenerateNotificationsProps {
  data: any;
  handleClose: any;
}
export const GenerateNotificationsContent: React.FC<
  GenerateNotificationsProps
> = ({ data, handleClose }) => {
  const [notification, setNotification] = useState<string[]>([]);

  const notificationCheckChange = (e: CheckboxChangeEvent) => {
    let _notification = [...notification];

    if (e.checked) _notification.push(e.value);
    else _notification.splice(_notification.indexOf(e.value), 1);

    setNotification(_notification);
  };
  return (
    <div className="flex flex-column">
      <div className="flex justify-content-center align-items-center mb-3">
        <span className="pi pi-bell text-primary text-2xl mr-2"></span>
        <div className="flex font-bold text-2xl">Envío de notificaciones</div>
      </div>
      <div className="p-2">
        Por favor, elige una o más de las siguientes notificaciones :
      </div>
      <div>
        {/* <div className="flex align-items-center p-2">
          <Checkbox
            inputId="notificationType1"
            name="notification"
            value="Coordinación Bodega y Riesgo"
            onChange={notificationCheckChange}
            checked={notification.includes("Coordinación Bodega y Riesgo")}
          />
          <label htmlFor="ingredient1" className="ml-2">
            Coordinación Bodega y Riesgo
          </label>
        </div> */}
        <div className="flex align-items-center p-2">
          <Checkbox
            inputId="notificationType2"
            name="notification"
            value="Coordinación a Análisis"
            onChange={notificationCheckChange}
            checked={notification.includes("Coordinación a Análisis")}
          />
          <label htmlFor="ingredient2" className="ml-2">
            Coordinación a Análisis
          </label>
        </div>
        <div className="flex justify-content-center mt-5">
          <Button
            label="Enviar notificación"
            rounded
            disabled={!notification.includes("Coordinación a Análisis")}
            className="mt-3 ml-3 bg-primary border-none"
            style={{ height: "35px" }}
            onClick={() => {
              generateNotificationCert(data).then(() => {
                // console.log(a)
                handleClose("notification")
              })
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateNotificationsContent;
