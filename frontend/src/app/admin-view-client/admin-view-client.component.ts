import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { Client } from '../model/client';
import { AdminService } from '../services/admin.service';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-client',
  templateUrl: './admin-view-client.component.html',
  styleUrls: ['./admin-view-client.component.css']
})
export class AdminViewClientComponent implements OnInit {

  constructor(private adminService: AdminService, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      this.admin = adminDB;
      this.clientService.getOne(sessionStorage.getItem("viewClient")).subscribe((clientDB: Client) => {
        this.client = clientDB;
        this.username = this.client.username;
        this.password = this.client.password;
        this.name = this.client.other.name;
        this.lastName = this.client.other.lastName;
        this.email = this.client.email;
        this.status = this.client.status;
        this.profilePictre = this.client.other.profilePicture;
      });
    });
  }

  admin: Admin = null;
  client: Client;
  removeImage: boolean = false;
  /* client stuff */
  username: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  status: string;
  profilePictre: string;

  getImage(){
    return `http://localhost:4000/uploads/${this.client.other.profilePicture}`;
  }

  save(){
    if(this.removeImage){
      this.client.other.profilePicture = 'default.png';
    }

    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?=.*[a-zA-Z])[a-zA-Z][\w!@#$%^&*()]{6,11}$/);
    /*  test this */
    if(!passwordRegex.test(this.password) || !emailRegex.test(this.email)){
      alert("Invalid email or password!");
    } else {
      this.clientService.modifyClient(this.username, this.password, this.name, this.lastName, this.email, this.status,
        this.client.other.profilePicture).subscribe((m) => {
          if(m['msg'] == 'success'){
            alert("Client modified successfully!");
            this.router.navigate(['/admin/clients']);
          }
      });
    }
  }

  remove(){
    this.clientService.delete(this.client.username).subscribe((m) => {
      if(m['msg'] == 'success'){
        alert("Client removed successfully!");
        this.router.navigate(['/admin/clients']);
      }
    });
  }
}
