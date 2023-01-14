import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, Subject, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  headers = new HttpHeaders().set('Content-Type','application/json');

  //ADD TASK
  add(data: any,id:any):Observable<any>{
    return this.http.post('http://localhost:9999/assignment-service/task/add/'+id,data);
  }

  //LISTE STATUS
  getStatus(){
    return this.http.get('http://localhost:9999/assignment-service/task/status');
  }
  //GET TASK
  getTask(id: any) {
    return this.http.get<any>('http://localhost:9999/assignment-service/task/get/' + id)
  }

  //EDIT TASK
  editTask(data : any):Observable<any>{
    let url='http://localhost:9999/assignment-service/task/edit';
    return this.http.put(url ,data);}

// DELETE TASK
  deleteTask( id : any) {
    this.http.delete('http://localhost:9999/assignment-service/task/delete/'+ id).subscribe(data => {
      console.log(data);
    });
  }
  private _listeners = new Subject<any>();
  listen():Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy:string){
    this._listeners.next(filterBy);
  }

  //error handling
  errorMgmt(error: HttpErrorResponse){
    let errorMessage='';
    if (error.error instanceof ErrorEvent){
      errorMessage =error.error.message;
    } else {
      errorMessage='Error code :${error.status} \n Message:${error.message}';
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
