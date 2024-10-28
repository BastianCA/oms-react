import env from "../next.config"
export abstract class Constants {
  static readonly API_URL: string = `${env?.BASE_URL}`;
  static readonly API_URL_IMAGE: string = `${env?.BASE_URL_IMAGE}`;
  static readonly API_URL_REPORTS: string = `${env?.BASE_URL_REPORTS}`;
  static readonly API_URL_REPORTS_XLSX: string = `${env?.BASE_URL_REPORTS_XLSX}`;
}
