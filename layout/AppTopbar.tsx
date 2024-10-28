import { Constants } from "@/API/constants";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { AppTopbarRef } from "../types/types";
import AppBreadcrumb from "./AppBreadCrumb";
import { LayoutContext } from "./context/layoutcontext";
const useUtils = require('@/app/utils')

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const util = useUtils();
  const [img, setImg] = useState<any>(util.IMAGE_SRC_DEFAULT);
  const { onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const [userData, setUserData] = useState<any>();

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
  }));

  useEffect(() => {
    setUserData(localStorage.getItem("user-country") ?? 'Cl');
    const localUserData = JSON.parse(localStorage.getItem("userData") ?? "{}")
    if (localUserData?.photoID) {
      setImg(`${Constants.API_URL_IMAGE}/filebyid/${localUserData?.photoID}`);
    }
    else setImg(util.IMAGE_SRC_DEFAULT);
  }, []);

  return (
    <div className="layout-topbar">
      <div className="topbar-start">
        <button
          ref={menubuttonRef}
          type="button"
          className="topbar-menubutton p-link p-trigger"
          onClick={onMenuToggle}
        >
          <i className="pi pi-bars"></i>
        </button>

        <AppBreadcrumb className="topbar-breadcrumb"></AppBreadcrumb>
      </div>

      <div className="topbar-end">
        <ul className="topbar-menu">
         
          <li className="topbar-profile">
            <button
              type="button"
              className="p-link"
              onClick={showProfileSidebar}
            >
              <img className="border-circle" src={img} alt="Profile" />
            
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
