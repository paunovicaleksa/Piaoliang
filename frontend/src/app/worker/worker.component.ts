import { Component, OnInit } from '@angular/core';
import { Agency } from '../model/agency';
import { AgencyService } from '../services/agency.service';
import { WorkerService } from '../services/worker.service';
import { Worker } from '../model/worker';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  constructor(private agencyService: AgencyService, private workerService: WorkerService) { }

  ngOnInit(): void {
    this.agencyService.getOne(sessionStorage.getItem("agency")).subscribe((agencyDB: Agency) => {
      if(agencyDB) this.agency = agencyDB;
      this.workerService.getAll().subscribe((workersDB: Worker[]) => {
        if(workersDB) {
          this.workers = workersDB.filter(worker => worker.agency == this.agency.username);
        }
      });
    });
  }

  workers: Worker[] = [];
  agency: Agency = null;

  getImage(){
    return `http://localhost:4000/uploads/${this.agency.other.profilePicture}`;
  }

  isOccupied(worker: Worker){
    return worker.job != -1? 'occupied': 'free';
  }
}
