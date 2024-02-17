import { Injectable } from '@angular/core';
import {
  CoursesService,
  PastExamsHubCoreDomainEnumsCourseType,
  TeachersService,
} from '@org/portal/data-access';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
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

  constructor(
    private coursesService: CoursesService,
    private teachersService: TeachersService
  ) {}

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

  fetchProfessorsData() {
    return this.teachersService.teachersGet().pipe(map((x) => x.teachers));
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

  addSubjects(data: {
    name: string;
    type: string;
    professorUid: string;
    year: number;
    semester: number;
    points: number;
    uid?: string;
  }) {
    this.coursesService
      .coursesPost({
        lecturerUid: data.professorUid,
        name: data.name,
        courseType: data.type as PastExamsHubCoreDomainEnumsCourseType,
        studyYear: data.year,
        semester: data.semester,
        espb: data.points,
      })
      .pipe(
        tap(() => {
          this.refreshData();
        })
      )
      .subscribe();
  }

  editSubjects(data: {
    name: string;
    type: string;
    professorUid: string;
    year: number;
    semester: number;
    points: number;
    uid?: string;
  }) {
    this.coursesService
      .coursesUidPut(data.uid as string, {
        lecturerUid: data.professorUid,
        name: data.name,
        courseType: data.type as PastExamsHubCoreDomainEnumsCourseType,
        studyYear: data.year,
        semester: data.semester,
        espb: data.points,
      })
      .pipe(
        tap(() => {
          this.refreshData();
        })
      )
      .subscribe();
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
