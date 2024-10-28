import { Organism, Auditors } from "../app/(main)/maintainers/organism/page";
import { Constants } from "./constants";

export interface Credentials {
  username: string;
  password: string;
}

export interface Sku {
  id?: string;
  sku: string;
  idAgency: number | string;
  idProtocol: any;
  energyEfficiencyExpire: any;
  certNumber: string;
  certModel: string;
  idQr: string;
  typeCertificationId: string | number | any;
  blameUser: string;
}

export interface User {
  user: {
    id?: number;
    state: number;
    document: string;
    address: string;
    email: string;
    fullName: string;
    password: string;
    phone: string;
    management: string;
    costCenter: string;
    idRol?: number;
    blameUser?: string;
  };
  permission: {
    idPermission: number;
  }[];
}

export const login = async (credentials: Credentials) => {
  try {
    const response = await fetch(`${Constants.API_URL}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const saveCertification = async (body: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/certification`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const passwordRecovery = async (body: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/login/recover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const generateIncident = async (body: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/revision`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const generateAditionalServices = async (body: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/additional`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createNewCertificationSli = async (body: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/certification/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const generateNotificationCert = async (id: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/notification/${id}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUsersById = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/users/${id}`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getIncidentType = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/revision/types/`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAditionalServices = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/additional/types/`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAditionalCategory = async (id: number) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/additional/classes/${id}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getIncidentCategory = async (id: number) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/revision/classes/${id}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getDashboard = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/dashboard`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOcpAnho = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/dashboard/ocp/anho`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getOcpMes = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/dashboard/ocp/mes`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getOcpState = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/dashboard/ocp/states`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getOcpDashboard = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/dashboard/ocp`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditPermissions = async (detail: any, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/roles/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detail),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getAllPermissions = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/combobox/rols/`);
    url.searchParams.append("estado", "1");

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};

export const getPermissions = async (param1: string) => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/rolespermisos/`);
    url.searchParams.append("idCompany", userData.idCompany);
    url.searchParams.append("idRol", userData.idRole);

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return null;
  }
};

export const getCertificationLote = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/certification/${id}`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getChangeHistory = async (id: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/changehistory/${id}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCertificationDocuments = async (id: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/document/${id}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCertificationSli = async (id: any, sku: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/sli/${id}/${sku}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUpdateOp = async (id: any, sku: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/validation/get/${id}/${sku}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getUpdateOpStep2 = async (id: any, sku: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/validation/create/${id}/${sku}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOrganimsByProtocols = async (id: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/protocol/agency/${id}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProtocolsbyName = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/protocol/?name=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getQrByName = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/qr/?qrcode=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProtocolDetail = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/protocol/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProtocolsCombo = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/combobox/protocol`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/user/bloq/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuditor = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/inspector/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const inactivateProtocol = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/protocol/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const inactivateQr = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/qr/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteEjecutive = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/executive/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deletePatent = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/patent/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserByName = async (name: string) => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/users/`);
    url.searchParams.append("nombreUsuario", name);
    url.searchParams.append("idRol", userData.idRole);
    url.searchParams.append("page", '1');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};

export const getInventoryTypesByFilter = async (params: any, pageParams: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/inventorytypes/`);
    url.searchParams.append("page", pageParams.page ?? '');
    url.searchParams.append("allItemsPerPage", pageParams.allItemsPerPage ?? '');
    url.searchParams.append("codigo", params.codigo ?? '');
    url.searchParams.append("disponibleVenta", params.disponibleVenta ?? '');
    url.searchParams.append("aplicaCentroDistribucion", params.aplicaCentroDistribucion ?? '');
    url.searchParams.append("aplicaTienda", params.aplicaTienda ?? '');
    url.searchParams.append("estado", params.estado ?? '');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};
export const getBalanceTypesByFilter = async (params: any, pageParams: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/inventorybalances/`);
    url.searchParams.append("id", params.id ?? '');
    url.searchParams.append("descripcion", params.descripcion ?? '');
    url.searchParams.append("estado", params.estado ?? '');
    url.searchParams.append("page", pageParams.page ?? '');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};
export const getTransactionCodeByFilter = async (params: any, pageParams: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/transactionalinventorytypes/`);
    url.searchParams.append("id", params.id ?? '');
    url.searchParams.append("codigoBal", params.codigoBal ?? '');
    url.searchParams.append("estado", params.estado ?? '');
    url.searchParams.append("page", pageParams.page ?? '');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};

export const getSecurityStockByFilter = async (params: any) => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");
    const url = new URL(`${Constants.API_URL}/securitystocks/`);

    // Combinar params y pageParams en un solo objeto
    const combinedParams = {
      ...params,
      session: userData.sesion, // añadir session de userData
      page: params.page ?? 1,
      allItemsPerPage: params.allItemsPerPage ?? false,
    };

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedParams)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getGenerateSecurityStock = async (params: any) => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");
    const url = new URL(`${Constants.API_URL}/validStocks/`);

    // Combinar params y pageParams en un solo objeto
    const combinedParams = {
      ...params,
      session: userData.sesion,
      usuario:userData.name // añadir session de userData
    };

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(combinedParams)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// 'combobox/Subsidiaries'
// 'combobox/hierarchies'
// 'validStocks'
// 'loadvalidStocks'
// 'detailsecuritystocks'
// 'get-porcentaje-stock-seguridad'

