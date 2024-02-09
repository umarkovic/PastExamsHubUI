import { Injectable } from '@angular/core';
import { CoursesService } from '@org/portal/data-access';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable()
export class SubjectsService {
  private _paginationStream = new BehaviorSubject({
    pageIndex: 1,
    pageSize: 5,
  });
  paginationStream$ = this._paginationStream.asObservable();

  private _refresh = new BehaviorSubject<void>(undefined);
  refresh$ = this._refresh.asObservable();
  constructor(private coursesService: CoursesService) {}

  updatePagination(pageIndex: number, pageSize: number) {
    this._paginationStream.next({ pageIndex, pageSize });
  }

  fetchData(godinaStudija?: string) {
    return this.paginationStream$.pipe(
      switchMap(({ pageIndex, pageSize }) =>
        this.coursesService.coursesGet(
          godinaStudija ? Number(godinaStudija) : undefined,
          pageIndex + 1,
          pageSize
        )
      )
    );
  }
}
