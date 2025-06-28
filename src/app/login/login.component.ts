import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('Form Submitted!', this.loginData);

    } else {

      Object.keys(loginForm.controls).forEach(field => {
        const control = loginForm.controls[field];
        control.markAsTouched();
      });
    }
  }
}
