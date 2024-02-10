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
  ],
  providers: [StudentsService, UsersService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
}
