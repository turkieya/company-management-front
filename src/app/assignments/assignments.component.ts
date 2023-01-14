import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements  OnInit {
  assignments:any
  employeeId!:number
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) {
    this.employeeId=route.snapshot.params['employeeId']
  }

  ngOnInit(): void {
    this.http.get("http://localhost:9999/assignment-service/assignment/fullAssignmentByemp/"+this.employeeId).subscribe({
      next:(data)=>{
        this.assignments=data;
      },
      error:(err)=>{}
    });
  }

  getTasks(a: any) {
    this.router.navigateByUrl("/project-tasks/"+a.id);
  }
}
