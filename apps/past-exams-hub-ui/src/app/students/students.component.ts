import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { UsersService } from '@org/portal/data-access';
import { MatInputModule } from '@angular/material/input';
import { StudentsService } from './students.service';
import { TableScrollingViewportComponent } from '../shared/components/table-scrolling-viewport';
import { ListRange } from '@angular/cdk/collections';

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

  dataSource = new MatTableDataSource();
  data$ = this.route.queryParams.pipe(
    switchMap(() => {
      return this.studentsService.fetchData();
    })
  );

  displayedColumns: string[] = ['email', 'fullName', 'index', 'year', 'action'];

  constructor(
    private route: ActivatedRoute,
    private studentsService: StudentsService
  ) {}

  updatePagination(pageIndex: number, pageSize: number) {
    this.studentsService.updatePageSettings(pageIndex + 1, pageSize);
  }

  updateSlice(range: ListRange) {
    this.itemsSlice = this.items.slice(range.start, range.end);
  }
}
