import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ClientComponent } from './client/client.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { AgencyComponent } from './agency/agency.component';
import { SearchComponent } from './search/search.component';
import { ViewAgencyComponent } from './view-agency/view-agency.component';
import { ObjectsComponent } from './objects/objects.component';
import { AddObjectComponent } from './add-object/add-object.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ClientComponent,
    ForgottenComponent,
    AgencyComponent,
    SearchComponent,
    ViewAgencyComponent,
    ObjectsComponent,
    AddObjectComponent,
    WorkerComponent,
    AddWorkerComponent,
    RequestVacanciesComponent,
    ViewObjectComponent,
    ModifyObjectComponent,
    JobsComponent,
    RequestJobComponent,
    ViewJobComponent,
    AdminLoginComponent,
    AdminComponent,
    ViewRequestComponent,
    AdminAgenciesComponent,
    AdminClientsComponent,
    AdminViewClientComponent,
    AdminViewAgencyComponent,
    AdminJobsComponent,
    AdminViewJobComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
