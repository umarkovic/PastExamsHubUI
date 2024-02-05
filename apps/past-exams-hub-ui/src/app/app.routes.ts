import { Route } from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/sign-in/sign-in.component').then((c) => c.SignInComponent),
  },
  {
    path: '',
    loadComponent: () => import('../app/shell/shell.component').then((c) => c.ShellComponent),
    children: [
      {
        path: 'pocetna',
        loadComponent: () =>
          import('../app/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'predmeti',
        loadComponent: () =>
          import('../app/subjects/subjects.component').then(
            (c) => c.SubjectsComponent
          ),
      },
      {
        path: 'rokovi',
        loadComponent: () =>
          import('../app/deadlines/deadlines.component').then(
            (c) => c.DeadlinesComponent
          ),
      },
      {
        path: 'studenti',
        loadComponent: () =>
          import('../app/students/students.component').then(
            (c) => c.StudentsComponent
          ),
      },
      {
        path: 'profesori',
        loadComponent: () =>
          import('../app/professors/professors.component').then(
            (c) => c.ProfessorsComponent
          ),
      },
    ],
  },

  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
  { path: '**', redirectTo: '/pocetna', pathMatch: 'full' },
];
