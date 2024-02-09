import { Injectable } from '@angular/core';
import { ExamsService, StatisticsService } from '@org/portal/data-access';
import { BehaviorSubject, combineLatest, map, switchMap } from 'rxjs';

@Injectable()
export class HomeService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(
    private statisticsService: StatisticsService,
    private examsService: ExamsService
  ) {}

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() =>
        combineLatest([
          this.statisticsService.statisticsGet(),
          this.examsService.examsLatestExamsGet(),
        ]).pipe(
          map(([statistics, latestExams]) => {
            return { statistics, latestExams };
          })
        )
      )
    );
  }
}
