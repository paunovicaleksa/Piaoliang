import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../services/agency.service';
import { Agency } from '../model/agency';
import { WorkerService } from '../services/worker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrls: ['./add-worker.component.css']
})
export class AddWorkerComponent implements OnInit {

  constructor(private agencyService: AgencyService, private workerService: WorkerService, private router: Router) { }

  ngOnInit(): void {
    this.agencyService.getOne(sessionStorage.getItem("agency")).subscribe((agencyDB: Agency) => {
      if(agencyDB) this.agency = agencyDB;
    });
  }

  agency: Agency = null;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  specialization: string;
  message: string;
  

  addWorker(){
    if(this.name && this.lastName && this.phoneNumber && this.email){
      const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
      const phoneRegex = new RegExp("^[0-9]{9,10}$");

      if(!emailRegex.test(this.email)){
        this.message = "email is not valid";
        return;
      }

      if(!phoneRegex.test(this.phoneNumber)){
        this.message = "phone number is not valid";
        return;
      }

      this.workerService.addOne(this.name, this.lastName, this.email, 
        this.phoneNumber, this.specialization, this.agency.username, null).subscribe((m) => {
          if(m['msg'] == "success"){
            alert("success");
            this.router.navigate(["worker"]);
          } else {
            alert("error");
          }
        });
    }
    else this.message = "please fill all fields";
  }
}
