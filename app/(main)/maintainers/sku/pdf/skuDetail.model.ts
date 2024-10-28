interface SkuDetail {
  sku: string;
  descripcion: string;
  depto: string;
  descDepto: string;
  familia: string;
  descFamilia: string;
  subFamilia: string;
  descSubFamilia: string;
  grupo: string;
  descGrupo: string;
  descConjunto: string;
  manager: any; // Cambia 'any' al tipo correcto si es conocido
  chief: any; // Cambia 'any' al tipo correcto si es conocido
  buyer: any; // Cambia 'any' al tipo correcto si es conocido
  ordertype: any; // Cambia 'any' al tipo correcto si es conocido
  origin: any; // Cambia 'any' al tipo correcto si es conocido
  management: any; // Cambia 'any' al tipo correcto si es conocido
  typology: any; // Cambia 'any' al tipo correcto si es conocido
}

interface Agency {
  id: number;
  name: string;
}

interface DocumentType {
  id: number;
  name: string;
  descrip: any; // Cambia 'any' al tipo correcto si es conocido
}

export interface SkuCertificationDocuments {
  id: number;
  sku: string;
  sku_certification: number;
  document_name: string;
  document_type: number;
  comment: string;
  id_file: string;
  createdAt: string;
  documentName: string;
  idFile: string;
  documentType: DocumentType;
}

interface SkuCertification {
  id: number;
  sku: string;
  certAveragePeriod: number;
  certNumber: string;
  protocol: string;
  certModel: string;
  idQr: string;
  energyEfficiencyExpire: any;
  typeCertificationsId: number;
  agency: Agency;
  skuCertificationDocuments: SkuCertificationDocuments[];
}

export interface SkuObject {
  sku: string;
  providerId: any; // Cambia 'any' al tipo correcto si es conocido
  descriptionSkuProduct: string;
  modelSkuProduct: string;
  brandSkuProduct: any; // Cambia 'any' al tipo correcto si es conocido
  createdAt: string;
  updatedAt: string;
  provider: any; // Cambia 'any' al tipo correcto si es conocido
  skuDetail: SkuDetail;
  skuCertification: SkuCertification;
  state: string;
}
