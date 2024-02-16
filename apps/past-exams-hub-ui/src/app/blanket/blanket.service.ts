import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CoursesService,
  ExamPeriodsService,
  ExamsService,
} from '@org/portal/data-access';
import { combineLatest, map } from 'rxjs';

@Injectable()
export class BlanketService {
  constructor(
    private examsService: ExamsService,
    private examPeriodsService: ExamPeriodsService,
    private coursesService: CoursesService
  ) {}

  addBlanket(data: any, onSuccess: () => void, onError: (error: any) => void) {
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
          onError(error);
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
