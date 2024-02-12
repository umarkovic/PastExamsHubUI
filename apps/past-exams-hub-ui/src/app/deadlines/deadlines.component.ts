import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ExamPeriodsService } from '@org/portal/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeadlinesService } from './deadlines.service';
import { MatButtonModule } from '@angular/material/button';
import { TableScrollingViewportComponent } from '../shared/components/table-scrolling-viewport';
import { ListRange } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDeadlineDialogComponent } from './add-edit-deadlines-dialog/add-edit-deadlines-dialog.component';
import { DeleteConfirmationDialogComponent } from '../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'pastexamshub-deadlines',
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
  providers: [DeadlinesService, ExamPeriodsService],
  templateUrl: './deadlines.component.html',
  styleUrl: './deadlines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlinesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  items = [];
  itemsSlice = [];

  dataSource = new MatTableDataSource();
  data$ = this.route.queryParams.pipe(
    switchMap(() => {
      return this.deadlinesService.fetchData();
    })
  );

  displayedColumns: string[] = [
    'nameDeadlines',
    'start',
    'end',
    'duration',
    'action',
  ];
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private deadlinesService: DeadlinesService
  ) {}

  updatePagination(pageIndex: number, pageSize: number) {
    this.deadlinesService.dataStateChanged = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
  }

  updateSlice(range: ListRange) {
    this.itemsSlice = this.items.slice(range.start, range.end);
  }

  addEditDeadline(uid?: string) {
    const dialogRef = this.dialog.open(AddEditDeadlineDialogComponent, {
      width: '750px',
      data: { uid: uid },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.uid) {
          this.deadlinesService.editDeadline(result);
        } else {
          this.deadlinesService.addDeadline(result);
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
        this.deadlinesService.removeDeadline(uid);
      }
    });
  }
}
