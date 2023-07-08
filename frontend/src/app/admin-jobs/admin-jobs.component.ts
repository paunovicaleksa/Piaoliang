import { Component, OnInit } from '@angular/core';
import { Job } from '../model/job';
import { Admin } from '../model/admin';
import { AdminService } from '../services/admin.service';
import { JobService } from '../services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  constructor(private adminService: AdminService, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      if(adminDB) this.admin = adminDB;
      this.jobService.getAll().subscribe((jobsDB: Job[]) => {
        if(jobsDB) this.jobs = jobsDB;
        this.showJobs = this.jobs;
      });
    });
  }

  jobs: Job[] = [];
  showJobs: Job[] = [];
  admin: Admin;

  statuses: string[]= [
    "request",
    "accepted",
    "ready",
    "active",
    "rejected",
    "finished",
    "cancelled"
  ];

  statusSort: string;

  sortJobs(){
    this.showJobs = this.jobs.filter(job => job.status == this.statusSort);
  }

  viewJob(job){
    sessionStorage.setItem("job", job.id);
    this.router.navigate(['admin/view-job']);
  }
}
