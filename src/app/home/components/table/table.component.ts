import { DataInt } from './../../interfaces/home.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() titleTable!: string;
  @Input() dataTable!: DataInt[];
  @Output() stateSection = new EventEmitter<boolean>();
  @Output() dataEdit = new EventEmitter<DataInt>();

  constructor() {}

  ngOnInit(): void {}
  addBtn(): void {
    this.stateSection.emit(true);
  }
  editBtn(data: DataInt): void {
    this.dataEdit.emit(data);
  }
  deleteBtn(data: DataInt, index: number): void {
    /* 
      TODO: Service Delete y dependiendo hace splice
    */
    this.dataTable.splice(index, 1);
  }
}
