import { DataInt } from './../../interfaces/home.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  formData!: FormGroup;
  titleForm: string = 'Titulo Form';
  @Output() stateSection = new EventEmitter<boolean>();

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormNew();
  }

  createFormNew(): void {
    this.formData = this.fb.group({
      quant: ['999'],
      description: ['Tienda'],
      date: ['1990-12-21'],
    });
  }

  btnSave(form: DataInt): void {
    console.log('Funciono');
    console.log(form);
  }
  btnCancel(): void {
    this.stateSection.emit(false);
  }
}
