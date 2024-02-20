import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import {
  PastExamsHubCoreApplicationCommonUsersModelsUserModel,
  UsersService,
} from '@org/portal/data-access';
import { MatInputModule } from '@angular/material/input';
import { StudentsService } from './students.service';
import { TableScrollingViewportComponent } from '../shared/components/table-scrolling-viewport';
import { ListRange } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStudentDialogComponent } from './add-edit-student-dialog/add-edit-student-dialog.component';
import { CurrentUserService } from '../shared/services/current-user.service';

@Component({
  selector: 'pastexamshub-students',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    TableScrollingViewportComponent,
  ],
  providers: [StudentsService, UsersService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  items = [];
  itemsSlice = [];
  currentUser = this.currentUserService.currentUser;
  dataSource = new MatTableDataSource();
  data$ = this.route.queryParams.pipe(
    switchMap(() => {
      return this.studentsService.fetchData();
    })
  );

  displayedColumns: string[] = ['email', 'fullName', 'index', 'year', 'action'];

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService,
    private dialog: MatDialog,
    private currentUserService: CurrentUserService
  ) {}

  updatePagination(pageIndex: number, pageSize: number) {
    this.studentsService.dataStateChanged = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
  }

  updateSlice(range: ListRange) {
    this.itemsSlice = this.items.slice(range.start, range.end);
  }

  addEditStudent(
    data?: PastExamsHubCoreApplicationCommonUsersModelsUserModel,
    isVisibility?: boolean
  ) {
    const dialogRef = this.dialog.open(AddEditStudentDialogComponent, {
      width: '750px',
      data: { data: data, isVisibility: isVisibility },
    });
    dialogRef
      .afterClosed()
      .subscribe(
        (result: {
          email: string;
          firstName: string;
          lastName: string;
          index: number;
          studyYear: number;
          gender: string;
          uid?: string;
        }) => {
          if (result) {
            if (result.uid) {
              this.studentsService.editStudent(result);
            } else {
              this.studentsService.addStudent(result);
            }
          }
        }
      );
  }
}
