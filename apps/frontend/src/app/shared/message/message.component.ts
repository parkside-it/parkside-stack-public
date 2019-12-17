import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Message, MessageType } from '@psf-core/model/message';

const AUTO_HIDE_INTERVAL = 5000;

@Component({
  selector: 'ps-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnChanges {
  @Input() message: Message;
  @Input() autoHide: boolean;
  @Output() closed: EventEmitter<boolean> = new EventEmitter();

  opened: boolean;
  types: typeof MessageType = MessageType;

  private timeout: ReturnType<typeof setTimeout>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('message')) {
      this.opened = true;
      this.handleAutoHide();
    }
  }

  private handleAutoHide(): void {
    clearTimeout(this.timeout);
    if (this.autoHide) {
      this.timeout = setTimeout(this.close.bind(this), AUTO_HIDE_INTERVAL);
    }
  }

  close(): void {
    this.opened = false;
    this.closed.emit(true);
  }

  getIcon(): string {
    switch (this.message.type) {
      case MessageType.error:
        return 'error';
      case MessageType.success:
        return 'check';
      default:
        return 'info';
    }
  }
}
