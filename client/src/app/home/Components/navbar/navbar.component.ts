import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() isTest!: boolean | undefined;
  @Input() isVerified!: boolean | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  handleChange(event: any) {
    if (event) {
      this.isTest = event.checked;
    }
  }
}
