import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import {HttpClientModule} from "@angular/common/http";
import { EmployeesComponent } from './employees/employees.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { ListAssignmentsComponent } from './assignments/list-assignments/list-assignments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
const keycloakAuth: any = {
  url: 'http://localhost:8185/auth',
  realm: 'wallet-realm',
  clientId: 'wallet-client',
  clientSecret: 'yioxRoXTUuCkxetGD31GxtpDyqToFjFB',
};
export function KcFactory(kcService:KeycloakService) {
  return ()=>{
    kcService.init({
      config:keycloakAuth,
      initOptions:{
        checkLoginIframe:true,
      //  pkceMethod: 'S256',
        onLoad:"check-sso",
      }
    })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    EmployeesComponent,
    AssignmentsComponent,
    TasksComponent,
    AddProjectComponent,
    AddEmployeeComponent,
    ListAssignmentsComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    KeycloakAngularModule
  ],
  providers: [
    {provide:APP_INITIALIZER,deps:[KeycloakService],useFactory:KcFactory,multi:true} ]
  // [KeycloakService]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
