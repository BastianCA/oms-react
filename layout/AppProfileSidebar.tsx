"use client";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { Sidebar } from "primereact/sidebar";
import { useContext, useEffect, useState } from "react";
import { PiHeadset } from "react-icons/pi";
import { LayoutContext } from "./context/layoutcontext";

const AppProfileSidebar = () => {
  const router = useRouter();
  const { layoutState, setLayoutState } = useContext(LayoutContext);
  const [userName, setUserName] = useState();

  const [visibleSuportDialog, setVisibleSuportDialog] = useState(false);
  const onProfileSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      profileSidebarVisible: false,
    }));
  };

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      router.push("/");
    }
    const name = JSON.parse(localStorage.getItem("userData") ?? "{}");
    setUserName(name.email);
  }, []);

  const headerDialogTemplate = () => {
    return (
      <div className="flex justify-content-center font-bold align-items-center">
        <PiHeadset className="mr-2" />
        Información del equipo de soporte
      </div>
    );
  };

  return (
    <Sidebar
      visible={layoutState.profileSidebarVisible}
      onHide={onProfileSidebarHide}
      position="right"
      className="layout-profile-sidebar w-full sm:w-25rem"
    >
      <div className="h-full flex flex-column justify-content-between">
        <div className="flex flex-column mx-auto md:mx-0">
          <span className="mb-2 font-semibold">Bienvenido</span>
          <span className="text-color-secondary font-medium mb-5">
            {userName}
          </span>

          <ul className="list-none m-0 p-0">
            <li>
              <a className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                <span>
                  <i className="pi pi-user text-xl text-primary"></i>
                </span>
                <div
                  className="ml-3"
                  onClick={() => {
                    layoutState.profileSidebarVisible = false;
                    router.push("/maintainers/user-info");
                  }}
                >
                  <span className="mb-2 font-semibold">Perfil</span>
                  <p className="text-color-secondary m-0">
                    Revisa la información de tu perfil.
                  </p>
                </div>
              </a>
            </li>
            <li>
              <a onClick={() => setVisibleSuportDialog(true)}
                className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                <PiHeadset className="text-primary" style={{ fontSize: "25px", marginRight: "5px" }} />
                <span className="mb-2 font-semibold">Soporte<p className="text-color-secondary m-0">
                  Información de soporte.
                </p></span>

              </a>
            </li>
            <li>
              <a className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150">
                <span>
                  <i className="pi pi-power-off text-xl text-primary"></i>
                </span>
                <div
                  className="ml-3"
                  onClick={() => {
                    layoutState.profileSidebarVisible = false;
                    router.push("/");
                    localStorage.removeItem("userData");
                    setTimeout(() => {
                      location.reload();
                    }, 500);
                  }}
                >
                  <span className="mb-2 font-semibold">Cerrar Sesion</span>
                  <p className="text-color-secondary m-0">
                    Cierra sesion en este equipo.
                  </p>
                </div>
              </a>
            </li>

          </ul>
        </div>

        <div
          className="flex flex-column mx-auto md:mx-0"
          onClick={() => setVisibleSuportDialog(true)}
        >
          <ul className="list-none m-0 p-0">

          </ul>
        </div>
      </div>

      <Dialog
        visible={visibleSuportDialog}
        onHide={() => setVisibleSuportDialog(false)}
        draggable={false}
        header={headerDialogTemplate}
      >
        <div className=" p-3">
          No dudes en comunicarte con nosotros para resolver cualquier pregunta o problema que puedas tener.
          <br /> <br /> <strong>Horario de Atención:
            Lunes a Viernes: 8:00 a 17:00 hr. <br /> <br />
            Teléfono: +56<br />
            Correo Electrónico: </strong> <br />
          <br /> Equipo de Desarrollo de Aplicaciones.
        </div>
      </Dialog>
    </Sidebar>
  );
};

export default AppProfileSidebar;
