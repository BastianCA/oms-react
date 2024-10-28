"use client";
import { getAllPermissions, getUsersById } from "@/API/apis";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { Permisos } from "../users/page";
const useUtils = require('@/app/utils')

const UserInfo = () => {
  const util = useUtils();
  const router = useRouter();
  const [permissions, setPermissions] = useState<Permisos[]>([]);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const toast = useRef<Toast>(null);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    rut: "",
    telefono: "",
    direccion: "",
    email: "",
    imagen: "",
    gerencia: "",
    centroCosto: "",
    rolId: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      router.push("/");
    }
    getAllPermissions().then((a) => {
      setPermissions(a.response)
    });
    getUsersById(JSON.parse(localStorage.getItem("userData") || "{}").id).then(
      (data: any) => {
        setFormData({
          ...formData,
          nombreUsuario: util.blankIfNull(data.fullName),
          email: util.blankIfNull(data.email),
          rut: util.blankIfNull(data.document),
          direccion: util.blankIfNull(data.address),
          telefono: util.blankIfNull(data.phone),
          centroCosto: util.blankIfNull(data.costCenter),
          gerencia: util.blankIfNull(data.management),
          rolId: data.rolId
        });
        util.resolveImage(data.photoID, setImageSrc)
      }

    );
  }, []);

  return (
    <div>
      <Toast ref={toast} />

      <div className="card">
        <div className="w-full flex align-items-center p-3 mb-5">
          <FaUserEdit
            className=" text-primary mr-2"
            style={{ fontSize: "35px" }}
          />
          <p className="font-bold" style={{ fontSize: "35px" }}>
            Información del usuario
          </p>
        </div>
        <div className="flex w-full">
          <div className="flex flex-column">
            <div className="flex align-items-center ">
              <div className="w-full flex-wrap flex">
                <div className="flex flex-column mr-4 mb-4" style={{ width: "360px" }}>
                  <label htmlFor="nombreUsuario">
                    Nombre de usuario
                  </label>
                  <InputText
                    name="nombreUsuario"
                    maxLength={150}
                    value={formData.nombreUsuario}
                    disabled
                    placeholder="Nombre de usuario"
                    className={
                      formData.nombreUsuario === "" ? "p-invalid" : ""
                    }
                  />
                </div>
                <div className="flex flex-column mr-4 mb-4" style={{ width: "170px" }}>
                  <label htmlFor="rut">RUT</label>
                  <InputText
                    name="rut"
                    value={formData.rut}
                    disabled
                    placeholder="RUT"
                    onInput={(e) => util.formatearRut(e)}
                    maxLength={12}
                    className={
                      !RegExp(/^\d{1,3}(\.\d{1,3}){2}-[\dkK]$/).exec(
                        formData.rut
                      )
                        ? "p-invalid"
                        : ""
                    }
                  />
                </div>
                <div className="flex flex-column  mb-4" style={{ width: "170px" }}>
                  <label htmlFor="telefono">Teléfono</label>
                  <InputMask
                    name="telefono"
                    maxLength={150}
                    value={formData.telefono}
                    disabled
                    placeholder="Teléfono"
                  />
                </div>
              </div>
            </div>
            <div className="flex align-items-center ">
              <div className="w-full flex-wrap flex">
                <div className="flex flex-column mr-4 mb-4" style={{ width: "360px" }}>
                  <label htmlFor="direccion">Dirección</label>
                  <InputText
                    name="direccion"
                    maxLength={150}
                    value={formData.direccion}
                    disabled
                    placeholder="Dirección"
                  />
                </div>
                <div className="flex flex-column mr-4  mb-4" style={{ width: "360px" }}>
                  <label htmlFor="email">Email</label>
                  <InputText
                    name="email"
                    maxLength={150}
                    value={formData.email}
                    disabled
                    placeholder="Email"
                    className={
                      !RegExp(
                        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                      ).exec(formData.email)
                        ? "p-invalid"
                        : ""
                    }
                  />
                </div>

              </div>
            </div>
            <div className="flex align-items-center">
              <div className="w-full flex-wrap flex">
                <div className="flex flex-column mr-4 mb-4" style={{ width: "170px" }}>
                  <label htmlFor="gerencia">Gerencia</label>
                  <InputText
                    name="gerencia"
                    maxLength={150}
                    value={formData.gerencia}
                    disabled
                    placeholder="Gerencia"
                  />
                </div>
                <div className="flex flex-column mb-4 mr-4" style={{ width: "170px" }}>
                  <label htmlFor="centroCosto">Centro de costo</label>
                  <InputText
                    name="centroCosto"
                    maxLength={150}
                    value={formData.centroCosto}
                    disabled
                    placeholder="Centro de costo"
                  />
                </div>
                <div className="flex flex-column mb-4 " style={{ width: "170px" }}>
                  <label htmlFor="rolId">Permisos</label>
                  <Dropdown
                    id="rolId"
                    options={permissions}
                    value={formData.rolId}
                    optionLabel="name"
                    disabled
                    className={formData?.rolId === "" ? "p-invalid" : ""}
                  ></Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4 flex justify-content-center align-items-start">
            {!imageSrc && (
              <div
                className="flex flex-column align-items-center justify-content-center border-round bg-primary font-bold p-3 m-3 cursor-pointer hover:bg-black-alpha-60"
                style={{ width: "150px", height: "150px" }}
              ></div>
            )}
            {imageSrc && (
              <div className="border-round border-primary border-solid p-3 m-3 flex align-items-center justify-content-center ">
                <img
                  src={imageSrc}
                  style={{ width: "150px", height: "150px" }}
                  alt="Imagen seleccionada"
                />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default UserInfo;
