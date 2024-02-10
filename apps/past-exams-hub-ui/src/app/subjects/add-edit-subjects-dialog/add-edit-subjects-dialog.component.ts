import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseComponent } from '../../shared/components/form-base.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

type Professor = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'pastexamshub-add-edit-subjects-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './add-edit-subjects-dialog.component.html',
  styleUrl: './add-edit-subjects-dialog.component.scss',
})
export class AddEditSubjectsDialogComponent extends FormBaseComponent {
  professors: Professor[] = [{ value: 'urke', viewValue: 'Uros' }];

  constructor(
    public dialogRef: MatDialogRef<AddEditSubjectsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      name: [
        this.data?.name ?? '',
        [Validators.required, Validators.minLength(1)],
      ],
      type: [this.data?.type ?? ''],
      professor: [this.data?.professor ?? ''],
      year: [this.data?.year ?? ''],
      semester: [this.data?.semester ?? ''],
      points: [this.data?.points ?? ''],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    if (!this.data?.uid) {
      this.dialogRef.close({
        name: this.form.controls['name'].getRawValue(),
        type: this.form.controls['type'].getRawValue(),
        professor: this.form.controls['professor'].getRawValue(),
        year: this.form.controls['year'].getRawValue(),
        semester: this.form.controls['semester'].getRawValue(),
        points: this.form.controls['points'].getRawValue(),
      });
    } else {
      this.dialogRef.close({
        name: this.form.controls['name'].getRawValue(),
        type: this.form.controls['type'].getRawValue(),
        professor: this.form.controls['professor'].getRawValue(),
        year: this.form.controls['year'].getRawValue(),
        semester: this.form.controls['semester'].getRawValue(),
        points: this.form.controls['points'].getRawValue(),
        uid: this.data?.uid,
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
