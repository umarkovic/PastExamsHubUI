import { Injectable } from '@angular/core';
import { ExamPeriodsService } from '@org/portal/data-access';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';


@Injectable()
export class DeadlinesService {
  private _pageSettings = new BehaviorSubject<{
    pageSizes: number[];
    pageSize: number;
    totalRecordsCount?: number;
    currentPage?: number;
  }>({
    pageSizes: [10, 20, 50],
    pageSize: 10,
  });
  pageSettings$ = this._pageSettings.asObservable();

  private _dataStateChanged = new BehaviorSubject<{
    skip: number;
    take: number;
  }>({
    skip: 0,
    take: 10,
  });
  dataStateChanged$ = this._dataStateChanged
    .asObservable()
    .pipe(
      distinctUntilChanged(
        (prev, curr) => prev.skip === curr.skip && prev.take === curr.take
      )
    );

  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(private examPeriodsService: ExamPeriodsService) {}

  fetchExamPeriods(
    pageSettings: { currentPage?: number; pageSize: number }
  ) {
    const currentPage = pageSettings.currentPage ?? 1;
    return this.examPeriodsService
      .examPeriodsGet(currentPage, pageSettings.pageSize)
      .pipe(
        map((res) => ({
          data: 
          { 
            result: res.periods, 
            count: res.totalCount 
          },
          currentPage: res.currentPage,
          totalPages: res.totalPages,
          pageSize: res.pageSize,
          hasNext: res.hasNext,
          hasPrevious: res.hasPrevious,
        })),
        tap((res) => {
          
          if (res.data && res.data.count! > 0) {
            this._pageSettings.next({
              ...this._pageSettings.getValue(),
              totalRecordsCount: res.data.count,
              pageSize: res.pageSize as number,
              currentPage: res.currentPage,
            });
          }
        })
      );
  }

  fetchData() {
    let lastFetched: {
      currentPage?: number;
      pageSize?: number;
      skip?: number;
      take?: number;
    } = {};

    return combineLatest([
      this.dataStateChanged$,
      this.pageSettings$,
      this.refresh$,
    ]).pipe(
      map(([dataState, pageSettings]) => ({ ...dataState, ...pageSettings })),
      distinctUntilChanged(
        (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
      ),
      switchMap((state) => {
        const shouldFetch =
          state.currentPage !== lastFetched.currentPage ||
          state.pageSize !== lastFetched.pageSize ||
          state.skip !== lastFetched.skip ||
          state.take !== lastFetched.take;

        if (shouldFetch) {
          lastFetched = { ...state };
          return this.fetchExamPeriods({
            currentPage: state.currentPage,
            pageSize: state.pageSize,
          });
        } else {
          return of();
        }
      })
    );
  }

  updatePageSettings(currentPage: number, pageSize?: number) {
    this._pageSettings.next({
      ...this._pageSettings.getValue(),
      currentPage,
      pageSize: pageSize ?? this._pageSettings.getValue().pageSize,
    });
  }

  refreshData() {
    this._refresh.next(undefined);
  }
}
