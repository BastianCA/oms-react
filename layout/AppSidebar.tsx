import Link from "next/link";
import { useContext } from "react";
import { LayoutState } from "../types/layout";
import AppMenu from "./AppMenu";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";

const AppSidebar = () => {
  const { setLayoutState } = useContext(LayoutContext);
  const img1 = `/layout/images/logo-tricot 2.png`;
  const img2 = `/layout/images/logo-tricot 2.png`;
  const anchor = () => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      anchored: !prevLayoutState.anchored,
    }));
  }; 
  
  return (
    <>
      <div className="sidebar-header">
        <Link href="/home" className="app-logo">
          <img className="app-logo-normal" src={img1} alt="logo-tricot 2" />
          <img className="app-logo-small" src={img2} alt="logo-tricot" />
        </Link>
        <button
          className="layout-sidebar-anchor p-link z-2 mb-2"
          type="button"
          onClick={anchor}
        ></button>
      </div>

      <div className="layout-menu-container">
        <MenuProvider>
          <AppMenu />
        </MenuProvider>
      </div>
    </>
  );
};

export default AppSidebar;
