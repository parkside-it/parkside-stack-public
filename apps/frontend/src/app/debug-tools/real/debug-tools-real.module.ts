import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@psf-shared';
import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';
import { DebugToolsRealService } from '@psf/debug-tools/real/debug-tools-real.service';
import { DebugToolsRealComponent } from './debug-tools-real.component';

@NgModule({
  declarations: [DebugToolsRealComponent],
  imports: [CommonModule, SharedModule],
  exports: [DebugToolsRealComponent],
  providers: [
    {
      provide: DebugToolsService,
      useClass: DebugToolsRealService,
    },
  ],
})
export class DebugToolsRealModule {}
