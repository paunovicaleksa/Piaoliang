import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
  }

  message: string = "";
  username: string;
  password: string;

  login(){ 
    this.adminService.login(this.username, this.password).subscribe((adminDB: any) =>{
      if(adminDB){
        sessionStorage.setItem("admin", adminDB.username);
        sessionStorage.setItem("loggedType", adminDB.type);
        this.router.navigate(['admin']);
      } else {
        alert("that user does not exist")
      }
    });
  }
}
