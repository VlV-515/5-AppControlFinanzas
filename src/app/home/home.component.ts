import { DataInt } from './interfaces/home.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  entradaDataMock: DataInt[] = [
    {
      quant: 537,
      description: 'Entrada importante 11',
      date: '1990-01-21',
    },
    {
      quant: 973,
      description: 'Entrada importante 22',
      date: '1990-02-22',
    },
  ];
  salidaDataMock: DataInt[] = [
    {
      quant: 537,
      description: 'Salida importante 11',
      date: '1990-01-21',
    },
    {
      quant: 973,
      description: 'Salida importante 22',
      date: '1990-02-22',
    },
  ];
  externoDataMock: DataInt[] = [
    {
      quant: 537,
      description: 'Externo importante 11',
      date: '1990-01-21',
    },
    {
      quant: 973,
      description: 'Externo importante 22',
      date: '1990-02-22',
    },
  ];
  /* ============================== */
  /* ============================== */
  /* ============================== */
  inData!: DataInt[];
  outData!: DataInt[];
  otherData!: DataInt[];

  /* [[1->Entrada]]-[[2->Salida]]-[[3->Externo]] */
  stateTable: number = 1;
  titleTable!: string;
  dataTable!: DataInt[];
  stateForm: boolean = false;
  todayDate: Date = new Date();
  formatDate: string = 'EEEE, d MMMM Y - hh:mm a';
  constructor() {}

  ngOnInit(): void {
    this.getFillDataIn();
  }
  /* 

  *
  *
  *
  *
  *

  */
  getFillDataIn(): void {
    /* TODO: Service */
    this.dataTable = this.entradaDataMock;
    this.titleTable = 'Entrada';
  }
  getFillDataOut(): void {
    /* TODO: Service */
    this.dataTable = this.salidaDataMock;
    this.titleTable = 'Salida';
  }
  getFillDataOther(): void {
    /* TODO: Service */
    this.dataTable = this.externoDataMock;
    this.titleTable = 'Externo';
  }
  /* 

  *
  *
  *
  *
  *

  */
  /* Cambia el state del form, cuando lo recibe del evento */
  changeFormState(state: boolean): void {
    this.stateForm = state;
  }
  /* Recibe que tablaa debe mostrar y ajusta los datos */
  /* [[1->Entrada]]-[[2->Salida]]-[[3->Externo]] */
  changeTableSection(selection: number): void {
    this.stateTable = selection;
    this.changeTableData(selection);
  }
  /* Recibe que data seleccionar */
  changeTableData(section: number): void {
    if (section == 1) this.getFillDataIn();
    if (section == 2) this.getFillDataOut();
    if (section == 3) this.getFillDataOther();
  }
}
