import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../services/task.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements  OnInit {
  alltasks: any
  assignmentId!: number
  faAdd=faAdd;
  faEdit=faEdit
  faTrash=faTrash
  tasks:any
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
    this.assignmentId = route.snapshot.params['assignmentId']
    this.readStatus()
    this.TaskForm= this.formBuilder.group(
      {
        description: ['', Validators.required],
        status: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required],

      });
    this.taskServ.listen().subscribe((m:any)=>{
      console.log(m);
      this.readTasks();

    })

  }

  ngOnInit(): void {
   this.readTasks()
  }

  onSubmit(){
    const task={
      description: this.task.description,
      status:this.etat,
      start_date:this.task.start_date,
      end_date:this.task.end_date
    }
    this.taskServ.add(task,this.assignmentId).subscribe(
      (res)=>{
        console.log('Task successfully added')
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
        this.taskServ.filter('register click');
        this.task.description='',
          this.task.start_date='',
          this.task.end_date=''

      },(error)=>{
        console.log(error);
      }
    );
  }
  readStatus(){
    this.taskServ.getStatus().subscribe((data)=>{this.status=data;console.log(this.status);this.etat=this.status[0];console.log(this.etat)})
  }
  readTasks(){
   this.http.get("http://localhost:9999/assignment-service/assignment/fullAssignment/" + this.assignmentId).subscribe({
      next: (data) => {
       this.alltasks = data;
       console.log(this.alltasks)
    },
    error: (err) => {
    }
  });
}

  removeTask(t: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You can\'t go back ! ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete ! ',
      timer: 30000,
    }).then((result : any) => {
      if (result.value) {
        this.taskServ.deleteTask(t);
        Swal.fire(
          'Deleted!',
          'Task has been removed.',
          'success'
        );
        this.taskServ.filter('register click');
      }

    }).catch(() => {
      Swal.fire('Echec!', 'There is something wrong.');
    });
  }
  editTask(t: any) {
    this.router.navigateByUrl("/task/edit/"+t.id);
  }
}
