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

  constructor() {}

  ngOnInit(): void {
    console.log(this.dataTable);
  }
  addBtn(): void {
    this.stateSection.emit(true);
  }
  editBtn(data: DataInt, index: number): void {
    console.log(data);
  }
  deleteBtn(data: DataInt, index: number): void {
    console.log(data);
    this.dataTable.splice(index, 1);
  }
}
