import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements  OnInit{
  projects:any;
constructor(private http:HttpClient) {
}

  ngOnInit(): void {
  this.http.get("http://localhost:9999/project-service/projects?projection=fullProject").subscribe({
    next:(data)=>{
      this.projects=data;
    },
    error:(err)=>{}
  });
  }


}
