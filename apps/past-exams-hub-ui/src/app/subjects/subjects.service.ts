import { Injectable } from '@angular/core';
import { CoursesService } from '@org/portal/data-access';
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
export class SubjectsService {
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
  dataStateChanged$ = this._dataStateChanged.asObservable().pipe(
    distinctUntilChanged((prev, curr) => {
      return prev.skip === curr.skip && prev.take === curr.take;
    })
  );

  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();

  constructor(private coursesService: CoursesService) {}

  set dataStateChanged(dataStateChanged: {
    pageIndex: number;
    pageSize: number;
  }) {
    this._dataStateChanged.next({
      skip: dataStateChanged.pageIndex * dataStateChanged.pageSize,
      take: dataStateChanged.pageSize,
    });
  }

  fetchSubjects(godinaStudija: string, pageNumber: number, pageSize: number) {
    return this.coursesService
      .coursesGet(Number(godinaStudija), pageNumber, pageSize)
      .pipe(
        map((res) => ({
          data: { result: res.courses, count: res.totalCount },
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

  fetchData(godinaStudija: string = '') {
    return combineLatest([this.refresh$, this.dataStateChanged$]).pipe(
      switchMap(([, dataStateChanges]) => {
        return this.fetchSubjects(
          godinaStudija,
          (dataStateChanges.skip as number) /
            (dataStateChanges.take as number) +
            1,
          dataStateChanges.take as number
        );
      })
    );
  }

  refreshData() {
    this._refresh.next(undefined);
  }

  addSubjects(data: any) {
    console.log(data);
  }

  editSubjects(data: any) {
    console.log(data);
  }

  removeSubject(uid: string) {
    this.coursesService
      .coursesUidDelete(uid, {})
      .pipe(
        tap(() => {
          this.refreshData();
        })
      )
      .subscribe();
  }
}
