import { DataInt } from './interfaces/home.interface';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  inData!: DataInt[];
  outData!: DataInt[];
  otherData!: DataInt[];

  inTotal: number = 0;
  outTotal: number = 0;
  otherTotal: number = 0;
  resumeTotal: number = 0;

  /* [[1->Entrada]]-[[2->Salida]]-[[3->Externo]] */
  sectionTable: number = 2;
  titleTable!: string;
  dataTable!: DataInt[];
  /*[[true -> ViewForm]]*/
  dataForm?: DataInt;
  stateForm: boolean = false;

  todayDate: Date = new Date();
  formatDate: string = 'EEEE, d MMMM Y - hh:mm a';
  constructor() {
    //Llena los array
    this.fillData();
    //Calcula los totales
    this.calculateResumeTotal();
    //Selecciona la tabla 'Salida' como default para mostrar
    this.selectDataOut();
  }
  /*
    !Llenado de arrays
  */
  private fillData(): void {
    this.fillInData();
    this.fillOutData();
    this.fillOtherData();
  }
  private fillInData(): void {
    // Obtebemos la respuesta del service
    this.inData = environment.entradaDataMock;
  }
  private fillOutData(): void {
    // Obtebemos la respuesta del service
    this.outData = environment.salidaDataMock;
  }
  private fillOtherData(): void {
    // Obtebemos la respuesta del service
    this.otherData = environment.externoDataMock;
  }
  /*
    !Seleccionado de data
  */
  private selectDataIn(): void {
    this.dataTable = this.inData;
    this.titleTable = 'Entrada';
  }
  private selectDataOut(): void {
    this.dataTable = this.outData;
    this.titleTable = 'Salida';
  }
  private selectDataOther(): void {
    this.dataTable = this.otherData;
    this.titleTable = 'Externo';
  }
  /* 
    !Controles de Resumen
  */
  //Retorna el valor total del array que le asignen
  private calculateTotal(arr: DataInt[]): number {
    return arr.reduce((acc, el: DataInt) => (acc += el.quant), 0);
  }
  //Calcula los valores totales
  private calculateResumeTotal(): void {
    this.inTotal = this.calculateTotal(this.inData);
    this.outTotal = this.calculateTotal(this.outData);
    this.otherTotal = this.calculateTotal(this.otherData);
    this.resumeTotal = this.inTotal - this.outTotal - this.otherTotal;
  }
  /*
    !Controles de tabla
  */
  //Recibe que data seleccionar
  private changeDataInTable(section: number): void {
    if (section == 1) this.selectDataIn();
    if (section == 2) this.selectDataOut();
    if (section == 3) this.selectDataOther();
  }
  //Recibe la data del btn edit y la manda al form.
  editDataTable(data: DataInt): void {
    this.dataForm = data;
    this.stateForm = true;
  }
  /*
    !Controles de form
  */
  //Cambia el state del form, cuando lo recibe del evento
  changeFormState(state: boolean): void {
    this.stateForm = state;
    this.dataForm = undefined;
  }
  //Recibe que tabla debe mostrar y ajusta los datos
  //[[1->Entrada]]-[[2->Salida]]-[[3->Externo]]
  changeTableSection(selection: number): void {
    this.sectionTable = selection;
    this.changeDataInTable(selection);
  }
  //Recibe la data del form a guardar, revisa el estado y entonces selecciona el service
  saveDataForm(dataForm: DataInt): void {
    /* 
    TODO:Verifica si tiene ID es edit si no es uno new.
    */
   
  }
}
