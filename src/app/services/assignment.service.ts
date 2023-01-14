import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http:HttpClient) { }

  //ADD ASSIGNMENT
  add(data: any):Observable<any>{
    return this.http.post('http://localhost:9999/assignment-service/assignment/add',data);
  }
  //LISTE ASSIGNMENTS
  getAssignments(){
    return this.http.get('http://localhost:9999/assignment-service/assignment/AllAssignments');
  }
  private _listeners = new Subject<any>();
  listen():Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy:string){
    this._listeners.next(filterBy);
  }
}
