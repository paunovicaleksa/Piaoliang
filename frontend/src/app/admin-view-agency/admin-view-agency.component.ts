import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AgencyService } from '../services/agency.service';
import { Admin } from '../model/admin';
import { Agency } from '../model/agency';
import { Router } from '@angular/router';
import { Worker } from '../model/worker';
import { WorkerService } from '../services/worker.service';
import { RequestService } from '../services/request.service';
import { Request } from '../model/request';

@Component({
  selector: 'app-admin-view-agency',
  templateUrl: './admin-view-agency.component.html',
  styleUrls: ['./admin-view-agency.component.css']
})
export class AdminViewAgencyComponent implements OnInit {

  constructor(private adminService: AdminService, private agencyService: AgencyService, private requestService: RequestService, 
    private router: Router, private workerService: WorkerService) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      if(adminDB) this.admin = adminDB;
      this.agencyService.getOne(sessionStorage.getItem("viewAgency")).subscribe((agencyDB: Agency) => {
        if(agencyDB) this.agency = agencyDB;
        this.password = this.agency.password;
        this.agencyName = this.agency.other.name;
        this.email = this.agency.email;
        this.agencyNumber = this.agency.other.agencyNumber;
        this.agencyAddress = this.agency.other.address;
        this.status = this.agency.status;
        this.vacancies = this.agency.other.vacancies;
        this.workerService.getAll().subscribe((workersDB: Worker[]) => {
          if(workersDB) this.workers = workersDB.filter(worker => worker.agency == this.agency.username);
          this.requestService.getAll().subscribe((requestsDB: Request[]) => {
            if(requestsDB) this.requests = requestsDB.filter(request => request.other.agency == this.agency.username && request.status == "pending");
          });
        });
      });
    });
  }

  admin: Admin;
  agency: Agency;
  workers: Worker[];
  requests: Request[];
  toAdd: boolean = false;
  show: boolean = false;
  toShowRequest: boolean = false;
  /* adding worker */
  workerName: string;
  workerLastName: string;
  workerEmail: string;
  workerPhone: string;
  workerSpecialization: string;

  /* agency info */
  password: string;
  agencyName: string;
  email: string;
  agencyNumber: number;
  agencyAddress: string;
  status: string;
  removeImage: boolean = false;
  vacancies: number;



  save(){
    if(this.removeImage){
      this.agency.other.profilePicture = 'default.png';
    }

    this.agencyService.modifyAgency(this.agency.username, this.password, this.agencyNumber, this.agencyName, this.agencyAddress, 
      this.email, this.status, this.agency.other.profilePicture, this.vacancies).subscribe((m) => {
        if(m['msg'] == 'success'){
          alert("Agency modified successfully!");
          this.router.navigate(['/admin/agencies']);
        }
      });
  }

  getImage(){
    return `http://localhost:4000/uploads/${this.agency.other.profilePicture}`;
  }

  remove(){
    this.agencyService.delete(this.agency.username).subscribe((m) => {
      if(m['msg'] == 'success'){
        alert("Agency deleted successfully!");
        sessionStorage.removeItem("viewAgency");
        this.router.navigate(['/admin/agencies']);
      }
    });
  }

  removeWorker(worker: Worker){
    if(worker.job == -1){
      this.workerService.delete(worker.id).subscribe((m) => {
        if(m['msg'] == 'success'){
          alert("Worker deleted successfully!");
          this.ngOnInit();
        }
      });
    } else {
        alert("Worker cannot be deleted while on the job!");
    }
  }

  addWorker(){
    this.toAdd = !this.toAdd;
  }

  showRequests(){
    this.toShowRequest = !this.toShowRequest;
  }

  editWorker(worker: Worker){
    worker.checked = true;
  }

  saveWorker(worker: Worker){
    if(worker.email != null && worker.specialization != null  && worker.name != null && worker.lastName != null){
      this.workerService.modifyWorker(worker.id, worker.name, worker.lastName, worker.email, worker.phoneNumber, worker.specialization, 
        worker.agency, worker.job).subscribe((m) => {
          if(m['msg'] == 'success'){
            alert("Worker modified successfully!");
            this.ngOnInit();
          }
        });
    } else {
      alert("Please fill in all the fields!");
    }

  }

  isOccupied(worker: Worker){
    return worker.job != -1? 'occupied': 'free';
  }

  add(){
    this.workerService.addOne(this.workerName, this.workerLastName, this.workerEmail, this.workerPhone, 
      this.workerSpecialization, this.agency.username, -1).subscribe((m) => {
      if(m['msg'] == 'success'){
        alert("Worker added successfully!");
        this.toAdd = false;
        this.ngOnInit();
      }
    });
  }

  showWorkers(){
    this.show = !this.show;
  }
}
