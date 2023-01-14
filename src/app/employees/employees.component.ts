import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements  OnInit {
  employees:any
  constructor(private http:HttpClient,private router:Router) {
  }

  ngOnInit(): void {
    this.http.get("http://localhost:9999/employee-service/employees?projection=fullEmployee").subscribe({
      next:(data)=>{
        this.employees=data;
      },
      error:(err)=>{}
    });
  }

  getAssignments(c: any) {
    this.router.navigateByUrl("/assignments/"+c.id);

  }
}
