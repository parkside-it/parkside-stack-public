import { Component } from '@angular/core';

@Component({
  selector: 'ps-root',
  template: `
    <ps-navbar></ps-navbar>
    <ps-message-outlet></ps-message-outlet>
    <router-outlet></router-outlet>
    <ps-debug-tools></ps-debug-tools>
  `,
})
export class AppComponent {
  constructor() {}
}
