import { Webhook } from './../../../Services/webhook/webhook.model';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { MessageService } from 'primeng/api';
import { WebhookService } from './../../../Services/webhook/webhook.service';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css'],
  providers: [MessageService],
})
export class WebhookComponent implements OnInit {
  public webhook!: Webhook;
  public loading = false;
  public deleteLoading = false;
  public secretKey!: string;
  constructor(
    private webhookService: WebhookService,
    private errorService: HandelErrorService,
    private messageService: MessageService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.getWebhook();
  }

  getWebhook() {
    this.loading = true;
    this.webhookService.getWebhook().subscribe(
      ({ data }) => {
        this.loading = false;
        this.webhook = data.webhook;
        this.secretKey = this.webhook.secretKey;
        console.log(this.webhook);
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }

  copyKey(key: string) {
    this.clipboard.copy(key);
    this.messageService.add({
      severity: 'success',
      summary: 'Secret key is copied to clipboard successfully',
    });
  }
  deleteWebhook() {
    this.deleteLoading = true;
    this.webhookService.deleteWebhook().subscribe(
      ({ data }) => {
        this.deleteLoading = false;
        console.log(data);
      },
      (error) => {
        this.deleteLoading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
