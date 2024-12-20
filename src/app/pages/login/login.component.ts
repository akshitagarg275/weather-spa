import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.passwordStrengthValidator,
        ],
      ],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.isLoggedIn = true;
    if (this.loginForm.valid) {
      this.router.navigate(['/weather']);
    }
  }

  passwordStrengthValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;

    // Check for at least one uppercase letter, one number, and one special character
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);

    if (hasUpperCase && hasNumber && hasSpecialChar) {
      return null; // Validation passed
    }

    return { weakPassword: true }; // Validation failed
  }
}
