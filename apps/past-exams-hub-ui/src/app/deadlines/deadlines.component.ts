import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ExamPeriodsService } from '@org/portal/data-access';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeadlinesService } from './deadlines.service';
import { MatButtonModule } from '@angular/material/button';



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
    MatButtonModule
  ],
  providers: [DeadlinesService, ExamPeriodsService],
  templateUrl: './deadlines.component.html',
  styleUrl: './deadlines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlinesComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    private route: ActivatedRoute,
    private deadlinesService: DeadlinesService
  ) {}

  updatePagination(pageIndex: number, pageSize: number) {
    this.deadlinesService.updatePageSettings(pageIndex + 1, pageSize);
  }

  
}
