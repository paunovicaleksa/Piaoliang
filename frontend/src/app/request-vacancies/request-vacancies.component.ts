import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';
import { AgencyService } from '../services/agency.service';
import { Agency } from '../model/agency';

@Component({
  selector: 'app-request-vacancies',
  templateUrl: './request-vacancies.component.html',
  styleUrls: ['./request-vacancies.component.css']
})
export class RequestVacanciesComponent implements OnInit {

  constructor(private requestService: RequestService, private agencyService: AgencyService) { }

  ngOnInit(): void {
    this.agencyService.getOne(sessionStorage.getItem("agency")).subscribe((agencyDB: Agency) => {
      this.agency = agencyDB;
    });
  }

  vacancies: number = 0;
  agency: Agency;

  request(){
    if(this.vacancies > 0){
      this.requestService.addOne({agency: this.agency.username, vacancies: this.vacancies}, 'pending', 'vacancies').subscribe((m) => {
        if(m['msg'] == "success"){
          alert("Request sent!");
        }
      });
    }
  }
}
