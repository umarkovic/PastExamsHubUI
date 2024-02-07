import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBaseComponent } from '../shared/components/form-base.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'pastexamshub-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent extends FormBaseComponent {
  genders = [
    { value: 'male', viewValue: 'Muski' },
    { value: 'female', viewValue: 'Zenski' },
  ];

  constructor() {
    super();
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      index: ['', Validators.required],
      gender: ['', Validators.required],
      yearOfStudy: ['', Validators.required],
    });
  }

  submit() {
    console.log(
      '%cprofile.component.ts line:38 this.form',
      'color: #007acc;',
      this.form
    );
  }
}
