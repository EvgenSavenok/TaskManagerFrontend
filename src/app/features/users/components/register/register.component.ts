import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  roles = [
    { value: 1, label: 'Пользователь' },
    { value: 2, label: 'Администратор' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[0-9]{10,15}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: [1, Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const { password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Пароли не совпадают';
      return;
    }

    const userDto = { ...this.registerForm.value };
    delete userDto.confirmPassword;

    this.http.post('http://localhost:5271/users/register', userDto).subscribe({
      next: () => this.router.navigate(['/login'], { replaceUrl: true }),
      error: (err) => this.errorMessage = err.error.message || 'Ошибка регистрации'
    });
  }
}
