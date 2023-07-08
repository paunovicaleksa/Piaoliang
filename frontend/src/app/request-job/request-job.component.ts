import { Component, OnInit } from '@angular/core';
import { ClientComponent } from '../client/client.component';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service';
import { ObjectService } from '../services/object.service';
import { JobService } from '../services/job.service';
import { Obj } from '../model/obj';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-job',
  templateUrl: './request-job.component.html',
  styleUrls: ['./request-job.component.css']
})
export class RequestJobComponent implements OnInit {

  constructor(private clientService: ClientService, private objectService: ObjectService, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.agency = sessionStorage.getItem("viewAgency");
    this.clientService.getOne(sessionStorage.getItem("client")).subscribe((clientDB: Client) =>{
      if(clientDB) {
        this.client = clientDB;
        this.objectService.getAll().subscribe((objectsDB: Obj[]) =>{
          if(objectsDB){
            this.objects = objectsDB.filter(obj => obj.client == this.client.username);
          }
        });
      }
    });
  }

  agency: string;
  client: Client;
  objects: Obj[];
  selectedObject: Obj = null;

  requestJob(){
    if(this.selectedObject != null){
      this.jobService.addOne(this.agency, this.client.username, this.selectedObject.id).subscribe((m) =>{
        if(m['msg'] == "success"){
          alert("Job requested");
          this.router.navigate(['']);
        }
      });
    }else {
      alert("Please select an object");
    }
  }
}
