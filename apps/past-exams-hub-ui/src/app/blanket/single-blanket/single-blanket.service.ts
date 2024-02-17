import { Injectable } from '@angular/core';
import { ExamsService } from 'libs/portal/src/api/api';
import { map } from 'rxjs';

@Injectable()
export class SingleBlanketService {
  constructor(private examsService: ExamsService) {}

  fetchData(id: string) {
    return this.examsService.examsUidGet(id).pipe(map((x) => x.exam));
  }
}
