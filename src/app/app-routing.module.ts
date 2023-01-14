import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProjectsComponent} from "./projects/projects.component";
import {EmployeesComponent} from "./employees/employees.component";
import {AssignmentsComponent} from "./assignments/assignments.component";
import {TasksComponent} from "./tasks/tasks.component";
import {AddProjectComponent} from "./projects/add-project/add-project.component";
import {AddEmployeeComponent} from "./employees/add-employee/add-employee.component";
import {ListAssignmentsComponent} from "./assignments/list-assignments/list-assignments.component";
import {AuthGuard} from "./guards/security.guard";
import {EditTaskComponent} from "./tasks/edit-task/edit-task.component";

const routes: Routes = [
  {
    path:"projects",component:ProjectsComponent,
   canActivate:[AuthGuard],data:{roles:['employee']}
  },
  {
    path:"projects/add",component:AddProjectComponent,
   canActivate:[AuthGuard],data:{roles:['manager']}
  },
  {
    path:"employees",component:EmployeesComponent,
    canActivate:[AuthGuard],data:{roles:['employee']}
  },
  {
    path:"employees/add",component:AddEmployeeComponent,
   canActivate:[AuthGuard],data:{roles:['manager']}
  },
  {
    path:"assignments/:employeeId",component:AssignmentsComponent,
    canActivate:[AuthGuard],data:{roles:['employee']}
  },
  {
    path:"assignments",component:ListAssignmentsComponent,
    canActivate:[AuthGuard],data:{roles:['manager']}
  },
  {
    path:"project-tasks/:assignmentId",component:TasksComponent
  },
  {
    path:"task/edit/:id",component:EditTaskComponent,
    canActivate:[AuthGuard],data:{roles:['chef_equipe']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
