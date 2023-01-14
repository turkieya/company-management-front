import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  EmployeeForm : FormGroup ;
  submitted = false;
  departements : any=[];

  constructor(private empService:EmployeeService,private formBuilder: FormBuilder ) {
    this.readDepartemens();
    this.EmployeeForm= this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        tel: ['', Validators.required],
        departement: ['', Validators.required],
        poste: ['', Validators.required],
      });
  }
  ngOnInit(): void {
  }
  onSubmit(){
    this.submitted= true ;
    if(this.EmployeeForm.invalid)
    {return;}
    else{
      this.empService.add(this.EmployeeForm.value).subscribe(
        (res)=>{
          console.log('Employee successfully created')
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
            title: 'Employee successfully created'
          })
          this.submitted=false;
          this.EmployeeForm.reset();
        },(error)=>{
          console.log(error);
        }
      );

    }
  }

  readDepartemens(){
    this.empService.getDepartements().subscribe((data)=>{this.departements=data;console.log(this.departements)})
  }
}
