import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/project.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit{
  ProjectForm : FormGroup ;
  submitted = false;
  status : any=[];
  etat:any;
  project={
    name:'',
    status:'',
    start_date:'',
    end_date:''
  }
  constructor(private projService:ProjectService,private formBuilder: FormBuilder ) {
    this.readStatus()
    this.ProjectForm= this.formBuilder.group(
      {
        name: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],
        status: ['', Validators.required],
      });
  }
  ngOnInit(): void {
  }
  onSubmit(){
      const project={
        status:this.etat,
        name:this.project.name,
        start_date:this.project.start_date,
        end_date:this.project.end_date
      }
      this.projService.add(project).subscribe(
        (res)=>{
          console.log('Project successfully created')
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
            title: 'Project successfully created'
          })
          this.submitted=false;
          this.ProjectForm.reset();
        },(error)=>{
          console.log(error);
        }
      );
  }
  readStatus(){
    this.projService.getStatus().subscribe((data)=>{this.status=data;console.log(this.status);this.etat=this.status[0];console.log(this.etat)})
  }
}
