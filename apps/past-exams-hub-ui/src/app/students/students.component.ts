import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pastexamshub-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent {}
