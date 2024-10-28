import { Constants } from "./constants";

export const getFilesById = async (photoID: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL_IMAGE}/filebyid/${photoID}`,
      {
        method: "GET",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditOrganismImage = async (dataImage: FormData) => {
  try {
    const response = await fetch(`${Constants.API_URL}/agency/photo`, {
      method: "POST",
      body: dataImage,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditUserImage = async (dataImage: FormData) => {
  try {
    const response = await fetch(`${Constants.API_URL}/user/photo`, {
      method: "POST",
      body: dataImage,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserPhoto = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/user/photo/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteAgencyPhoto = async (id: any) => {
  try {
    const response = await fetch(`${Constants.API_URL}/agency/photo/${id}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditSkuDocuments = async (bodyDocument: FormData) => {
  try {
    const response = await fetch(`${Constants.API_URL}/sku/document`, {
      method: "POST",
      body: bodyDocument,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditProtocolsDocuments = async (bodyDocument: FormData) => {
  try {
    const response = await fetch(`${Constants.API_URL}/protocol/document`, {
      method: "POST",
      body: bodyDocument,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditOrganismDocuments = async (bodyDocument: FormData) => {
  try {
    const response = await fetch(`${Constants.API_URL}/agency/document`, {
      method: "POST",
      body: bodyDocument,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const createEditCertDocuments = async (bodyDocument: FormData) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/document`,
      {
        method: "POST",
        body: bodyDocument,
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteCertDocuments = async (bodyDocument: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/certification/document/${bodyDocument.id}/${bodyDocument.idFile}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteSkuDocuments = async (bodyDocument: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/sku/document/${bodyDocument.id}/${bodyDocument.idFile}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteProtocolDocuments = async (bodyDocument: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/protocol/document/${bodyDocument.id}/${bodyDocument.idFile}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteOrganismDocuments = async (bodyDocument: any) => {
  try {
    const response = await fetch(
      `${Constants.API_URL}/agency/document/${bodyDocument.id}/${bodyDocument.idFile}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
