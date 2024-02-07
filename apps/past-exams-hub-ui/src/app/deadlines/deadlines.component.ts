import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './deadlines.component.html',
  styleUrl: './deadlines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlinesComponent {
  displayedColumns: string[] = [
    'nameDeadlines',
    'start',
    'end',
    'duration',
    'action',
  ];
  dataSource = new MatTableDataSource([]);
}
