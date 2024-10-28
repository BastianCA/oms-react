import React, {useState} from "react";
import {Dialog} from "primereact/dialog";
import {IoInformationCircleOutline} from "react-icons/io5";

interface SearchProps {
    sourceTitle: string;
    sourceContent: string;
    sourceStyle?: any;
    sourceClassName?: string;
}

const HelpDialog: React.FC<SearchProps> = ({ sourceTitle, sourceContent}) => {

    const [helpDialogVisible, setHelpDialogVisible] = useState<boolean>(false);

    const headerHelpDialogTemplate = () => {
        return (
            <div className="flex justify-content-center font-bold align-items-center">
                <span className={"pi " + "pi-info-circle" + " text-primary text-2xl mr-2"}/>
                {sourceTitle}
            </div>
        );
    };

    return (

        <div className="flex">
            <IoInformationCircleOutline
                className="text-primary cursor-pointer ml-2"
                onClick={() => {
                    setHelpDialogVisible(true);
                }}
            />
            <Dialog
                visible={helpDialogVisible}
                draggable={false}
                dismissableMask={true}
                style={{ minWidth: "40vh", minHeight:"15vh" }}
                header={headerHelpDialogTemplate}
                onHide={() => setHelpDialogVisible(false)}
            >
                <div className="flex justify-content-center align-items-center p-3">
                    {sourceContent}
                </div>
            </Dialog>
        </div>

    );
};

export default HelpDialog;
