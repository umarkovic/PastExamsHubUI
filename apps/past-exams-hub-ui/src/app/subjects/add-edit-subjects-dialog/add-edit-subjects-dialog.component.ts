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
import { PastExamsHubCoreApplicationTeachersModelsTeacherListModel } from 'libs/portal/src/model/pastExamsHubCoreApplicationTeachersModelsTeacherListModel';
import { PastExamsHubCoreDomainEnumsCourseType } from 'libs/portal/src/model/pastExamsHubCoreDomainEnumsCourseType';

type Professor = {
  value: string;
  viewValue: string;
};

interface CourseTypeOption {
  key: string;
  value: PastExamsHubCoreDomainEnumsCourseType;
}

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
  professorsData: PastExamsHubCoreApplicationTeachersModelsTeacherListModel[] =
    [];

  courseTypes: CourseTypeOption[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddEditSubjectsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
    this.initializeForm(data);
    this.professorsData = data.proffesorsData;
    this.courseTypes = Object.entries(PastExamsHubCoreDomainEnumsCourseType)
      .map(([key, value]) => ({
        key: key,
        value: value,
      }))
      .filter((courseType) => courseType.value !== 'Unknown');
  }

  private initializeForm(data: any) {
    this.form = this.fb.group({
      name: [
        data?.dataSubject ? data?.dataSubject.name : '',
        [Validators.required, Validators.minLength(1)],
      ],
      type: [data?.dataSubject ? data?.dataSubject.courseType : ''],
      professorUid: [data?.dataSubject ? data?.dataSubject.professor : ''],
      year: [data?.dataSubject ? data?.dataSubject.studyYear : 1],
      semester: [data?.dataSubject ? data?.dataSubject.semester : 1],
      points: [data?.dataSubject ? data?.dataSubject.espb : 60],
    });
  }

  saveChanges() {
    if (this.checkFormValidity()) return;
    if (this.data.dataSubject && this.data.dataSubject?.uid) {
      this.dialogRef.close({
        name: this.form.controls['name'].getRawValue(),
        type: this.form.controls['type'].getRawValue(),
        professorUid: this.form.controls['professorUid'].getRawValue(),
        year: this.form.controls['year'].getRawValue(),
        semester: this.form.controls['semester'].getRawValue(),
        points: this.form.controls['points'].getRawValue(),
        uid: this.data.dataSubject.uid,
      });
    } else {
      this.dialogRef.close({
        name: this.form.controls['name'].getRawValue(),
        type: this.form.controls['type'].getRawValue(),
        professorUid: this.form.controls['professorUid'].getRawValue(),
        year: this.form.controls['year'].getRawValue(),
        semester: this.form.controls['semester'].getRawValue(),
        points: this.form.controls['points'].getRawValue(),
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
