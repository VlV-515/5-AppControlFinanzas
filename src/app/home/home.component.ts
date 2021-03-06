import { HomeService } from './services/home.service';
import { DataInt, RespInt } from './interfaces/home.interface';
import { Component } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
//!TODO:Fijate en los fill table cuando hagas algun cambio.
export class HomeComponent {
  /* [[1->Entrada]]-[[2->Salida]]-[[3->Externo]] */
  sectionTable: number = 2;
  titleTable: string = 'Salida';
  dataTable!: DataInt[];
  /*[[true -> ViewForm]]*/
  dataForm?: DataInt;
  stateForm: boolean = false;

  todayDate: Date = new Date();
  formatDate: string = 'EEEE, d MMMM Y - hh:mm a';

  constructor(public homeSvc: HomeService) {}
  /*
    !Seleccionado de data
  */

  selectDataInTable(section: number): void {
    if (section == 1) this.titleTable = 'Entrada';
    if (section == 2) this.titleTable = 'Salida';
    if (section == 3) this.titleTable = 'Externo';
    this.sectionTable = section;
  }
  /* 
    !Controles de tabla
  */
  //Recibe que data seleccionar

  //Recibe la data del btn edit y la manda al form.
  editDataTable(data: DataInt): void {
    this.dataForm = data;
    this.stateForm = true;
  }
  deleteDataTable(data: DataInt): void {
    if (data._id) {
      this.homeSvc.deleteData(data._id, this.getSectionName()).subscribe({
        next: (res: RespInt) => {
          if (res.msg == 'error')
            return this.handlerAlert('Error eliminando.', 'error');
          this.handlerAlert('Eliminado con exito.', 'success');
          this.homeSvc.refreshData();
        },
        error: (error: Error) =>
          this.handlerAlert('Fallo comunicación con servidor.', 'error'),
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

  //Recibe la data del form a guardar, revisa el estado y entonces selecciona el service
  saveDataForm(dataForm: DataInt): void {
    //*Verifica si tiene ID es edit si no es uno new.
    if (dataForm._id) {
      this.saveEditData(dataForm);
    } else {
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
    this.homeSvc.newData(data, this.getSectionName()).subscribe({
      next: (res: RespInt) => {
        if (res.msg == 'error')
          return this.handlerAlert('Error agregando.', 'error');
        this.handlerAlert('Agregado con exito.', 'success');
        this.homeSvc.refreshData();
      },
      error: (error: Error) =>
        this.handlerAlert('Fallo comunicación con servidor.', 'error'),
    });
  }

  private saveEditData(data: DataInt): void {
    this.homeSvc.editData(data, this.getSectionName()).subscribe({
      next: (res: RespInt) => {
        if (res.msg == 'error')
          return this.handlerAlert('Error editando.', 'error');
        this.handlerAlert('Editado con exito.', 'success');
        this.homeSvc.refreshData();
      },
      error: (error: Error) =>
        this.handlerAlert('Fallo comunicación con servidor.', 'error'),
    });
  }

  private handlerAlert(text: string, iconName: SweetAlertIcon): void {
    Swal.fire({
      position: 'bottom-start',
      icon: iconName,
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
