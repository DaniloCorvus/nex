import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { ComponentsModule } from './components/components.module';
import { employeeComponent } from './employees/employee.component';
import {NgbPaginationModule, NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    employeeComponent,
  ],
  imports: [
    ComponentsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    FontAwesomeModule

  ],
  providers: [
    EmployeeService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
