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
  titleTable: string = 'Titulo de la tabla';
  dataTable!: DataInt[];
  constructor() {}

  ngOnInit(): void {
    this.fillInData();
  }

  fillInData(): void {
    /* TODO: Service */
    this.dataTable = this.entradaDataMock;
  }
}
