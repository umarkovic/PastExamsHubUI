import { Injectable } from '@angular/core';
import {
  CoursesService,
  ExamPeriodsService,
  ExamsService,
  PastExamsHubCoreDomainEnumsExamType,
} from '@org/portal/data-access';
import { combineLatest, map } from 'rxjs';

@Injectable()
export class AddBlanketService {
  constructor(
    private examsService: ExamsService,
    private examPeriodsService: ExamPeriodsService,
    private coursesService: CoursesService
  ) {}

  addBlanket(
    data: {
      deadline: string;
      subject: string;
      type: PastExamsHubCoreDomainEnumsExamType;
      numberTask: number;
      date: Date;
      fileSource: Blob;
      note: string;
    },
    onSuccess: () => void,
    onError: (error: string[]) => void
  ) {
    this.examsService
      .examsUploadPostForm(
        data.fileSource,
        data.subject,
        data.deadline,
        data.type,
        data.date,
        data.numberTask,
        data.note
      )
      .subscribe({
        next: () => onSuccess(),
        error: (error) => {
          onError(error.error.errors);
        },
      });
  }

  fetchData() {
    return combineLatest([
      this.examPeriodsService.examPeriodsGet(),
      this.coursesService.coursesGet(),
    ]).pipe(
      map(([examPeriods, courses]) => {
        return { examPeriods: examPeriods.periods, courses: courses.courses };
      })
    );
  }
}
