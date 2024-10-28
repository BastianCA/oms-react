"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useContext, useEffect, useRef, useState } from "react";
import { LuKeyRound } from "react-icons/lu";
import { PiHeadsetThin } from "react-icons/pi";
import type { Page } from "../../types/types";
import { login } from "../../API/apis";
import { LayoutContext } from "../../layout/context/layoutcontext";
import { Menu } from "../../layout/menu-data/menu-data";


interface Country {
  name: string;
  code: string;
}


const Login: Page = () => {
  const toast = useRef<Toast>(null);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [visibleSuportDialog, setVisibleSuportDialog] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);
  const [imageSrc, setImageSrc] = useState(`/layout/images/logo-tricot 2.png`);
  const [imageSrc2, setImageSrc2] = useState(
    ""
  );
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "Chile",
    code: "CL",
  });

  const showError = (message: string) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const handleEmailChange = (event: any) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    updateSubmitButtonState(newEmail, password, selectedCountry);
  };

  const handlePasswordChange = (event: any) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    updateSubmitButtonState(email, newPassword, selectedCountry);
  };

  const handleCountryChange = (event: any) => {
    const country = event.target.value;
    setSelectedCountry(country);

    updateSubmitButtonState(email, password, country);
  };

  const headerDialogTemplate = () => {
    return (
      <div className="flex justify-content-center font-bold align-items-center">
        <LuKeyRound className="mr-2" />
        Recuperar contraseña
      </div>
    );
  };

  useEffect(() => {

  }, []);

  const updateSubmitButtonState = (
    newEmail: string,
    newPassword: string,
    countrySelected: Country
  ) => {
    setIsSubmitDisabled(
      !(
        newEmail.trim() !== "" &&
        newPassword.trim() !== "" &&
        countrySelected !== null
      )
    );
  };

  const setHomePage = () => {
    const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");

    const filtered = Menu.MenuData.reduce((acc: any, item: any) => {
      if (item.items) {
        const subItemsFiltrados = item.items.filter((subItem: any) =>
          userData.permissionUserLoginDTOS.some(
            (permission: any) => permission.idOpcion === subItem.idPermission
          )
        );

        if (subItemsFiltrados.length > 0) {
          return [...acc, { ...item, items: subItemsFiltrados }];
        } else {
          return acc;
        }
      } else {
        return acc;
      }
    }, []);
    router.push("/home");

  };

  const handleSubmit = async () => {
    setLoadingButton(true);
    const credentials: any = {
      username: email,
      password: password,
    };
    login(credentials).then(data => {

      if (data.username) {
        localStorage.setItem(
          "user-country",
          selectedCountry.code.toLowerCase()
        );
        localStorage.setItem(
          "userData",
          JSON.stringify(data)
        );
        if (data.permissionUserLoginDTOS.length > 0) {
          setTimeout(() => {
            setHomePage();
          }, 1000);
        } else {
          setLoadingButton(false);
          toast.current?.show({
            severity: "info",
            summary: "Soporte",
            detail: "Usuario sin permisos, porfavor comuniquese con soporte.",
            life: 3000,
          });
        }
      } else {
        setLoadingButton(false);
        showError(data.message);
      }
    }, (error) => {
      setLoadingButton(false);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error de servicio, intente nuevamente",
        life: 3000,
      });
    });

  };

  const handleKeyPress = (event: any) => {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.key === "Enter") {
      document.getElementById("login-button")?.click();
    }
  };


  return (
    <>
      <Toast ref={toast} />
      <div className="min-h-screen flex justify-content-center">
        <div className="py-7 px-4 md:px-7 z-1">
          <div className="flex flex-column align-items-center" style={{ minWidth: "400px" }}>
            <div className="flex justify-content-center align-items-center mt-5 mb-3">
              <Image
                width={300}
                height={105}
                src={imageSrc}
                alt="logo empresa"
                priority
              />
            </div>
            <div className="mb-2 flex flex-column justify-content-center align-items-center p-5 mb-5">
              <div className="font-bold text-4xl">OMS TRICOT</div>
              {/* <Image
                width={350}
                height={131}
                priority={true}
                src={imageSrc2}
                alt="logo Sistema"
              /> */}
            </div>
            <div className="w-10">
              <div className="flex justify-content-between mb-2">
                <div className="flex align-items-center text-900 text-xl font-bold">
                  Inicia sesión
                </div>
                {/* <Dropdown
                  value={selectedCountry}
                  onChange={(e: DropdownChangeEvent) => handleCountryChange(e)}
                  options={countries}
                  optionLabel="name"
                  placeholder="Pais"
                  valueTemplate={selectedCountryTemplate}
                  itemTemplate={countryOptionTemplate}
                  dropdownIcon={(opts: any) => {
                    return opts.iconProps["data-pr-overlay-visible"] ? (
                      <ChevronRightIcon {...opts.iconProps} />
                    ) : (
                      <ChevronDownIcon {...opts.iconProps} />
                    );
                  }}
                /> */}
              </div>
              <p className="text-600 font-medium mb-4">
                Ingresa tus datos de usuario
              </p>

              <div className="flex flex-column">
                <span className="p-input-icon-left w-full mb-4">
                  <i className="pi pi-envelope"></i>
                  <InputText
                    id="email"
                    type="text"
                    className="w-full"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </span>
                <span className="p-input-icon-left w-full mb-4">
                  <i className="pi pi-lock"></i>
                  <Password
                    id="password"
                    type="password"
                    className="w-full"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                    toggleMask
                    feedback={false}
                    onKeyDown={handleKeyPress}
                  />
                </span>
                <div className="mb-4 flex flex-wrap gap-3">
                  <a
                    className="text-600 cursor-pointer hover:text-primary cursor-pointer ml-auto transition-colors transition-duration-300"
                    onClick={() => router.push("/auth/forgotpassword")}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Button
                  id="login-button"
                  label="Iniciar sesión"
                  className="border-round-3xl w-full"
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled}
                  loading={loadingButton}
                ></Button>
              </div>
              <div className="flex justify-content-between align-items-center mt-5">
                <div
                  className="flex align-items-center cursor-pointer"
                  style={{ color: "#757575", fontSize: "12px" }}
                  onClick={() => setVisibleSuportDialog(true)}
                >
                  <PiHeadsetThin
                    style={{ fontSize: "18px", marginRight: "5px" }}
                  />
                  Soporte
                </div>
                <p style={{ fontSize: "10px" }}>Versión 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        visible={visibleSuportDialog}
        onHide={() => setVisibleSuportDialog(false)}
        draggable={false}
        header={headerDialogTemplate}
      >
        <div className=" p-3">
          Comunícate con tu administrador para recibir o reestablecer tu
          contraseña <br /> <br /> <strong>Soporte@oms-tricot.com</strong> <br />
          <br /> Este proceso puede tardar un máximo de 24 horas
        </div>
      </Dialog>
    </>
  );
};

export default Login;
