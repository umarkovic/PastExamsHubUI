import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { SubjectsService } from './subjects.service';
import { map, switchMap } from 'rxjs';
import { CoursesService } from '@org/portal/data-access';

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
  ],
  providers: [SubjectsService, CoursesService],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource();
  data$ = this.route.queryParams.pipe(
    switchMap((params) => {
      const godinaStudija = params['godinaStudija'];
      return this.subjectsService.fetchData(godinaStudija).pipe();
    })
  );

  pageSettings$ = this.subjectsService.paginationStream$;

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
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {}

  updatePagination(pageIndex: number, pageSize: number) {
    this.subjectsService.updatePagination(pageIndex, pageSize);
  }
}
