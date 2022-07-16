import { GeneralOutput } from 'src/app/Models/types';

export interface WebhookOutput extends GeneralOutput {
  data: {
    webhook: Webhook;
  };
}

export interface Webhook {
  createdAt: string;
  event: string;
  merchantId: string;
  secretKey: string;
  status: string;
  updatedAt: string;
  url: string;
  _id: string;
  description: string;
}
