export interface Permisos {
  moduleId: number;
  name: string;
  permission: {
    optionId: number;
    name: string;
    moduleId: number;
    permission?: {
      permissionId: number;
      name: string;
      checked?: boolean;
    }[];
  }[];
}
