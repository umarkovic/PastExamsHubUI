import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'pastexamshub-home',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);

  readonly studyYears = [
    {
      year: 1,
      name: 'I',
    },
    {
      year: 2,
      name: 'II',
    },
    {
      year: 3,
      name: 'III',
    },
    {
      year: 4,
      name: 'IV',
    },
  ];

  navigateToStudyYearCourses(studyYear: number) {
    this.router.navigate(['/predmeti'], {
      queryParams: { godinaStudija: studyYear },
    });
  }
}
