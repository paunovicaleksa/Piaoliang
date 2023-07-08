import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { AdminService } from '../services/admin.service';
import { RequestService } from '../services/request.service';
import { ForwardRefHandling } from '@angular/compiler';
import { Request } from '../model/request';
import { AgencyService } from '../services/agency.service';
import { ClientService } from '../services/client.service';
import { WorkerService } from '../services/worker.service';
import { JobService } from '../services/job.service';
import { Job } from '../model/job';
import { Worker } from '../model/worker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private requestService: RequestService, private jobService: JobService,
    private agencyService: AgencyService, private clientService: ClientService, private workerService: WorkerService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      if(adminDB) this.admin = adminDB;
      this.requestService.getAll().subscribe((requestsDB: Request[]) => {
        if(requestsDB) {
          this.requests = requestsDB.filter(request => request.status == "pending");
        }
      });
    });
  }

  requests: Request[] = [];
  admin: Admin = null;

  /* check for different cases, and update the database */
  accept(request: Request){
    switch(request.type){
      case "vacancies": {
        this.requestService.accept(request.id).subscribe((m) => {
          if(m['msg'] == 'success'){
            this.agencyService.addVacancies(request.other.agency, request.other.vacancies).subscribe((m) => {
              if(m['msg'] == 'success'){
                alert('Request accepted');
                this.ngOnInit();
              }
            });
          }
        });
        break;
      }
      case "cancellation": {
        this.requestService.accept(request.id).subscribe((m) => {
          if(m['msg'] == 'success'){
            this.jobService.updateOne(request.other.id, "cancelled", false, -1).subscribe((m) => {
              this.workerService.getAll().subscribe((workersDB: Worker[]) => {
                let workers = workersDB.filter(worker => worker.job == request.other.id);
                if(workers){
                  workers.forEach(worker => {
                    this.workerService.assignJob(worker.id, -1).subscribe((m) => {
                      if(m['msg'] == 'success' && worker == workers[workers.length - 1]){
                        alert('Request accepted');
                        this.ngOnInit()
                      }
                    });
                  });
                } else {
                  this.ngOnInit();
                }
              });
            });
          }
        });
        break;
      }
      case "registration": {
        this.requestService.accept(request.id).subscribe((m) => {
          if(m['msg'] == 'success'){
            switch(request.other.type){
              case "agency": {
                this.agencyService.setStatus(request.other.username, "approved").subscribe((m) => {
                  if(m['msg'] == 'success'){
                    alert('Request accepted');
                    this.ngOnInit();
                  }
                });
                break;
              }
              case "client": {
                this.clientService.setStatus(request.other.username, "approved").subscribe((m) => {
                  if(m['msg'] == 'success'){
                    alert('Request accepted');
                    this.ngOnInit();
                  }
                });
                break;
              }
            }
          }
        });    
        break;
      }
    }
  }

  reject(request: Request){
    this.requestService.reject(request.id).subscribe((m) => {
      if(m['msg'] == 'success'){
        alert('Request rejected');
        this.ngOnInit();
      }
    });
  }

  viewRequest(request: Request){
    sessionStorage.setItem("request", request.id.toString());
    this.router.navigate(['admin/request']);
  }
}
