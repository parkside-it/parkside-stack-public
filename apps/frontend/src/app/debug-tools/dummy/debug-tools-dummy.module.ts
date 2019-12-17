import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DebugToolsService } from '@psf/debug-tools/debug-tools.service';
import { DebugToolsDummyService } from '@psf/debug-tools/dummy/debug-tools-dummy.service';
import { DebugToolsDummyComponent } from './debug-tools-dummy.component';

@NgModule({
  declarations: [DebugToolsDummyComponent],
  imports: [CommonModule],
  exports: [DebugToolsDummyComponent],
  providers: [
    {
      provide: DebugToolsService,
      useClass: DebugToolsDummyService,
    },
  ],
})
export class DebugToolsDummyModule {}
