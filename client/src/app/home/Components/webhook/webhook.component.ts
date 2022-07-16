import { Webhook } from './../../../Services/webhook/webhook.model';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/Services/user.service';
import { WebhookService } from './../../../Services/webhook/webhook.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css'],
  providers: [MessageService],
})
export class WebhookComponent implements OnInit {
  public webhook!: Webhook;
  public loading = false;
  constructor(
    private webhookService: WebhookService,
    private errorService: HandelErrorService,
    private messageService: MessageService
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
        console.log(this.webhook);
      },
      (error) => {
        this.loading = false;
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
