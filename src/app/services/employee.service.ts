import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  //ADD PROJECT
  add(data: any):Observable<any>{
    return this.http.post('http://localhost:9999/employee-service/employee/add',data);
  }
  //LISTE DEPARTEMENTS
  getDepartements(){
    return this.http.get('http://localhost:9999/employee-service/employee/depatements');
  }
  //LISTE EMPLOYEES
  getEmployees(){
    return this.http.get('http://localhost:9999/employee-service/employees?projection=fullEmployee');
  }
}
