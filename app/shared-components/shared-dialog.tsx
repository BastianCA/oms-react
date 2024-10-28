import { Dialog } from "primereact/dialog";
import React, { ReactNode, useState } from "react";

interface PopupProps {
  visible: boolean;
  onHide: () => void;
  content: ReactNode;
  styleDialog?: {};
}

const SharedDialog: React.FC<PopupProps> = ({
  visible,
  onHide,
  content,
  styleDialog,
}) => {
  return (
    <Dialog style={styleDialog} visible={visible} onHide={onHide}>
      {content}
    </Dialog>
  );
};

export default SharedDialog;

export const usePopup = (): [
  boolean,
  ReactNode | null,
  (content: ReactNode) => void,
  () => void
] => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null);

  const handleShowPopup = (content: ReactNode) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setPopupContent(null);
    setShowPopup(false);
  };

  return [showPopup, popupContent, handleShowPopup, handleHidePopup];
};
