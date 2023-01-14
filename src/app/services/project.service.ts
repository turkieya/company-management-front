import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  //ADD PROJECT
  add(data: any):Observable<any>{
    return this.http.post('http://localhost:9999/project-service/project/add',data);
  }

  //LISTE STATUS
  getStatus(){
    return this.http.get('http://localhost:9999/project-service/project/status');
  }

}
