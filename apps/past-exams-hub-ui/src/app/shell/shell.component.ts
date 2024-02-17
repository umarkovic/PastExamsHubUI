import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  text: string;
  iconName: string;
  url: string;
}

@Component({
  selector: 'pastexamshub-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatRippleModule,
    AsyncPipe,
  ],
})
export class ShellComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  readonly menuItems: MenuItem[] = [
    {
      text: 'Pocetna',
      iconName: 'home',
      url: '/pocetna',
    },
    {
      text: 'Predmeti',
      iconName: 'description',
      url: '/predmeti',
    },
    {
      text: 'Rokovi',
      iconName: 'list_alt',
      url: '/rokovi',
    },
    {
      text: 'Studenti',
      iconName: 'group',
      url: '/studenti',
    },
    {
      text: 'Profesori',
      iconName: 'supervisor_account',
      url: '/profesori',
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  addBlanket() {
    this.router.navigate(['dodaj_blanket']);
  }

  profile() {
    this.router.navigate(['profil']);
  }

  logout() {
    console.log('logout');
  }
}
