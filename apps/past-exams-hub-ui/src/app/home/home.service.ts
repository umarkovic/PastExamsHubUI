import { Injectable } from '@angular/core';
import { StatisticsService } from 'libs/portal/src/api/statistics.service';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable()
export class HomeService {
  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(private statisticsService: StatisticsService) {}

  fetchData() {
    return this.refresh$.pipe(
      switchMap(() => {
        return this.statisticsService.statisticsGet();
      })
    );
  }
}
