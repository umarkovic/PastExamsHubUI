import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'pastexamshub-blanket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blanket.component.html',
  styleUrl: './blanket.component.scss',
})
export class BlanketComponent {
  arrayTen = Array(10).fill(0);

  getArray(num: number) {
    return Array(num).fill(0);
  }
}
