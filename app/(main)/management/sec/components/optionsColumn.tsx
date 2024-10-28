import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import React, { useEffect, useState } from "react";

export interface OptionsColumnProps {
    rowData: any;
    handleSelect: any;
}

export const OptionsColumn: React.FC<OptionsColumnProps> = ({
    rowData,
    handleSelect,
}) => {
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [totalWarnings, setTotalWarnings] = useState(0);
    const [warningMessage, setWarningMessage] = useState("");
    const warning_OC_SLI = "No existe la OC en SLI"

    useEffect(() => {

        let element = "";
        let contador = 0;
        if (rowData.lpn_state_warning !== "0") {
            contador++
            element = `Incidencia en el estado de ${rowData.lpn_state_warning} LPNs`
            setWarningMessage(element)
        }
        if (rowData.quantity === null) {
            contador++
            element = element !== "" ? element + " / " + warning_OC_SLI : warning_OC_SLI
            setWarningMessage(element)
        }
        setTotalWarnings(contador)
    }, [])

    return (
        <div className="align-items-center flex flex-wrap justify-content-start">
            <div>
                <Button
                    rounded
                    icon="pi pi-pencil"
                    className="bg-primary border-none ml-7"
                    loading={loadingData}
                    style={{ height: "33px", width: "35px" }}
                    onClick={() => {
                        setLoadingData(true)
                        handleSelect(rowData)
                    }}
                />
            </div>
            {totalWarnings > 0 && (
                <>
                    <Tooltip target=".custom-target-icon" disabled={totalWarnings === 0} />
                    <i className="pi pi-exclamation-triangle p-overlay-badge ml-2 text-orange-500 custom-target-icon text-2xl"
                        data-pr-tooltip={warningMessage}
                        data-pr-position="left"
                        data-pr-at="left top+10"
                        data-pr-my="right center-2"
                        style={{ fontSize: '1.2rem', cursor: 'pointer', color: 'red' }}>
                        <Badge value={totalWarnings} className="bg-red-600 "></Badge>
                    </i>
                </>
            )}
        </div >
    )
};

export default OptionsColumn;
