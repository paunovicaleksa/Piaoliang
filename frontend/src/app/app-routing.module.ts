import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ClientComponent } from './client/client.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { AgencyComponent } from './agency/agency.component';
import { SearchComponent } from './search/search.component';
import { ViewAgencyComponent } from './view-agency/view-agency.component';
import { AddObjectComponent } from './add-object/add-object.component';
import { ObjectsComponent } from './objects/objects.component';
import { WorkerComponent } from './worker/worker.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { RequestVacanciesComponent } from './request-vacancies/request-vacancies.component';
import { ViewObjectComponent } from './view-object/view-object.component';
import { ModifyObjectComponent } from './modify-object/modify-object.component';
import { JobsComponent } from './jobs/jobs.component';
import { RequestJobComponent } from './request-job/request-job.component';
import { ViewJobComponent } from './view-job/view-job.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { AdminAgenciesComponent } from './admin-agencies/admin-agencies.component';
import { AdminClientsComponent } from './admin-clients/admin-clients.component';
import { AdminViewClientComponent } from './admin-view-client/admin-view-client.component';
import { AdminViewAgencyComponent } from './admin-view-agency/admin-view-agency.component';
import { AdminJobsComponent } from './admin-jobs/admin-jobs.component';
import { AdminViewJobComponent } from './admin-view-job/admin-view-job.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "client", component: ClientComponent},
  {path: "forgotten", component: ForgottenComponent},
  {path: "agency", component: AgencyComponent},
  {path: "search", component: SearchComponent},
  {path: "view-agency", component: ViewAgencyComponent},
  {path: "add-object", component: AddObjectComponent},
  {path: "objects", component: ObjectsComponent},
  {path: "worker", component: WorkerComponent},
  {path: "add-workers", component: AddWorkerComponent},
  {path: "request-vacancies", component: RequestVacanciesComponent},
  {path: "viewObject", component: ViewObjectComponent},
  {path: "modify-object", component: ModifyObjectComponent},
  {path: "jobs", component: JobsComponent},
  {path: "request-job", component: RequestJobComponent},
  {path: "view-job", component: ViewJobComponent},
  {path: "admin/login", component: AdminLoginComponent},
  {path: "admin", component: AdminComponent},
  {path: "admin/request", component: ViewRequestComponent},
  {path: "admin/agencies", component: AdminAgenciesComponent},
  {path: "admin/clients", component: AdminClientsComponent},
  {path: "admin/view-client", component: AdminViewClientComponent},
  {path: "admin/view-agency", component: AdminViewAgencyComponent},
  {path: "admin/jobs", component: AdminJobsComponent},
  {path: "admin/view-job", component: AdminViewJobComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
