import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isTest = false;
  @Input() isVerified!: boolean | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    console.log(this.isVerified);
  }

  handleChange(event: any) {
    if (event) {
      this.isTest = event.checked;
    }
  }
}
