import { environment } from './../../../environments/environment.prod';
import { DataInt, RespInt } from './../interfaces/home.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class HomeService {
  inData$ = new BehaviorSubject<DataInt[]>([]);
  inDataTotal$ = new BehaviorSubject<number>(0);

  outData$ = new BehaviorSubject<DataInt[]>([]);
  outDataTotal$ = new BehaviorSubject<number>(0);

  otherData$ = new BehaviorSubject<DataInt[]>([]);
  otherDataTotal$ = new BehaviorSubject<number>(0);

  totalData: number = 0;
  constructor(private httpClient: HttpClient) {
    this.refreshData();
  }

  refreshData(): void {
    this.totalData = 0;
    this.getIn();
    this.getOut();
    this.getOther();
  }
  get fillIn(): Observable<DataInt[]> {
    return this.inData$.asObservable();
  }
  get fillOut(): Observable<DataInt[]> {
    return this.outData$.asObservable();
  }
  get fillOther(): Observable<DataInt[]> {
    return this.otherData$.asObservable();
  }
  private getIn(): void {
    this.getData('in').subscribe({
      next: (data: DataInt[]) => {
        this.inData$.next(data);
        this.inDataTotal$.next(this.getTotal(data));
        this.totalData += this.getTotal(data);
      },
      error: (error) =>
        this.handlerAlert('Fallo comunicación con servidor.', 'error'),
    });
  }
  private getOut(): void {
    this.getData('out').subscribe({
      next: (data: DataInt[]) => {
        this.outData$.next(data);
        this.outDataTotal$.next(this.getTotal(data));
        this.totalData -= this.getTotal(data);
      },
      error: (error) =>
        this.handlerAlert('Fallo comunicación con servidor.', 'error'),
    });
  }
  private getOther(): void {
    this.getData('other').subscribe({
      next: (data: DataInt[]) => {
        this.otherData$.next(data);
        this.otherDataTotal$.next(this.getTotal(data));
        this.totalData -= this.getTotal(data);
      },
      error: (error) =>
        this.handlerAlert('Fallo comunicación con servidor.', 'error'),
    });
  }
  private getData(section: string): Observable<DataInt[]> {
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
      `${environment.URL_API}/${section}/edit${section.toUpperCase()}/${
        data._id
      }`,
      data
    );
  }
  deleteData(id: string, section: string): Observable<RespInt> {
    return this.httpClient.delete<RespInt>(
      `${environment.URL_API}/${section}/delete${section.toUpperCase()}/${id}`
    );
  }

  /* 
  !asd
  */
  private handlerAlert(text: string, iconName: SweetAlertIcon): void {
    Swal.fire({
      position: 'bottom-start',
      icon: iconName,
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  private getTotal(data: DataInt[]): number {
    return data.reduce((acc, el) => (acc += el.quant), 0);
  }
}
