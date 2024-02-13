import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { combineLatest, forkJoin, switchMap, tap } from 'rxjs';
import {
  CoursesService,
  PastExamsHubCoreApplicationTeachersModelsTeacherListModel,
  TeachersService,
} from '@org/portal/data-access';
import { MatButtonModule } from '@angular/material/button';
import { TableScrollingViewportComponent } from '../shared/components/table-scrolling-viewport';
import { ListRange } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddEditSubjectsDialogComponent } from './add-edit-subjects-dialog/add-edit-subjects-dialog.component';
import { DeleteConfirmationDialogComponent } from '../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'pastexamshub-subjects',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TableScrollingViewportComponent,
  ],
  providers: [SubjectsService, CoursesService, TeachersService],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  items = [];
  itemsSlice = [];

  dataSource = new MatTableDataSource();
  data$ = this.route.queryParams.pipe(
    switchMap((params) => {
      const godinaStudija = params['godinaStudija'];
      return combineLatest({
        professorsData: this.subjectsService.fetchProfessorsData(),
        subjectData: this.subjectsService.fetchData(godinaStudija),
      });
    })
  );

  displayedColumns: string[] = [
    'nameSubject',
    'type',
    'professors',
    'studies',
    'year',
    'espb',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {}

  updatePagination(pageIndex: number, pageSize: number) {
    this.subjectsService.dataStateChanged = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
  }

  updateSlice(range: ListRange) {
    this.itemsSlice = this.items.slice(range.start, range.end);
  }

  addEditSubject(
    proffesorsData: PastExamsHubCoreApplicationTeachersModelsTeacherListModel[],
    dataSubject?: any
  ) {
    console.log(proffesorsData);
    const dialogRef = this.dialog.open(AddEditSubjectsDialogComponent, {
      width: '750px',
      data: { dataSubject: dataSubject, proffesorsData: proffesorsData },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        if (result.uid) {
          this.subjectsService.editSubjects(result);
        } else {
          this.subjectsService.addSubjects(result);
        }
      }
    });
  }

  remove(uid: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '450px',
      data: 'Da li ste sigurni da zelite da obrisete?',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subjectsService.removeSubject(uid);
      }
    });
  }
}
