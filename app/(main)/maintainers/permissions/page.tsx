"use client";

import { createEditPermissions, getPermissions, getPermissonByName } from "@/API/apis";
import HelpDialog from "@/app/shared-components/help-dialog";
import SearchInput from "@/app/shared-components/search-input";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
const useUtils = require('@/app/utils')

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
}

const defaulValues: any = {
    id: 0,
    state: false,
    document: "",
    email: "",
    fullName: "",


};

const Permissions = () => {
    const util = useUtils();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [deleteUserdialog, setDeleteUserdialog] = useState(false);
    const [permissionCreated, setPermissionCreated] = useState(false);
    const [permisos, setPermisos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [permissions, setPermissions] = useState<any[]>([]);
    const estados = [
        { id: "ACTIVO", name: "ACTIVO" },
        { id: "INACTIVO", name: "INACTIVO" },
    ]
    const op: any = useRef<OverlayPanel>(null);
    const [selectedPermisos, setSelectedPermisos] = useState<any>(defaulValues);
    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const toast = useRef<Toast>(null);
    const [formData, setFormData] = useState({
        nombre: "",
        codigo: "",
        estado: { id: "ACTIVO", name: "ACTIVO" },
    });


    const collectPermissions = () => {
        return permissions.reduce((accumulator: any, element: any) => {
            const permisosElemento = element.permisoOpcionesListDTOS.reduce((subAcc: any, item: any) => {
                if (item.permisosDTOS) {
                    const subPermisos = item.permisosDTOS
                        .filter((subItem: any) => subItem.estaMarcado)
                        .map((subItem: any) =>
                            subItem.idPermiso,
                        );
                    subAcc = [...subAcc, ...subPermisos];
                }
                return subAcc;
            }, []);

            return [...accumulator, ...permisosElemento];
        }, []);
    }

    const handleSubmit = () => {

        const createBody: any = {
            idRol: selectedPermisos.idRol || null,
            estado: formData.estado ? 1 : 0,
            nombre: formData.nombre,
            codigo: formData.codigo,
            permisos: [0],
            idCompania: 1,
            idTipoUsuario: 1
        };
        createEditPermissions(createBody, "POST").then(
            (res: any) => {
                setLoadingSaveButton(false);
                if (res?.statusCode === "OK") {
                    setPermissionCreated(true);
                    util.toastShow(toast, "Permiso creado correctamente.")
                } else {
                    util.toastShow(toast, res.message, "error")
                }
            },
            () => {
                setLoadingSaveButton(false);
                util.toastShow(toast, "En el servicio, intente más tarde.", "error");
            });

    };


    const handleChange = (event: any) => {
        const { name, value, id } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            [id]: value
        }));
    };

    useEffect(() => {
        if (!localStorage.getItem("userData")) {
            router.push("/");
        }
        setLoading(true);
    }, []);

    const permissionSelected = (e: any) => {
        setShowForm(true);
        setIsCreating(false);
        op.current.hide();
        getPermissions(e.data.idRol).then((data: any) => {
            setFormData({
                ...formData,
                nombre: util.blankIfNull(data.nombre),
                codigo: util.blankIfNull(data.codigo),
                estado: data.estado === "ACTIVO" ? { id: "ACTIVO", name: "ACTIVO" } : { id: "INACTIVO", name: "INACTIVO" },

            });
            setPermissionCreated(true);
            setPermissions(data.modulosSistemaListDTOS);
        });

        setSelectedPermisos(e.data);
    };

    const handleSwitchChange = (moduleName: string, submoduleId: number, actionId: number, checked: boolean) => {
        setPermissions((prevPermissions) => {
            return prevPermissions.map((module) => {
                if (module.nombre === moduleName) {
                    return {
                        ...module,
                        permisoOpcionesListDTOS: module.permisoOpcionesListDTOS.map((submodule: any) => {
                            if (submodule.idModulo === submoduleId) {
                                return {
                                    ...submodule,
                                    permisosDTOS: submodule.permisosDTOS?.map((action: any) => {
                                        if (action.idPermiso === actionId) {
                                            return { ...action, estaMarcado: !action.estaMarcado };
                                        }
                                        return action;
                                    }),
                                };
                            }
                            return submodule;
                        }),
                    };
                }
                return module;
            });
        });
        const editBody = {
            idRol: selectedPermisos.idRol,
            idPermiso: actionId,
            estaMarcado: checked
        }
        createEditPermissions(editBody, "PUT").then(a => {
            if (a.statusCodeValue === 200){
                util.toastShow(toast, "Permiso editado correctamente.")
            }else{
                util.toastShow(toast, "Al intentar actializar.","error")
            }

        })
    };

    const handleClick = (e: any) => {
        setTimeout(() => {
            getPermisos("");
        }, 1000);
        op.current.toggle(e);
    };

    const getPermisos = (data: any) => {
        getPermissonByName(data.target?.value ? data.target?.value : "").then(
            (datos: any) => {
                if (datos) {
                    setPermisos(datos.rol);
                    setLoading(false);
                } else {
                    setLoading(false);
                    util.toastShow(toast, datos.description, "error")
                }
            }
        );
    };

    const resetPermissions = (permissions: any[]) => {
        return permissions.map((module) => ({
            ...module,
            permisoOpcionesListDTOS: module.permisoOpcionesListDTOS.map((submodule: any) => ({
                ...submodule,
                permisosDTOS: submodule.permisosDTOS.map((permiso: any) => ({
                    ...permiso,
                    estaMarcado: false
                }))
            }))
        }));
    };

    const createUser = () => {
        setShowForm(true);
        setIsCreating(true);
        setFormData({
            ...formData,
            nombre: "",
            estado: { id: "ACTIVO", name: "ACTIVO" },
            codigo: "",
        });
        setSelectedPermisos(defaulValues);
        getPermissions('').then(a => {
            setPermissions(resetPermissions(a.modulosSistemaListDTOS))
        })
        setPermissionCreated(false)
    }



    const handleSearch = (e: any) => {
        setLoading(true);
        if (e.target.value.length >= 3) {
            getPermisos(e);
            op.current.show(e);
        } else {
            op.current.hide();
        }
    }

    return (
        <div>
            <Toast ref={toast} />
            <p className="general-title" style={{ minHeight: "84px" }}>
                Mantenedor de Permisos
            </p>
            <div className="w-full flex justify-content-between align-content-center mb-4">
                <div className="flex flex-wrap align-content-center">
                    <div className="general-text mr-5 maintainer-search-label">
                        Ingresar nombre
                        <HelpDialog
                            sourceTitle="Buscador de usuario"
                            sourceContent="Puede buscar por Nombre o codigo"
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
                        label="Crear permiso"
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
                                        AGREGAR O EDITAR PERMISO
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="flex flex-column">
                                        <div className="flex align-items-center ">
                                            <div className="w-full flex-wrap flex">
                                                <div className="flex flex-column mr-4 mb-4" style={{ width: "360px" }}>
                                                    <label htmlFor="nombre">
                                                        Nombre de permiso
                                                    </label>
                                                    <InputText
                                                        name="nombre"
                                                        maxLength={150}
                                                        value={formData.nombre}
                                                        onChange={handleChange}
                                                        placeholder="Nombre de permiso"
                                                        className={
                                                            formData.nombre === "" ? "p-invalid" : ""
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-column mr-4 mb-4" style={{ width: "170px" }}>
                                                    <label htmlFor="codigo">Codigo</label>
                                                    <InputText
                                                        name="codigo"
                                                        maxLength={150}
                                                        value={formData.codigo}
                                                        onChange={handleChange}
                                                        placeholder="Codigo"
                                                    />
                                                </div>

                                                <div className="flex flex-column  mb-4" style={{ width: "170px" }}>
                                                    <label htmlFor="estado">Estado</label>
                                                    <Dropdown
                                                        id="estado"
                                                        options={estados}
                                                        value={formData.estado}
                                                        optionLabel="name"
                                                        placeholder="Seleccione"
                                                        onChange={handleChange}
                                                    ></Dropdown>
                                                </div>
                                                <div className="w-full flex justify-content-end">
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
                                                        disabled={formData.nombre === "" || formData.codigo === ""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showForm && permissionCreated && (
                            <>
                                <div className="flex align-items-start">
                                    <IoKeyOutline className="text-2xl text-primary title-icon-top-margin" />
                                    <div className="text-2xl font-bold ml-3 mb-4">Modulos</div>
                                </div>
                                <div className="w-full flex flex-wrap h-24rem overflow-y-auto pl-2">
                                    <TabView style={{ width: "100%" }} scrollable>
                                        {permissions?.map((module: any) => (
                                            <TabPanel header={module.nombre} key={`tab-panel-${module.nombre}`}>
                                                <div className="flex align-items-around mr-3 mb-3 overflow-auto">
                                                    {module.permisoOpcionesListDTOS?.map((submodule: any, index: number) => {
                                                        const submoduleKey = submodule.idModulo || index;
                                                        return (
                                                            <div key={`submodule-${submoduleKey}`} className="flex flex-column align-items-start mb-3">
                                                                <p className="text-primary text-secondary font-semibold ml-2">{submodule.nombre}</p>
                                                                {submodule.permisosDTOS?.map((action: any) => (
                                                                    <div
                                                                        key={`action-${action.idPermiso}`}
                                                                        style={{ width: "250px" }}
                                                                        className="flex align-items-center flex-wrap mb-3"
                                                                    >
                                                                        <InputSwitch
                                                                            checked={action.estaMarcado ? action.estaMarcado : false}
                                                                            onChange={() =>
                                                                                handleSwitchChange(module.nombre, submodule.idPermiso, action.idPermiso, action.estaMarcado)
                                                                            }
                                                                        />
                                                                        <p className="ml-2">{action.nombre}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </TabPanel>
                                        ))}
                                    </TabView>
                                </div>
                            </>
                        )}

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
                        value={permisos}
                        selectionMode="single"
                        paginator
                        rows={5}
                        removableSort
                        selection={selectedPermisos}
                        onSelectionChange={(e: any) => setSelectedPermisos(e.value)}
                        onRowClick={permissionSelected}
                        emptyMessage="No se encontraron registros."
                    >
                        <Column
                            field="codigo"
                            header="Codigo"
                            sortable
                            style={{ minWidth: "8rem" }}
                        />
                        <Column
                            field="nombre"
                            header="Nombre"
                            sortable
                            style={{ minWidth: "8rem" }}
                        />

                        <Column
                            field="estado"
                            header="Estado"
                            sortable
                            style={{ minWidth: "8rem" }}
                        />
                    </DataTable>
                )}
            </OverlayPanel>
            {
                !showForm && (
                    <div>
                        <div className="p-4 absolute bottom-0 right-0 font-semibold text-xl flex align-items-center">
                            <div className="logo-tricot 2"></div>
                        </div>
                    </div>
                )
            }

        </div >
    );
};

export default Permissions;
