import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { ShellComponent } from './shell/shell.component';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule, ShellComponent],
  selector: 'pastexamshub-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'past-exams-hub-ui';
}
