import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isTest = false;

  constructor() {}

  ngOnInit(): void {}

  handleChange(event: any) {
    if (event) {
      this.isTest = event.checked;
    }
  }
}
