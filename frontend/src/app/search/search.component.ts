import { Component, OnInit } from '@angular/core';
import { Agency } from '../model/agency';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.agencies = JSON.parse(sessionStorage.getItem("searchResult"));
    const username = sessionStorage.getItem("client");
    
    if(username != null){
      this.clientService.getOne(username).subscribe((clientDB: Client) =>{
        if(clientDB) this.client = clientDB;
      });
    } 
  }

  client: Client = null;
  agencies: Agency[];
  sortBy: string = "";

  options = [
    "name-asc",
    "name-desc",
    "address-asc",
    "address-desc"
  ]

  getImage(agency: Agency){
    return `http://localhost:4000/uploads/${agency.other.profilePicture}`;
  }

  sort(){
    switch(this.sortBy){
      case "name-asc":
        this.agencies.sort((a, b) => a.other.name.localeCompare(b.other.name));
        break;
      case "name-desc":
        this.agencies.sort((a, b) => b.other.name.localeCompare(a.other.name));
        break;
      case "address-asc":
        this.agencies.sort((a, b) => a.other.address.localeCompare(b.other.address));
        break;
      case "address-desc":
        this.agencies.sort((a, b) => b.other.address.localeCompare(a.other.address));
        break;
    }
  }
}
