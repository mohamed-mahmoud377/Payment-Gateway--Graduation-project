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
    customers: Customer[];
  };
}

export interface Customer {
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
export interface CustomerOutput extends GeneralOutput {
  data: {
    customer: Customer;
  };
}
