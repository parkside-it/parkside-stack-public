import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  requestPasswordChange(forgotPasswordForm: NgForm): void {
    // todo after backend implementation
  }
}
