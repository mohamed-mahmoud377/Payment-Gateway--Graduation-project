import { UserService } from 'src/app/Services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public sessions = [];
  public twoFactorLoading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  enableFactorAuth() {
    this.twoFactorLoading = true;
    this.userService.enableTwoFactorAuth().subscribe(
      (res) => {
        this.twoFactorLoading = false;
        console.log(res);
      },
      (error) => {
        this.twoFactorLoading = false;

        console.log(error);
      }
    );
  }
}
