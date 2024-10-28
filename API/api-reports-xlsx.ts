import { Constants } from "./constants";

export const getXlsx = async (route: string) => {
  try {
    return await fetch(`${Constants.API_URL_REPORTS_XLSX}/${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log("getXlsx", error);
  }
};

export const getCertificationSkuXlsx = async (id: any) => {
  try {
    return await fetch(
      `${Constants.API_URL_REPORTS_XLSX}/excel/certificationsku/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());
  } catch (error) {
    console.log("getCertificationSkuXlsx", error);
  }
};

export const getProtocolXlsx = async () => {
  try {
    return await fetch(`${Constants.API_URL_REPORTS_XLSX}/excel/protocol/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log("getCertificationSkuXlsx", error);
  }
};

export const getQrXlsx = async () => {
  try {
    return await fetch(`${Constants.API_URL_REPORTS_XLSX}/excel/qr/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log("getCertificationSkuXlsx", error);
  }
};

export const getOrganismXlsx = async (id: any) => {
  try {
    return await fetch(`${Constants.API_URL_REPORTS_XLSX}/excel/agency/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.log("getOrganismXlsx", error);
  }
};
