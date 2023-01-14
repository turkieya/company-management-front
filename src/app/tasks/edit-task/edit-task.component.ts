import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  TaskForm : FormGroup ;
  task={
    description:'',
    status:'',
    start_date:'',
    end_date:''
  }
  status : any=[];
  etat:any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,private formBuilder: FormBuilder,private taskServ:TaskService) {
    this.readStatus()
    this.TaskForm= this.formBuilder.group(
      {
        description: ['', Validators.required],
        status: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],

      });
    let  id = this.route.snapshot.paramMap.get('id');
    this.getTask(id);
  }
  getTask(id:any){
    this.taskServ.getTask(id).subscribe(data=> {
      this.TaskForm.patchValue({
          description: data['description'],
          status: data['status'],
          start_date: data['start_date'],
          end_date: data['end_date']
        })
    })
  }

  readStatus(){
    this.taskServ.getStatus().subscribe((data)=>{this.status=data;console.log(this.status);this.etat=this.status[0];console.log(this.etat)})
  }

  onSubmit(){
    const task={
      description: this.task.description,
      status:this.task.status,
      start_date:this.task.start_date,
      end_date:this.task.end_date
    }
    this.taskServ.editTask(task).subscribe(
      (res)=>{
        this.router.navigateByUrl('/assignments');
        console.log('content updated successfully!')
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
          title: 'Task successfully added'
        })
        this.task.description='',
          this.task.start_date='',
          this.task.end_date=''

      },(error)=>{
        console.log(error);
      }
    );
  }
}
