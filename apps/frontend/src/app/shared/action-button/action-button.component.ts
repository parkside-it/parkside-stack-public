import { Component, Input } from '@angular/core';

@Component({
  selector: 'ps-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
})
export class ActionButtonComponent {
  @Input() disabled: boolean;
  @Input() loading: boolean;
  @Input() buttonRouterLink: string;
  @Input() loadingMessage: string;

  constructor() {}
}
