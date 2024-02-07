import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessorsComponent {
  displayedColumns: string[] = ['email', 'fullName', 'subjects', 'action'];
  dataSource = new MatTableDataSource([]);
}
