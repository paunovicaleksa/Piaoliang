import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';
import { Router } from '@angular/router';
import { ObjectService } from '../services/object.service';
import { Obj } from '../model/obj';
import { Client } from '../model/client';
import { Agency } from '../model/agency';
import { Job } from '../model/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  constructor(private jobService: JobService, private clientService: ClientService,
       private agencyService: AgencyService, private router: Router, private objectService: ObjectService) { }

  ngOnInit(): void {
    switch(sessionStorage.getItem("loggedType")){
      case "client":
        this.clientService.getOne(sessionStorage.getItem("client")).subscribe((clientDB: Client) => {
          this.client = clientDB;
          this.jobService.getAll().subscribe((jobsDB: Job[]) => {
            this.jobs = jobsDB;
            this.jobs = this.jobs.filter(job => job.client == this.client.username);
            this.showJobs = this.jobs;
          });
        });
        break;
      case "agency":
        this.agencyService.getOne(sessionStorage.getItem("agency")).subscribe((agencyDB: Agency) => {
          this.agency = agencyDB;
          this.jobService.getAll().subscribe((jobsDB: Job[]) => {
            this.jobs = jobsDB;
            this.jobs = this.jobs.filter(job => job.agency == this.agency.username);
            this.showJobs = this.jobs;
          });
        });
        break;
    }
  }

  client: Client = null;
  agency: Agency = null;
  jobs: Job[] = [];
  showJobs: Job[] = [];

  statuses: string[]= [
    "request",
    "accepted",
    "ready",
    "active",
    "rejected",
    "finished",
    "cancelled"
  ]

  statusSort: string;

  sortJobs(){
    this.showJobs = this.jobs.filter(job => job.status == this.statusSort);
  }

  viewJob(job: Job){
    sessionStorage.setItem("job", JSON.stringify(job.id));
    this.router.navigate(["view-job"]);
  }
}
