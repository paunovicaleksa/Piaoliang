import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../services/agency.service';
import { Agency } from '../model/agency';
import { Admin } from '../model/admin';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-agencies',
  templateUrl: './admin-agencies.component.html',
  styleUrls: ['./admin-agencies.component.css']
})
export class AdminAgenciesComponent implements OnInit {

  constructor(private agencyService: AgencyService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      if(adminDB) this.admin = adminDB;
      this.agencyService.getAll().subscribe((agenciesDB: Agency[]) => {
        if(agenciesDB) {
          this.agencies = agenciesDB;
        }
      });
    });
  }

  admin: Admin = null;
  agencies: Agency[] = [];

  view(ag: Agency){
    sessionStorage.setItem("viewAgency", ag.username);
    this.router.navigate(['admin/view-agency']);
  }

  getImage(agency: Agency){
    return `http://localhost:4000/uploads/${agency.other.profilePicture}`;
  }
}
