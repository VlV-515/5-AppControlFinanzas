import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TableComponent } from './components/table/table.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
