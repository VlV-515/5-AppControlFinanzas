import { environment } from './../../../environments/environment.prod';
import { DataInt } from './../interfaces/home.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  getAll(section: string): Observable<DataInt[]> {
    return this.httpClient
      .get<DataInt[]>(
        `${environment.URL_API}/${section}/get${section.toUpperCase()}`
      )
      .pipe(
        map((data: DataInt[]) =>
          data.map(({ _id, quant, description, date }: DataInt) => ({
            _id,
            quant,
            description,
            date,
          }))
        )
      );
  }
}
