import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { WebhookService } from './../../../../Services/webhook/webhook.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css'],
  providers: [MessageService],
})
export class CreateWebhookComponent implements OnInit {
  public loading = false;
  public url: string | null = null;

  constructor(
    private webhookService: WebhookService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  createWebhook() {
    this.loading = true;
    if (this.url) {
      this.webhookService.createWebhook(this.url).subscribe(
        (res) => {
          this.loading = false;
          console.log(res);
        },
        (error) => {
          this.loading = false;
          this.errorService.handleErrors(error, this.messageService);
        }
      );
    }
  }
}
