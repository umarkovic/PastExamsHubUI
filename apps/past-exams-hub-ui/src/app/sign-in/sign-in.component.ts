import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBaseComponent } from '../shared/components/form-base.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'pastexamshub-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,HeaderComponent ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent extends FormBaseComponent {

  override form = this.fb.group({
    email: this.fb.nonNullable.control<string | undefined>('', [Validators.required]),
    password: this.fb.nonNullable.control<string | undefined>('', [Validators.required])
  })

  isPasswordVisible = false;

  submit() {
    if (this.checkFormValidity()) return;

    const formData = this.form.getRawValue();

    console.log(formData);
  }
}
