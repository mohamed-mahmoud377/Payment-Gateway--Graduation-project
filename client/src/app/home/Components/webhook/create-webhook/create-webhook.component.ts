import { Webhook } from './../../../../Services/webhook/webhook.model';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handle-errors.service';
import { WebhookService } from './../../../../Services/webhook/webhook.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-webhook',
  templateUrl: './create-webhook.component.html',
  styleUrls: ['./create-webhook.component.css'],
  providers: [MessageService],
})
export class CreateWebhookComponent implements OnInit {
  public loading = false;
  public url: string | null = null;
  public description!: string | null;
  @Output() onCreateWebhook = new EventEmitter<Webhook>();

  constructor(
    private webhookService: WebhookService,
    private errorService: HandelErrorService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  createWebhook() {
    this.loading = true;
    if (this.url) {
      let inputs: any = { url: this.url };
      if (this.description) {
        inputs.description = this.description;
      }
      this.webhookService.createWebhook(inputs).subscribe(
        (res) => {
          this.loading = false;
          this.onCreateWebhook.emit(res.data.webhook);
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
