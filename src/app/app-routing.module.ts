import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { employeeComponent } from './employees/employee.component';



const routes: Routes = [
  { path: 'employees', component: employeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


