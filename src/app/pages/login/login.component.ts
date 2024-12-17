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
    // Initialize the form group with controls for email and password
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

  // Getter to easily access the email form control
  get email() {
    return this.loginForm.get('email');
  }

  // Getter to easily access the password form control
  get password() {
    return this.loginForm.get('password');
  }

  // Method to handle form submission
  onSubmit() {
    this.isLoggedIn = true;
    if (this.loginForm.valid) {
      alert('Login successful!');
      // Navigate to the weather page after successful login
      this.router.navigate(['/weather']);
    }
  }

  // Custom validator to check the strength of the password
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

    // If the password doesn't meet the requirements, return an error object
    return { weakPassword: true }; // Validation failed
  }
}
