import { DataInt } from './../../interfaces/home.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  date: Date = new Date();
  today: string =
    this.date.getFullYear() +
    '-' +
    (this.date.getMonth() + 1) +
    '-' +
    this.date.getDate();
  formData!: FormGroup;
  @Input() titleForm!: string;
  @Output() stateForm = new EventEmitter<boolean>();
  @Input() dataInputForm?: DataInt;
  @Output() dataOutputForm = new EventEmitter<DataInt>();

  constructor(public fb: FormBuilder) {
    this.createFormNew();
  }

  ngOnInit(): void {
    //Si dataInputForm esta vacia, es nueva, de lo contrario crea uno con la data
    if (this.dataInputForm != undefined)
      this.createFormEdit(this.dataInputForm);
  }

  createFormNew(): void {
    this.formData = this.fb.group({
      quant: [''],
      description: [''],
      date: [this.today],
    });
  }
  createFormEdit(data: DataInt): void {
    this.formData.setValue({
      quant: [data.quant],
      description: [data.description],
      date: [data.date],
    });
  }
  cleanForm(): void {
    this.formData.setValue({
      quant: [],
      description: [],
      date: [this.today],
    });
    this.dataInputForm = undefined;
  }
  btnSave(form: DataInt): void {
    //Emite la data a guardar
    let data;
    /* 
    TODO: Verifica si existe el id, de ser asi lo asigna y lo emite, si no, solo emite
    */
    {
      data = form;
      this.dataOutputForm.emit(data);
      this.stateForm.emit(false);
    }
    this.cleanForm();
  }
  btnCancel(): void {
    this.cleanForm();
    this.stateForm.emit(false);
  }
}
