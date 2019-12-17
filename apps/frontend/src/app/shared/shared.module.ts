import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionButtonComponent } from './action-button/action-button.component';
import { IconComponent } from './icon/icon.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { MessageOutletComponent } from './message-outlet/message-outlet.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [MessageComponent, MessageOutletComponent, InfoCardComponent, ActionButtonComponent, IconComponent],
  imports: [CommonModule, RouterModule],
  exports: [MessageComponent, MessageOutletComponent, InfoCardComponent, ActionButtonComponent],
})
export class SharedModule {}
