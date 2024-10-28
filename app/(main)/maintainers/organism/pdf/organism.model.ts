export interface Organization {
    idOrganism: string;
    organismName: string;
    contact: string;
    rut: string;
    email: string;
    image: string;
    phone: string;
    address: string;
    ejecutiveName: string;
    ejecutivePhone: string;
    ejecutiveEmail: string;
}

export interface Vehicle {
    id: string;
    patent: string;
    model: string;
    brand: string;
    color: string;
    agencyId: string;
    states: {
        id: number;
        description: string;
    };
}

export interface Inspector {
    id: number;
    name: string;
    documentNumber: string;
    phoneNumber: string;
    email: string;
    agencyId: number;
    states: {
        id: number;
        description: string;
    };
}