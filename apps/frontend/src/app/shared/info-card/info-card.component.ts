import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ps-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() buttonTitle: string;
  @Input() buttonRouterLink: string;
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleButtonClick(): void {
    this.buttonClicked.emit();
  }
}
