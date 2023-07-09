import { Component, OnInit } from '@angular/core';
import { Agency } from '../model/agency';
import { Router } from '@angular/router';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private agencyService: AgencyService, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.agencyService.getAll().subscribe((agenciesDB: Agency[]) =>{
      this.agencies = agenciesDB.filter((agency) => agency.status == "approved");
    });

    const loggedType = sessionStorage.getItem("loggedType");
    if(loggedType == "client"){
      const username = sessionStorage.getItem("client");
    
      if(username != null){
        this.clientService.getOne(username).subscribe((clientDB: Client) =>{
          if(clientDB) this.client = clientDB;
        });
      } 
    } else if(loggedType == "agency"){
      const username = sessionStorage.getItem("agency");
      if(username != null){
        this.agencyService.getOne(username).subscribe((agencyDB: Agency) =>{
          if(agencyDB) this.agency = agencyDB;
        });
      }
    }

  }

  client: Client = null;
  agency: Agency = null;

  agencies: Agency[];
  name: string = "";
  address: string = "";

  search(){
    /* sort locally? i do want to go to a different page so i can show result, maybe i can reuse it later?*/
    const result: Agency[] = [];
    for(let agency of this.agencies){
      if(agency.other.name.toLowerCase().includes(this.name.toLowerCase()) && 
          agency.other.address.toLowerCase().includes(this.address.toLowerCase())){
        result.push(agency);
      }
    }
    if(result.length == 0){
      alert("no results found");
    } else{
      sessionStorage.setItem("searchResult", JSON.stringify(result));
      this.router.navigate(["search"]);
    }
  }

  getImage(agency: Agency){
    return `http://localhost:4000/uploads/${agency.other.profilePicture}`;
  }

  logOut(){
    sessionStorage.clear();
    this.ngOnInit();
  }
  view(agency: Agency){
    sessionStorage.setItem("viewAgency", agency.username);
    this.router.navigate(["view-agency"]);
  }
}
