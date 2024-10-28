"use client";
import { createEditUserImage, deleteUserPhoto } from "@/API/api-imagenes";
import { createEditUser, deleteUser, getAllPermissions, getUserByName, getUsersById } from "@/API/apis";
import HelpDialog from "@/app/shared-components/help-dialog";
import SearchInput from "@/app/shared-components/search-input";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { Password } from "primereact/password";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
const useUtils = require('@/app/utils')

export interface Permisos {
  name: string;
  permission: {
    id: number;
    name: string;
    checked?: boolean;
    permission?: {
      id: string,
      name: string,
      checked?: boolean
    }[]
  }[];
}

export interface UserDto {
  id: number;
  state: boolean;
  document: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  costCenter: string;
  management: string;
  rol_id_rol: number;
  created_at: string;
  permissions: Permisos[];
}

const defaulValues: UserDto = {
  id: 0,
  state: false,
  document: "",
  email: "",
  fullName: "",
  phone: "",
  address: "",
  costCenter: "",
  management: "",
  rol_id_rol: 0,
  created_at: "",
  permissions: [
    {
      name: "",
      permission: [
        {
          id: 0,
          name: "",
          checked: false,
        },
      ],
    },
  ],
};

const Users = () => {
  const util = useUtils();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteUserdialog, setDeleteUserdialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [permissions, setPermissions] = useState<Permisos[]>([]);
  const op: any = useRef<OverlayPanel>(null);
  const [selectedUser, setSelectedUser] = useState<any>(defaulValues);
  const inputFileRef = useRef<any>();
  const [fileSelected, setFileSelected] = useState<any>();
  const [imageLabel, setImagenLabel] = useState<any>("Imagen");
  const [imageSrc, setImageSrc] = useState<any>(null);
  const [loadingSaveButton, setLoadingSaveButton] = useState(false);
  const [lockSaveButton, setLockSaveButton] = useState(true);
  const toast = useRef<Toast>(null);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    rut: "",
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
    estado: "",
    rolId: ""
  });
  const requiredFieldsIndex = [
    'fullName',
    'document',
    'email'
  ]

  const handleFileChange = () => {
    const selectedFile = inputFileRef.current.files[0];

    if (
      selectedFile?.type === "image/jpg" ||
      selectedFile?.type === "image/jpeg" ||
      selectedFile?.type === "image/png"
    ) {
      setFileSelected(selectedFile);
      setLockSaveButton(false)
      setFormData((prevData) => ({
        ...prevData,
        imagen: selectedFile.name,
      }));
      const imageUrl = URL.createObjectURL(selectedFile);
      setImageSrc(imageUrl);
    } else {
      util.toastShow(toast, "Ingrese un tipo de archivo válido. (jpg, jpeg, png)", "error")
    }
  };

  const checkRequiredFields = (form: any) => {
    requiredFieldsIndex.forEach((key) => {
      if (["", "null"].includes(form[key] + ''))
        return true
    })

    return resolveLockSaveButton()
  }



  const handleSubmit = () => {
    const editBody: any = {
      user: {
        id: selectedUser.id || null,
        state: selectedUser.state ? 1 : 0,
        document: formData.rut,
        email: formData.email,
        fullName: formData.nombreUsuario,
        password: formData.contraseña,
        nombre: formData.nombre,
        apellido: formData.apellido,
        rolId: formData?.rolId || null,
        blameUser: JSON.parse(localStorage.getItem("userData") ?? "{}").id,
      },
    };

    if (checkRequiredFields(editBody)) {
      util.toastShow(toast, "Ingrese los campos solicitados.", "error")
    } else {
      setLoadingSaveButton(true);
      createEditUser(editBody, selectedUser.id !== 0 ? "PUT" : "POST").then(
        (res: any) => {
          setLoadingSaveButton(false);
          setLockSaveButton(true);
          if (res?.success) {
            util.toastShow(toast, res.message)
            setUserImage(res.response[0], (response: any) => {
              userSelect({ data: response });
            });

          } else {
            util.toastShow(toast, res.message, "error")
          }
        },
        () => {
          setLoadingSaveButton(false);
          setLockSaveButton(true);
          util.toastShow(toast, "En el servicio, intente más tarde.", "error");
        });
    }
  };

  const headerDialogTemplate = () => {
    return (
      <div className="flex justify-content-center font-bold align-items-center">
        <IoWarningOutline className="mr-2 text-red-600 text-3xl" />
        Eliminar usuario
      </div>
    );
  };

  const setUserImage = (res: any, callback: any) => {
    if (fileSelected) {
      const formDataApi = new FormData();
      formDataApi.append("file", fileSelected);
      formDataApi.append("userID", res.id);
      formDataApi.append("photoID", res.photoID ? res.photoID : "");

      createEditUserImage(formDataApi).then((a) => {
        setPhotoLocalStorage(res.id, a.response.photoID)
        res.photoID = a.response.photoID
        callback(res)
      });
    }
    else callback(res)
  };

  const setPhotoLocalStorage = (userID: any, photoID: any) => {
    let localUserData = JSON.parse(localStorage.getItem("userData") || "{}")
    if (localUserData?.id === userID) {
      localUserData.photoID = photoID
      localStorage.setItem("userData", JSON.stringify(localUserData));
    }
  }

  const handleChange = (event: any) => {
    setLockSaveButton(false)
    const { id, name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      router.push("/");
    }
    getAllPermissions().then((a) => {
      setPermissions(a.list)
    });

    setLoading(true);
  }, []);

  const userSelect = (e: any) => {
    setFileSelected(null)
    setLockSaveButton(true);
    setShowForm(true);
    setIsCreating(false);
    op.current.hide();
    getUsersById(e.data.id).then((data: any) => {
      setFormData({
        ...formData,
        nombreUsuario: util.blankIfNull(data.fullName),
        email: util.blankIfNull(data.email),
        rut: util.blankIfNull(data.document),
        nombre: util.blankIfNull(data.nombre),
        apellido: util.blankIfNull(data.apellido),
        estado: util.blankIfNull(data.estado),
      });
    });

    setSelectedUser(e.data);
  };



  const handleClick = (e: any) => {
    setTimeout(() => {
      getUsers("");
    }, 1000);

    op.current.toggle(e);
  };

  const getUsers = (data: any) => {
    getUserByName(data.target?.value ? data.target?.value : "").then(
      (datos: any) => {
        if (datos.usuario) {
          setUsers(datos.usuario);
          setLoading(false);
        }
      }, (err: any) => {
        console.log(err);

      });
  };

  const resolveLockSaveButton = () => {
    if (isCreating)
      return (
        formData.nombreUsuario === ""
        ||
        !RegExp(/^\d{1,3}(\.\d{1,3}){2}-[\dkK]$/).exec(formData.rut)
        ||
        !RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).exec(formData.email)
        ||
        (isCreating && formData.contraseña.length < 8)
      )

    return !(
      formData.nombreUsuario &&
      RegExp(/^\d{1,3}(\.\d{1,3}){2}-[\dkK]$/).exec(formData.rut)
      &&
      RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).exec(formData.email)
      &&
      (formData.contraseña.length >= 8 || formData.contraseña.length == 0)
    )

  }

  const createUser = () => {
    setShowForm(true);
    setIsCreating(true);
    setFormData({
      ...formData,
      nombreUsuario: "",
      rut: "",
      apellido: "",
      nombre: "",
      email: "",
      contraseña: "",
    });
    setSelectedUser(defaulValues);
    setImageSrc("");

  }


  const footerContent = (
    <div className="w-full flex justify-content-center">
      <Button
        className="w-3 border-round-3xl mr-5"
        label="No"
        onClick={() => setDeleteUserdialog(false)}
      />
      <Button
        className="w-3 border-round-3xl"
        label="Si"
        onClick={() => {
          deleteUser(selectedUser.id).then((data: any) => {
            if (data?.success) {
              util.toastShow(toast, "Usuario eliminado exitosamente.")
            } else {
              util.toastShow(toast, "Al intentar eliminar al usuario.", "error")
            }
          });
          setShowForm(false);
          setDeleteUserdialog(false);
        }}
      />
    </div>
  );

  const handleSearch = (e: any) => {
    setLoading(true);
    if (e.target.value.length >= 3) {
      getUsers(e);
      op.current.show(e);
    } else {
      op.current.hide();
    }
  }

  return (
    <div>
      <Toast ref={toast} />
      <p className="general-title" style={{ minHeight: "84px" }}>
        Mantenedor de Usuario
      </p>
      <div className="w-full flex justify-content-between align-content-center mb-4">
        <div className="flex flex-wrap align-content-center">
          <div className="general-text mr-5 maintainer-search-label">
            Ingresar nombre de usuario
            <HelpDialog
              sourceTitle="Buscador de usuario"
              sourceContent="Puede buscar por Nombre, Email y RUT"
            />
          </div>
          <div
            id="search-icon"
            onClick={(e) => {
              setLoading(true);
              handleClick(e);
            }}
          />
          <div className="align-items-end flex mb-2">
            <span className="p-input-icon-left mr-5" style={{ display: "flex" }}>
              <i id="search-icon" className="pi pi-search lupa-padding" />
              <SearchInput
                sourceOnChange={handleSearch}
              />
            </span>
          </div>
          <Button
            label="Ver todos"
            icon="pi pi-bars"
            outlined
            rounded
            className="font-bold min-button-width mb-2"
            onClick={() => {
              document.getElementById("search-icon")?.click();
            }}
          />
        </div>
        <div className="align-items-baseline flex mb-2">
          <Button
            rounded
            label="Crear usuario"
            icon="pi pi-plus"
            iconPos="left"
            className="maintainer-new-width"
            onClick={createUser}
          />
        </div>
      </div>
      {showForm && (
        <div>
          <div className="card">
            <div className="flex w-full">
              <div className="w-full flex flex-column">
                <div className="flex align-items-start">
                  <FaUserEdit className="text-2xl text-primary title-icon-top-margin" />
                  <div className="text-2xl font-bold ml-3 mb-4">
                    AGREGAR O EDITAR USUARIO
                  </div>
                </div>
                <div className="flex w-full">
                  <div className="flex flex-column">
                    <div className="flex align-items-center ">
                      <div className="w-full flex-wrap flex">
                        <div className="flex flex-column mr-4 mb-4" style={{ width: "35%" }}>
                          <label htmlFor="nombre">Nombre</label>
                          <InputText
                            name="nombre"
                            maxLength={150}
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                          />
                        </div>
                        <div className="flex flex-column mr-4 mb-4" style={{ width: "20%" }}>
                          <label htmlFor="apellido">Apellido</label>
                          <InputText
                            name="apellido"
                            maxLength={150}
                            value={formData.apellido}
                            onChange={handleChange}
                            placeholder="Apellido"
                          />
                        </div>
                        <div className="flex flex-column mr-4 mb-4" style={{ width: "20%" }}>
                          <label htmlFor="email">Email</label>
                          <InputText
                            name="email"
                            maxLength={150}
                            value={formData.email}
                            onChange={handleChange}
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
                    <div className="flex align-items-center ">
                      <div className="w-full flex-wrap flex">
                        <div className="flex flex-column mr-4 mb-4" style={{ width: "35%" }}>
                          <label htmlFor="nombreUsuario">
                            Nombre de usuario
                          </label>
                          <InputText
                            name="nombreUsuario"
                            maxLength={150}
                            value={formData.nombreUsuario}
                            onChange={handleChange}
                            placeholder="Nombre de usuario"
                            className={
                              formData.nombreUsuario === "" ? "p-invalid" : ""
                            }
                          />
                        </div>
                        <div className="flex flex-column mr-4 mb-4" style={{ width: "20%" }}>
                          <label htmlFor="rut">RUT</label>
                          <InputText
                            name="rut"
                            value={formData.rut}
                            onChange={handleChange}
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
                        <div className="flex flex-column  mr-4 mb-4" style={{ width: "20%" }}>
                          <label htmlFor="contraseña">Contraseña</label>
                          <Password
                            name="contraseña"
                            value={formData.contraseña}
                            onChange={handleChange}
                            placeholder="Contraseña"
                            toggleMask
                            minLength={8}
                            maxLength={10}
                            feedback={false}
                            aria-describedby="password-help"
                            className={
                              (
                                (formData.contraseña.length === 0 && isCreating)
                                ||
                                (formData.contraseña.length !== 0 && formData.contraseña.length < 8 && !isCreating)
                              ) ? "p-invalid"
                                : ""
                            }
                          />
                          <div>
                            <small className="mt-2" id="password-help">
                              La contraseña debe ser de 8 caracteres mínimo.
                            </small>
                          </div>
                        </div>


                      </div>
                    </div>

                    <div className="flex align-items-center">
                      <div className="w-full flex-wrap flex">
                        <div className="flex flex-column  mb-4" style={{ width: "35%" }}>
                          <label htmlFor="rolId">Permisos</label>
                          <Dropdown
                            id="rolId"
                            options={permissions}
                            value={formData.rolId}
                            optionLabel="name"
                            placeholder="Seleccione"
                            onChange={handleChange}
                            className={formData?.rolId === "" ? "p-invalid" : ""}
                          ></Dropdown>
                        </div>
                        <div className="flex flex-column mr-4 mb-4" style={{ width: "170px" }}>

                        </div>
                        <div className="flex flex-column mr-4 mb-4" style={{ width: "170px" }}>

                        </div>
                      </div>
                    </div>
                    {selectedUser.id !== 0 && (
                      <Button
                        outlined
                        label="Inactivar usuario"
                        icon="pi pi-trash"
                        rounded
                        severity="danger"
                        className="mt-3 mb-5"
                        style={{ height: "40px", width: "200px" }}
                        onClick={() => setDeleteUserdialog(true)}
                      />
                    )}
                  </div>
                  {/* <div className="w-4 flex justify-content-center align-items-start">
                    {!imageSrc && (
                      <div
                        className="flex flex-column align-items-center justify-content-center border-round bg-primary font-bold p-3 m-3 cursor-pointer hover:bg-black-alpha-60"
                        style={{ width: "150px", height: "150px" }}
                        onClick={() => {
                          const input: any =
                            document.getElementById("upload-button");
                          input.click();
                        }}
                        onMouseOver={() => setImagenLabel("Subir Imagen")}
                        onMouseLeave={() => setImagenLabel("Imagen")}
                      >
                        {imageLabel === "Subir Imagen" && (
                          <>
                            <i className="pi pi-upload mb-2" />
                          </>
                        )}
                        {imageLabel}
                      </div>
                    )}
                    {imageSrc && (
                      <div className="flex flex-column justify-content-center align-items-center">
                        <div
                          className="border-round border-primary border-solid p-3 ml-3 mr-3 flex align-items-center justify-content-center cursor-pointer "
                          onClick={() => {
                            const input: any =
                              document.getElementById("upload-button");
                            input.click();
                          }}
                        >
                          <img
                            src={imageSrc}
                            style={{ width: "150px", height: "150px" }}
                            alt="Imagen seleccionada"
                          />
                        </div>
                        <Button
                          className="border-circle mt-0"
                          text icon="pi pi-trash"
                          tooltip="Eliminar imagen"
                          onClick={() => {
                            deleteUserPhoto(selectedUser.id).then(a => {
                              if (a.success) {
                                util.toastShow(toast, "Imagen eliminada correctamente.")
                                setImageSrc(null)
                                setPhotoLocalStorage(selectedUser.id, null)
                              } else {
                                util.toastShow(toast, a.message, "error")
                              }
                            })
                          }}
                        />
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
              <input
                id="upload-button"
                className="hidden"
                type="file"
                ref={inputFileRef}
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </div>


            <div className="flex justify-content-end">
              <Button
                label="Cancelar"
                rounded
                className="mt-3 ml-5"
                style={{ height: "40px", width: "145px" }}
                onClick={() => setShowForm(false)}
              />
              <Button
                className="mt-3 ml-3"
                rounded
                label="Guardar"
                loading={loadingSaveButton}
                style={{ height: "40px", width: "145px" }}
                onClick={() => handleSubmit()}
                disabled={lockSaveButton}
              />
            </div>
          </div>
        </div>
      )}
      <OverlayPanel
        className="user-search-overlay"
        ref={op}
        style={{ minWidth: "65vh" }}
      >
        {loading && (
          <ProgressSpinner className="flex justify-content-center align-items-center" />
        )}
        {!loading && (
          <DataTable
            value={users}
            selectionMode="single"
            paginator
            rows={5}
            removableSort
            selection={selectedUser}
            onSelectionChange={(e: any) => setSelectedUser(e.value)}
            onRowClick={userSelect}
            emptyMessage="No se encontraron registros."
          >
            <Column
              field="document"
              header="RUT"
              sortable
              style={{ minWidth: "8rem" }}
            />
            <Column
              field="fullName"
              header="Nombre"
              sortable
              style={{ minWidth: "8rem" }}
            />

            <Column
              field="email"
              header="Email"
              sortable
              style={{ minWidth: "8rem" }}
            />
          </DataTable>
        )}
      </OverlayPanel>
      {!showForm && (
        <div>
          <div className="p-4 absolute bottom-0 right-0 font-semibold text-xl flex align-items-center">
            <div className="logo-tricot 2"></div>
          </div>
        </div>
      )}
      <Dialog
        header={headerDialogTemplate}
        visible={deleteUserdialog}
        onHide={() => setDeleteUserdialog(false)}
        footer={footerContent}
        className="w-3"
      >
        <div className="p-2">
          ¡Atención! <br /> La acción de eliminar usuario es irreversible <br />{" "}
          ¿Estás seguro que deseas eliminar este usuario?
        </div>
      </Dialog>
    </div>
  );
};

export default Users;
