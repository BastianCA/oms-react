"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useContext, useState } from "react";
import { PiHeadsetThin } from "react-icons/pi";
import { LayoutContext } from "../../../../layout/context/layoutcontext";
import type { Page } from "../../../../types/types";
const ForgotPassword: Page = () => {
  const router = useRouter();
  const { layoutConfig } = useContext(LayoutContext);
  const dark = layoutConfig.colorScheme !== "light";
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrc2, setImageSrc2] = useState(
    ""
  );
  return (
    <>
      <div className="px-5 min-h-screen flex justify-content-center align-items-center bg-white">
        <div className="py-7 px-4 md:px-7 z-1">
          <div className="mb-4">
            <div className="flex justify-content-center align-items-center">
              <Image
                width={280}
                height={51}
                src={imageSrc}
                alt="logo empresa"
              />
            </div>
            <div className="mb-2 flex flex-column justify-content-center align-items-center p-5 mb-5">
              <Image
                width={350}
                height={131}
                priority={true}
                src={imageSrc2}
                alt="logo Sistema"
              />
            </div>
            <div className="text-900 text-xl font-bold mb-2">
              Olvidaste tu contraseña
            </div>
            <span className="text-600 font-medium">
              Ingresa tu email para recuperar tu contraseña
            </span>
          </div>
          <div className="flex flex-column">
            <span className="p-input-icon-left w-full mb-4">
              <i className="pi pi-envelope"></i>
              <InputText
                id="email"
                type="text"
                className="w-full md:w-25rem"
                placeholder="Correo electronico"
              />
            </span>
            <div className="flex flex-wrap gap-2 justify-content-between">
              <Button
                label="Cancel"
                outlined
                className="flex-auto border-round-3xl"
                onClick={() => router.push("/")}
              ></Button>
              <Button
                label="Enviar"
                className="flex-auto border-round-3xl"
                onClick={() => router.push("/")}
              ></Button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 absolute bottom-0 right-0 font-semibold text-xl flex align-items-center">
        <PiHeadsetThin style={{ fontSize: "35px" }} />
        Soporte
      </div>
    </>
  );
};

export default ForgotPassword;
