import { GeneralOutput, Payments } from 'src/app/Models/types';

export interface AllCustomersInputs {
  isLive: boolean;
  page: number;
  limit: number;
  email?: string;
}

export interface AllCustomersOutput extends GeneralOutput {
  data: {
    customersNumber: number;
    customers: Customers[];
  };
}

export interface Customers {
  address: string;
  clientReferenceId: string;
  createdAt: string;
  email: string;
  isLive: false;
  merchantId: string;
  name: string;
  payments: Payments[];
  phoneNumber: string;
  updatedAt: string;
}
