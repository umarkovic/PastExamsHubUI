import { ChangeDetectionStrategy, Component , ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TeachersService } from '@org/portal/data-access';
import { MatInputModule } from '@angular/material/input';
import { ProfessorsService } from './professors.service';
@Component({
  selector: 'pastexamshub-professors',
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
  providers: [ProfessorsService, TeachersService],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessorsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource();
  data$ = this.route.queryParams.pipe(
    switchMap(() => {
      return this.professorsService.fetchData();

    })
    
  );
  displayedColumns: string[] = ['email', 'fullName', 'subjects', 'action'];

  constructor(
    private route: ActivatedRoute,
    private professorsService: ProfessorsService
  ) {}
  updatePagination(pageIndex: number, pageSize: number) {
    this.professorsService.updatePageSettings(pageIndex + 1, pageSize);
  }
}
