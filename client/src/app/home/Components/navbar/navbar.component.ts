import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HandelErrorService } from 'src/app/Services/shared/handel-error.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService],
})
export class NavbarComponent implements OnInit {
  @Input() isTest!: boolean | undefined;
  @Input() isVerified!: boolean | undefined;

  constructor(
    private userService: UserService,
    public messageService: MessageService,
    private errorService: HandelErrorService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  handleChange(event: any) {
    if (event) {
      const status = event.checked ? 'test' : 'live';
      this.changeMode(status);
    }
  }

  changeMode(mode: string) {
    this.userService.changeMode({ mode }).subscribe(
      ({ data }) => {
        this.isTest = data.mode == 'test';
      },
      ({ error }) => {
        this.errorService.handleErrors(error, this.messageService);
      }
    );
  }
}
