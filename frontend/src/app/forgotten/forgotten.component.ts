import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html',
  styleUrls: ['./forgotten.component.css']
})
export class ForgottenComponent implements OnInit {

  constructor(private clientService: ClientService, private router: Router, private agencyService: AgencyService) { }

  ngOnInit(): void {
  }
  
  email: string;
  message: string = "";
  type: string = "";

  submit(){
    if(this.email != null && this.type != null){
      if(this.type == "client"){
        this.clientService.forgotten(this.email).subscribe((msg) => {
          if(msg['msg'] == "success"){
            alert("email sent");
            this.router.navigate(['login']);
          } else {
            this.message = "that email does not exist";
          }
        });

      } else if(this.type == "agency"){
        this.agencyService.forgotten(this.email).subscribe((msg) => {
          if(msg['msg'] == "success"){
            alert("email sent");
            this.router.navigate(['login']);
          } else {
            this.message = "that email does not exist";
          }
        });
      }
    }
    else {
      this.message = "please enter email and select user type";
    }
  }
}
