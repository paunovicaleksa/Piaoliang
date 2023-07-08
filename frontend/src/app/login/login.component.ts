import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/client';
import { Agency } from '../model/agency';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private clientService: ClientService, private router:Router, private agencyService: AgencyService) { }

  ngOnInit(): void {
  }

  message: string = "";
  username: string;
  password: string;
  type: string = "";

  /* admin cannot login here, make sure to check this on backend */
  login(){
    if(this.type == "client"){
      this.clientService.login(this.username, this.password).subscribe((clientDB: Client) =>{
        if(clientDB){
          sessionStorage.setItem("client", clientDB.username);
          sessionStorage.setItem("loggedType", clientDB.type);
          this.router.navigate(['']);
        } else {
          alert("that user does not exist")
        }
      });
    } else if(this.type == "agency"){
      this.agencyService.login(this.username, this.password).subscribe((agencyDB: Agency) =>{
        if(agencyDB){
          sessionStorage.setItem("agency", agencyDB.username);
          sessionStorage.setItem("loggedType", agencyDB.type);
          this.router.navigate(['']);
        } else {
          alert("that user does not exist")
        }
      });
    } else{
      this.message = "please select user type";
    }
  }
}
