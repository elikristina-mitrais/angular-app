import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Input() isShow: boolean | undefined;

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: LoginService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hidePopup() {
    this.cancel.emit();
  }

  onSubmit() {
    const data = this.loginForm.getRawValue();
    this.service.login(data.username, data.password).subscribe({
      next: res => {
        localStorage.setItem('token', res);
        this.cancel.emit();
      },
      error: (err) => {
        console.error('error:', err);
      }
    });
  }
}
