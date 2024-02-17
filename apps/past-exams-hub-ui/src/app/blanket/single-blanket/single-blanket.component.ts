import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { SingleBlanketService } from './single-blanket.service';
import { ExamsService } from 'libs/portal/src/api/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBaseComponent } from '../../shared/components/form-base.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'pastexamshub-single-blanket',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [SingleBlanketService, ExamsService],
  templateUrl: './single-blanket.component.html',
  styleUrl: './single-blanket.component.scss',
})
export class SingleBlanketComponent extends FormBaseComponent {
  pdfData!: any;
  data$ = this.route.paramMap.pipe(
    switchMap((x) => {
      const id = x.get('id');
      return this.singleBlanketService.fetchData(id as string).pipe(
        tap((x: any) => {
          this.pdfData = this.bypassAndSanitize(
            'data:application/pdf;base64,' + x?.file!
          );
          console.log(x);
          this.form = this.fb.group({
            note: [
              x.notes ?? '',
              [Validators.required, Validators.minLength(1)],
            ],
          });
        })
      );
    })
  );

  constructor(
    private route: ActivatedRoute,
    private singleBlanketService: SingleBlanketService,
    private sanitizer: DomSanitizer
  ) {
    super();
  }

  bypassAndSanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
