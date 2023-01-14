import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';
import {AssignmentService} from "../../services/assignment.service";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-list-assignments',
  templateUrl: './list-assignments.component.html',
  styleUrls: ['./list-assignments.component.css']
})
export class ListAssignmentsComponent {
  assignments:any
  AssignmentForm : FormGroup ;
  submitted = false;
  assignment={
    date:'',
    employeeId:'',
    projectId:''
  }
  mydate=new Date();
  allemployees : any=[];
  employeesId : any=[];
  projects : any=[];
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute,private formBuilder: FormBuilder,private assService:AssignmentService,private empService:EmployeeService) {
    this.AssignmentForm= this.formBuilder.group(
      {
        date: ['', Validators.required],
        employeeId: ['', Validators.required],
        projectId: ['', Validators.required],
      });
    this.assService.listen().subscribe((m:any)=>{
      console.log(m);
      this.readAsignments();

    })
  }

  ngOnInit(): void {
   this.readAsignments()
  }
  onSubmit(){
    const assignment={
      date:this.mydate,
      employeeId:this.assignment.employeeId,
      projectId:this.assignment.projectId
    }
    this.assService.add(assignment).subscribe(
      (res)=>{
        console.log('Assignment successfully added')
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Assignment successfully added'
        })
        this.submitted=false;
        this.assService.filter('register click');
        this.assignment.projectId='',
          this.assignment.employeeId=''

      },(error)=>{
        console.log(error);
      }
    );
  }

  getTasks(a: any) {
    this.router.navigateByUrl("/project-tasks/"+a.id);
  }
  /*readEmployees(){
    this.empService.getEmployees().subscribe((data)=>{
      this.allemployees=data;
      console.log(this.allemployees);
      console.log(this.allemployees[1]._embedded.employees.id);
      for (let i = 0; i < this.allemployees.length; i++) {
        this.employeesId[i]=this.allemployees[i]._embedded.employees.id;
        console.log(this.allemployees[i]._embedded.employees.id);
      }
      console.log(this.employeesId)

    })
  }*/

  readAsignments(){
    this.assService.getAssignments().subscribe((data)=>{
      this.assignments=data; })
  }
}
