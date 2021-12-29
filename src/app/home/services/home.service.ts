import { environment } from './../../../environments/environment.prod';
import { DataInt, RespInt } from './../interfaces/home.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
  newData(data: DataInt, section: string): Observable<RespInt> {
    return this.httpClient.post<RespInt>(
      `${environment.URL_API}/${section}/new${section.toUpperCase()}`,
      data
    );
  }
  editData(data: DataInt, section: string): Observable<RespInt> {
    return this.httpClient.put<RespInt>(
      `${environment.URL_API}/${section}/edit${section.toUpperCase()}/${data._id}`,
      data
    );
  }
  deleteData(id: string, section: string): Observable<RespInt> {
    return this.httpClient.delete<RespInt>(
      `${environment.URL_API}/${section}/delete${section.toUpperCase()}/${id}`
    );
  }
}
