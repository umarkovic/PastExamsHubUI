import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pastexamshub-deadlines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deadlines.component.html',
  styleUrl: './deadlines.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeadlinesComponent {}