export const getDetailReportByFilter = async (params: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/detailreportcodes/`);
    url.searchParams.append("codigoMaestro", params.codigoMaestro ?? '');
    url.searchParams.append("page", params.page ?? 1);
  

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};
export const getMayorReportByFilter = async (params: any, pageParams: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/masterreportcodes/`);
    url.searchParams.append("codigoMaestro", params.codigoMaestro ?? '');
    url.searchParams.append("descripcion", params.descripcion ?? '');
    url.searchParams.append("estado", params.estado ?? '');
    url.searchParams.append("page", pageParams.page ?? '');
    url.searchParams.append("registersCount", pageParams.registersCount ?? '');
    url.searchParams.append("orderBy", pageParams.orderBy ?? '');
    url.searchParams.append("order", pageParams.order ?? '');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};

export const getHierarchiesLevelCombo = async (pageParams: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/combobox/hierarchies/`);
    url.searchParams.append("id", pageParams.id ?? '');
    url.searchParams.append("nivel", pageParams.nivel ?? '');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};
export const getHierarchiesCombo = async (pageParams: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/combobox/hierarchies/`);
    url.searchParams.append("id", pageParams.id ?? '');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};
export const getBalanceTypesByCombo = async (pageParams: any) => {
  try {
    // const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/inventorybalances/`);
    url.searchParams.append("page", pageParams.page ?? '');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};

export const getPermissonByName = async (name: string) => {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    const url = new URL(`${Constants.API_URL}/roles/`);
    url.searchParams.append("nombre", name);
    url.searchParams.append("estado", '');
    url.searchParams.append("idCompania", userData.idCompany);
    url.searchParams.append("page", '1');

    const response = await fetch(url.toString(), {
      method: "GET",
    });

    return await response.json();

  } catch (error) {
    console.log(error);
  }
};

export const getOrganismByName = async (name: string) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/agency/?name=${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductByCode = async (name: string) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/sku/?sku=${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/sku/${id}`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOrganismById = async (id: number) => {
  try {
    const response = await fetch(`${Constants.API_URL}/agency/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getComboOrganism = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/combobox/agency/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getComboWorkOrder = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/combobox/workorder/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCertificationData = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/mainTable/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOpData = async () => {
  try {
    const response = await fetch(`${Constants.API_URL}/workorder/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getComboDocumentType = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/skucertificationdocumenttype/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getComboDocumentTypeOrganism = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/agency/document/types`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getComboWarehouse = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/Subsidiaries`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCertificationsCard = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/summary/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOcSli = async (id: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/new/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSkuOdbms = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/sku/new/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProtocolDocumentsCombo = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/protocol/document/types`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getSkuOdbmsSecondSearch = async (id: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/sku/new_second_search/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCertificationDocumentType = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/certification/document/types`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getOCDocumentType = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/combobox/workorder/document/types`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getWmosDetails = async (id: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/wmos/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getWorkOrderDetails = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/workorder/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUfValue = async (fechaActual: any) => {
  try {
    const response = await fetch(
      `https://mindicador.cl/api/uf/${fechaActual}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getWorkOrderDetailsFilters = async (agency: any) => {
  try {
    // Haciendo la solicitud fetch con los parámetros de consulta
    const response = await fetch(
      `${Constants.API_URL}/workorder/filter/${agency}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Devolviendo la respuesta en formato JSON
    return await response.json();
  } catch (error) {
    // Mostrando el error en la consola y lanzándolo nuevamente
    console.log(error);
    throw error;
  }
};

export const createEditUser = async (user: User, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/user/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditWorkDetail = async (detail: any, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/workorder/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detail),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditInventoryType = async (body: any, method: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/inventorytypes/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditTypeBalance = async (body: any, method: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/inventorybalances/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};


export const createEditSku = async (sku: Sku, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/certificationsku/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sku),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditOrganism = async (body: Organism, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/agency/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const createSkuOdbms = async (body: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/sku/new/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditPattens = async (body: Organism, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/patent/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditAuditor = async (body: Auditors, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/inspector/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const createEditEjecutives = async (body: any, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/executive/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getReportData = async (name: string) => {
  try {
    const response = await fetch(
      `${Constants.API_URL_REPORTS}/report/${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getReportAdditionalServices = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL_REPORTS}/report/workorder/additional`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getReportMaintainers = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL_REPORTS}/report/workorder/certification`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getReportCertificationTracking = async () => {
  try {
    const response = await fetch(
      `${Constants.API_URL_REPORTS}/report/workorder/followup`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

// export const getUFValue = async () => {
//   try {
//     const response = await fetch(`https://mindicador.cl/api/uf`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createEditProduct = async (body: Organism, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/sku/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditProtocol = async (body: any, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/protocol/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditQr = async (body: any, method: string) => {
  try {
    const response = await fetch(`${Constants.API_URL}/qr/`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
