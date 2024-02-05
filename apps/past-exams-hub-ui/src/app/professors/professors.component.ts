import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pastexamshub-professors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessorsComponent {}
