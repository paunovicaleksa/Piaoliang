import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { AdminService } from '../services/admin.service';
import { Admin } from '../model/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
})
export class AdminClientsComponent implements OnInit {

  constructor(private clientService: ClientService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      if(adminDB) this.admin = adminDB;
      this.clientService.getAll().subscribe((clientsDB: any[]) => {
        if(clientsDB) {
          this.clients = clientsDB;
        }
      });
    });
  }

  admin: Admin;
  clients: any[] = [];

  view(client: any){
    sessionStorage.setItem("viewClient", client.username);
    this.router.navigate(['admin/view-client']);
  }

  getImage(client: any){
    return `http://localhost:4000/uploads/${client.other.profilePicture}`;
  }
}
