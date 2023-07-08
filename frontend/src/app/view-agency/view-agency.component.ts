import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Router } from '@angular/router';
import { Agency } from '../model/agency';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'app-view-agency',
  templateUrl: './view-agency.component.html',
  styleUrls: ['./view-agency.component.css']
})
export class ViewAgencyComponent implements OnInit {

  constructor(private agencyService: AgencyService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    const agencyUsername = sessionStorage.getItem("viewAgency");
    if(agencyUsername != null){
      this.agencyService.getOne(agencyUsername).subscribe((agencyDB: Agency) =>{
        if(agencyDB) this.agency = agencyDB;
      });
    }
    const username = sessionStorage.getItem("client");
    
    if(username != null){
      this.clientService.getOne(username).subscribe((clientDB: Client) =>{
        if(clientDB) {
          this.client = clientDB;
          this.clientService.getAll().subscribe((clientsDB: Client[]) =>{
            if(clientsDB) this.clients = clientsDB;
          });
        }
      });
    } 
  }

  client: Client = null;
  agency: Agency = null;
  clients: Client[] = [];

  getImage(){
    return `http://localhost:4000/uploads/${this.agency.other.profilePicture}`;
  }

  getUserImage(user: string){
    let img: string = "";

    this.clients.forEach(client => {
      if(client.username == user){
        img = `http://localhost:4000/uploads/${client.other.profilePicture}`;
      }
    });

    return img;
  }  

  getDefaultImage(){
    return `http://localhost:4000/uploads/default.png`;
  }

  requestJob(){
    sessionStorage.setItem('requestAgency', this.agency.username);
    this.router.navigate(["request-job"]);
  }
}
