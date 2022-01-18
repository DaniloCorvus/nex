import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployee() {
    return this.http.get(`${environment.base_url}/employees`)
  }

  getAreas() {
    return this.http.get(`${environment.base_url}/areas`)
  }
  getRoles() {
    return this.http.get(`${environment.base_url}/roles`)
  }

  getEmployeeForSelects() {
    return this.http.get(`${environment.base_url}/employees-for-select`)
  }

  createNewEmployee(data: any) {
    return this.http.post(`${environment.base_url}/employees`, data);
  }

  updateEmployee(data: any) {
    return this.http.patch(`${environment.base_url}/employees/` + data['id'], data);
  }

  deleteEmployee(data: any) {
    return this.http.delete(`${environment.base_url}/employees/` + data['id']);
  }

}
