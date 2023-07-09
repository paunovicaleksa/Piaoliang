import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AgencyService } from '../services/agency.service';
import { ClientService } from '../services/client.service';
import { JobService } from '../services/job.service';
import { AdminService } from '../services/admin.service';
import { Admin } from '../model/admin';
import { Request } from '../model/request';
import { Worker } from '../model/worker';
import { WorkerService } from '../services/worker.service';
import { Router } from '@angular/router';
import { Job } from '../model/job';
import { Agency } from '../model/agency';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  constructor(private adminService: AdminService, private requestService: RequestService, private jobService: JobService,
    private agencyService: AgencyService, private clientService: ClientService, private workerService: WorkerService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      if(adminDB) this.admin = adminDB;
      this.requestService.getAll().subscribe((requestsDB: Request[]) => {
        if(requestsDB) {
          this.request = requestsDB.filter(request => request.id.toString() == sessionStorage.getItem("request"))[0];
          switch(this.request.type){
            case "vacancies": {
              this.agencyService.getOne(this.request.other.agency).subscribe((agencyDB: Agency) => {
                if(agencyDB) this.agency = agencyDB;
              });
              break;
            }
            case "cancellation": {
              this.jobService.getAll().subscribe((jobDB: Job[]) => {
                if(jobDB) this.job = jobDB.filter(job => job.id == this.request.other.id)[0];
              });
              break;
            }
            case "registration" : {
              //nothing.
            }
          }
        }
      });
    });
  }

  admin: Admin
  request: Request;
  /* type == cancellation, add viewJob maybe? */
  job: Job;

  /* type == vacancies? */
  agency: Agency

  accept(request: Request){
    switch(request.type){
      case "vacancies": {
        this.requestService.accept(request.id).subscribe((m) => {
          if(m['msg'] == 'success'){
            this.agencyService.addVacancies(request.other.agency, request.other.vacancies).subscribe((m) => {
              if(m['msg'] == 'success'){
                alert('Request accepted');
                this.router.navigate(['admin'])
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
                        this.router.navigate(['admin'])
                      }
                    });
                  });
                } else {
                  alert('Request accepted');
                  this.router.navigate(['admin'])
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
                    this.router.navigate(['admin'])
                  }
                });
                break;
              }
              case "client": {
                this.clientService.setStatus(request.other.username, "approved").subscribe((m) => {
                  if(m['msg'] == 'success'){
                    alert('Request accepted');
                    this.router.navigate(['admin'])
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
        this.router.navigate(['admin'])
      }
    });
  }

  viewJob(job){
    sessionStorage.setItem("job", job.id.toString());
    this.router.navigate(['admin/view-job']);
  }
}
