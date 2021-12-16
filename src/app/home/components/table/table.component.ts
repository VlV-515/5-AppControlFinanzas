import { DataInt } from './../../interfaces/home.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() titleTable!: string;
  @Input() dataTable!: DataInt[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.dataTable);
  }
}
