interface Agency {
  id: number | string;
  name: string;
}

interface DocumentType {
  id: number | string;
  name: string;
  descrip: string | null;
}

interface SkuCertificationDocument {
  id: number | string;
  sku: string;
  sku_certification: number | string;
  document_name: string;
  document_type: number | string;
  comment: string;
  id_file: string;
  created_at: string;
  skuCertification: number | string;
  documentName: string;
  idFile: string;
  documentType: DocumentType;
}

export interface CertificationData {
  id: number | string;
  sku: string;
  id_agency: Agency;
  energyEfficiencyExpire: string;
  certAveragePeriod: number | string;
  certNumber: string;
  certModel: string;
  idProtocol: { id: string; name: string };
  idQr: string;
  typeCertificationsId: number | string;
  skuCertificationDocuments: SkuCertificationDocument[];
}
