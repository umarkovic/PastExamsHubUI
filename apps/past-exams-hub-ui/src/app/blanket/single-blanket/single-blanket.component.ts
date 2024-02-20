import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, switchMap, tap } from 'rxjs';
import { SingleBlanketService } from './single-blanket.service';
import { ExamSolutionService, ExamsService } from 'libs/portal/src/api/api';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBaseComponent } from '../../shared/components/form-base.component';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PastExamsHubCoreApplicationExamsModelsExamModel } from 'libs/portal/src/model/models';
import { CurrentUserService } from '../../shared/services/current-user.service';

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
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [SingleBlanketService, ExamsService, ExamSolutionService],
  templateUrl: './single-blanket.component.html',
  styleUrl: './single-blanket.component.scss',
})
export class SingleBlanketComponent extends FormBaseComponent {
  currentUser = this.currentUserService.currentUser;
  fileData!: any;
  isPdfFile = false;
  data$ = this.route.paramMap.pipe(
    switchMap((x) => {
      const id = x.get('id');
      return combineLatest({
        examData: this.singleBlanketService.fetchDataExams(id as string),
        examSolution: this.singleBlanketService.fetchExamSolution(
          id as string,
          0,
          0
        ),
        userData: this.singleBlanketService.fetchData(id as string),
      }).pipe(
        tap(({ examData, examSolution }) => {
          this.fileData = `data:${
            (examData as PastExamsHubCoreApplicationExamsModelsExamModel)
              .contentType
          };base64,${
            (examData as PastExamsHubCoreApplicationExamsModelsExamModel).file
          }`;

          console.log(this.fileData);

          this.isPdfFile = examData?.fileType === 'Document' ? true : false;
          this.form = this.fb.group({
            note: [
              examData!.notes ?? '',
              [Validators.required, Validators.minLength(1)],
            ],
          });
        })
      );
    })
  );
  private router = inject(Router);

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'date',
    'owner',
    'file',
    'taskNumber',
    'rating',
    'action',
  ];
  constructor(
    private route: ActivatedRoute,
    private singleBlanketService: SingleBlanketService,
    private sanitizer: DomSanitizer,
    private currentUserService: CurrentUserService
  ) {
    super();
  }

  bypassAndSanitize(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  updatePagination(pageIndex: number, pageSize: number) {
    this.singleBlanketService.dataStateChanged = {
      pageIndex: pageIndex,
      pageSize: pageSize,
    };
  }

  addSolutions(uid: string | undefined) {
    this.router.navigate(['/dodaj_resenje', uid]);
  }

  minusRating(uid: string) {
    this.singleBlanketService.postGrade(uid, false);
  }

  plusRating(uid: string) {
    this.singleBlanketService.postGrade(uid, true);
  }
}
