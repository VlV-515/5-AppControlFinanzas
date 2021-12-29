import { HomeService } from './services/home.service';
import { DataInt, RespInt } from './interfaces/home.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
//!TODO:Fijate en los fill table cuando hagas algun cambio.
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
  titleTable: string = 'Selecciona una categoría';
  dataTable!: DataInt[];
  /*[[true -> ViewForm]]*/
  dataForm?: DataInt;
  stateForm: boolean = false;

  todayDate: Date = new Date();
  formatDate: string = 'EEEE, d MMMM Y - hh:mm a';
  constructor(private homeSvc: HomeService) {
    this.fillData();
  }
  ngOnInit(): void {}
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
    this.homeSvc.getAll('in').subscribe((data) => {
      this.inData = data;
      this.dataTable = data;
      this.inTotal = this.calculateTotal(data);
    });
  }
  private fillOutData(): void {
    // Obtebemos la respuesta del service
    this.homeSvc.getAll('out').subscribe((data) => {
      this.outData = data;
      this.dataTable = data;
      this.outTotal = this.calculateTotal(data);
    });
  }
  private fillOtherData(): void {
    // Obtebemos la respuesta del service
    this.homeSvc.getAll('other').subscribe((data) => {
      this.otherData = data;
      this.dataTable = data;
      this.otherTotal = this.calculateTotal(data);
    });
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
  calculateResumeTotal(n1: number, n2: number, n3: number): number {
    return n1 - n2 - n3;
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
  deleteDataTable(data: DataInt): void {
    if (data._id) {
      this.homeSvc
        .deleteData(data._id, this.getSectionName())
        .subscribe((res: RespInt) => {
          if (res.msg == 'error') return console.log('Error eliminando');
          return console.log('Eliminado con exito');
        });
    }
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
    //*Verifica si tiene ID es edit si no es uno new.
    if (dataForm._id) {
      console.log('Es un edit');
      this.saveEditData(dataForm);
    } else {
      console.log('Es uno nuevo');
      this.saveNewData(dataForm);
    }
  }
  /* 
    !Funciones 
  */
  private getSectionName(): string {
    if (this.sectionTable == 1) return 'in';
    if (this.sectionTable == 2) return 'out';
    if (this.sectionTable == 3) return 'other';
    return '';
  }

  private saveNewData(data: DataInt): void {
    console.log(this.sectionTable);
    this.homeSvc
      .newData(data, this.getSectionName())
      .subscribe((res: RespInt) => {
        if (res.msg == 'error') {
          return console.log('Error agregando uno nuevo');
        }
        this.fillOutData()
        return console.log('Agregado con exito');
      });
  }

  private saveEditData(data: DataInt): void {
    this.homeSvc
      .editData(data, this.getSectionName())
      .subscribe((res: RespInt) => {
        if (res.msg == 'error') return console.log('Error editando');
        return console.log('Editado con exito');
      });
  }
}
