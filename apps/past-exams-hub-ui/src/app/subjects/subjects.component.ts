import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pastexamshub-subjects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent {}
