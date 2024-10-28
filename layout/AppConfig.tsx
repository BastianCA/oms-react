"use client";
import { PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import { useContext, useEffect } from "react";
import type { AppConfigProps } from "../types/types";
import { LayoutContext } from "./context/layoutcontext";

const AppConfig = (props: AppConfigProps) => {
  const {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    isSlim,
    isSlimPlus,
    isHorizontal,
  } = useContext(LayoutContext);
  const { setRipple } = useContext(PrimeReactContext);
  const scales = [12, 13, 14, 15, 16];

  useEffect(() => {
    if (localStorage.getItem("layout-config")) {
      setLayoutConfig((prevState) => ({ ...prevState, ...JSON.parse(localStorage.getItem("layout-config") ?? '') }))
    }

    if (isSlim() || isSlimPlus() || isHorizontal()) {
      setLayoutState((prevState) => ({ ...prevState, resetMenu: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutConfig.menuMode]);

  const onConfigButtonClick = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: true,
    }));
  };

  const onConfigSidebarHide = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      configSidebarVisible: false,
    }));
  };

  const changeRipple = (e: InputSwitchChangeEvent) => {
    setRipple(e.value as boolean);
    setLayoutConfig((prevState) => {
      localStorage.setItem("layout-config", JSON.stringify({ ...prevState, ripple: e.value as boolean }));
      return { ...prevState, ripple: e.value as boolean }
    });
  };

  const changeMenuMode = (e: RadioButtonChangeEvent) => {
    setLayoutConfig((prevState) => {
      localStorage.setItem("layout-config", JSON.stringify({ ...prevState, menuMode: e.value }));
      return { ...prevState, menuMode: e.value }
    });
  };

  const changeMenuTheme = (e: RadioButtonChangeEvent) => {
    setLayoutConfig((prevState) => {
      localStorage.setItem("layout-config", JSON.stringify({ ...prevState, menuTheme: e.value }));
      return { ...prevState, menuTheme: e.value }
    });
  };

  const decrementScale = () => {
    setLayoutConfig((prevState) => {
      localStorage.setItem("layout-config", JSON.stringify({ ...prevState, scale: prevState.scale - 1 }));
      return { ...prevState, scale: prevState.scale - 1 }
    });
  };

  const incrementScale = () => {
    setLayoutConfig((prevState) => {
      localStorage.setItem("layout-config", JSON.stringify({ ...prevState, scale: prevState.scale + 1 }));
      return { ...prevState, scale: prevState.scale + 1 }
    });
  };

  const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale + "px";
  };

  useEffect(() => {
    applyScale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutConfig.scale]);

  return (
    <>
      <button
        className="layout-config-button config-link"
        type="button"
        onClick={onConfigButtonClick}
      >
        <i className="pi pi-cog"></i>
      </button>

      <Sidebar
        visible={layoutState.configSidebarVisible}
        onHide={onConfigSidebarHide}
        position="right"
        className="layout-config-sidebar w-18rem"
      >
        {/* <h5>Themes</h5>
        <div className="flex flex-wrap row-gap-3">
          {componentThemes.map((theme, i) => {
            return (
              <div key={i} className="w-3">
                <button
                  type="button"
                  className="cursor-pointer p-link w-2rem h-2rem border-circle flex-shrink-0 flex align-items-center justify-content-center"
                  onClick={() => _changeTheme(theme.name)}
                  style={{ backgroundColor: theme.color }}
                >
                  {theme.name == layoutConfig.theme && (
                    <i className="pi pi-check text-white"></i>
                  )}
                </button>
              </div>
            );
          })}
        </div> */}

        <h5>Escala</h5>
        <div className="flex align-items-center">
          <Button
            icon="pi pi-minus"
            type="button"
            onClick={decrementScale}
            className="w-2rem h-2rem mr-2"
            rounded
            text
            disabled={layoutConfig.scale === scales[0]}
          ></Button>
          <div className="flex gap-2 align-items-center">
            {scales.map((s, i) => {
              const index = `option${i}`
              return (
                <i
                  key={index}
                  className={classNames("pi pi-circle-fill text-300", {
                    "text-primary-500": s === layoutConfig.scale,
                  })}
                ></i>
              );
            })}
          </div>
          <Button
            icon="pi pi-plus"
            type="button"
            onClick={incrementScale}
            className="w-2rem h-2rem ml-2"
            rounded
            text
            disabled={layoutConfig.scale === scales[scales.length - 1]}
          ></Button>
        </div>

        {!props.minimal && (
          <>
            <h5>Tipo de Menú</h5>
            <div className="flex flex-wrap row-gap-3">
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  name="menuMode"
                  value={"static"}
                  checked={layoutConfig.menuMode === "static"}
                  onChange={(e) => changeMenuMode(e)}
                  inputId="mode1"
                ></RadioButton>
                <label htmlFor="mode1">Estático</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  name="menuMode"
                  value={"overlay"}
                  checked={layoutConfig.menuMode === "overlay"}
                  onChange={(e) => changeMenuMode(e)}
                  inputId="mode2"
                ></RadioButton>
                <label htmlFor="mode2">Sobrepuesto</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  name="menuMode"
                  value={"slim"}
                  checked={layoutConfig.menuMode === "slim"}
                  onChange={(e) => changeMenuMode(e)}
                  inputId="mode3"
                ></RadioButton>
                <label htmlFor="mode3">Delgado</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  name="menuMode"
                  value={"slim-plus"}
                  checked={layoutConfig.menuMode === "slim-plus"}
                  onChange={(e) => changeMenuMode(e)}
                  inputId="mode4"
                ></RadioButton>
                <label htmlFor="mode4">Delgado +</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  name="menuMode"
                  value={"reveal"}
                  checked={layoutConfig.menuMode === "reveal"}
                  onChange={(e) => changeMenuMode(e)}
                  inputId="mode5"
                ></RadioButton>
                <label htmlFor="mode6">Revelado</label>
              </div>
              <div className="flex align-items-center gap-2 w-6">
                <RadioButton
                  name="menuMode"
                  value={"horizontal"}
                  checked={layoutConfig.menuMode === "horizontal"}
                  onChange={(e) => changeMenuMode(e)}
                  inputId="mode5"
                ></RadioButton>
                <label htmlFor="mode5">Horizontal</label>
              </div>
            </div>

            <h5>Tema de Menú</h5>
            <div className="field-radiobutton">
              <RadioButton
                name="menuTheme"
                value="colorScheme"
                checked={layoutConfig.menuTheme === "colorScheme"}
                onChange={(e) => changeMenuTheme(e)}
                inputId="menutheme-colorscheme"
              ></RadioButton>
              <label htmlFor="menutheme-colorscheme">Blanco</label>
            </div>
            <div className="field-radiobutton">
              <RadioButton
                name="menuTheme"
                value="primaryColor"
                checked={layoutConfig.menuTheme === "primaryColor"}
                onChange={(e) => changeMenuTheme(e)}
                inputId="menutheme-primarycolor"
              ></RadioButton>
              <label htmlFor="menutheme-primarycolor">Rojo</label>
            </div>
            <div className="field-radiobutton">
              <RadioButton
                name="menuTheme"
                value="transparent"
                checked={layoutConfig.menuTheme === "transparent"}
                onChange={(e) => changeMenuTheme(e)}
                inputId="menutheme-transparent"
              ></RadioButton>
              <label htmlFor="menutheme-transparent">Transparente</label>
            </div>
          </>
        )}


        {!props.minimal && (
          <>
            <h5>Animación</h5>
            <InputSwitch
              checked={layoutConfig.ripple}
              onChange={changeRipple}
            ></InputSwitch>
          </>
        )}
      </Sidebar>
    </>
  );
};

export default AppConfig;
