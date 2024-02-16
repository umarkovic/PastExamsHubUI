import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormBaseComponent } from '../shared/components/form-base.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BlanketService } from './blanket.service';
import {
  CoursesService,
  ExamPeriodsService,
  ExamsService,
} from 'libs/portal/src/api/api';

export type PastExamsHubCoreDomainEnumsExamType =
  | 'Unkwnon'
  | 'Pismeni'
  | 'Usmeni'
  | 'PismenoUsmeni';
export const PastExamsHubCoreDomainEnumsExamType = {
  Unkwnon: 'Unkwnon' as PastExamsHubCoreDomainEnumsExamType,
  Pismeni: 'Pismeni' as PastExamsHubCoreDomainEnumsExamType,
  Usmeni: 'Usmeni' as PastExamsHubCoreDomainEnumsExamType,
  PismenoUsmeni: 'PismenoUsmeni' as PastExamsHubCoreDomainEnumsExamType,
};

@Component({
  selector: 'pastexamshub-blanket',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    BlanketService,
    ExamsService,
    ExamPeriodsService,
    CoursesService,
  ],
  templateUrl: './blanket.component.html',
  styleUrl: './blanket.component.scss',
})
export class BlanketComponent extends FormBaseComponent implements OnInit {
  data$ = this.blanketService.fetchData();
  examTypes: { label: string; value: PastExamsHubCoreDomainEnumsExamType }[] =
    [];
  message = '';
  constructor(private blanketService: BlanketService) {
    super();
    this.initializeForm();
  }

  private initializeForm() {
    this.form = this.fb.group({
      deadline: ['', Validators.required],
      subject: ['', Validators.required],
      type: [''],
      numberTask: [1],
      date: ['', Validators.required],
      fileSource: ['', Validators.required],
      note: [''],
    });
  }

  override ngOnInit() {
    this.examTypes = Object.entries(PastExamsHubCoreDomainEnumsExamType)
      .filter(([_, value]) => value !== 'Unkwnon')
      .map(([_, value]) => ({
        label: value,
        value: value as PastExamsHubCoreDomainEnumsExamType,
      }));
  }

  transformLabel(label: string): string {
    return label
      .split('')
      .map((char, index) => {
        return char.toUpperCase() === char && index !== 0 ? ` ${char}` : char;
      })
      .join('');
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = files[0] as File;
    this.form.patchValue({
      fileSource: fileToUpload,
    });
  }

  save() {
    if (this.checkFormValidity()) return;

    this.blanketService.addBlanket(
      this.form.getRawValue(),
      () => {
        this.message = 'Blanket je uspesno dodat!';
      },
      (error) => {
        this.message = 'Blanket nije dodat:' + error.error.title;
      }
    );
  }
}
