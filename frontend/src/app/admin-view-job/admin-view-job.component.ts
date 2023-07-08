import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../services/job.service';
import { AdminService } from '../services/admin.service';
import { Admin } from '../model/admin';
import { Job } from '../model/job';
import { Obj } from '../model/obj';
import { ObjectService } from '../services/object.service';
import { Client } from '../model/client';
import { Agency } from '../model/agency';
import { ClientService } from '../services/client.service';
import { AgencyService } from '../services/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-job',
  templateUrl: './admin-view-job.component.html',
  styleUrls: ['./admin-view-job.component.css']
})
export class AdminViewJobComponent implements OnInit {
  @ViewChild('myCanvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;


  constructor(private jobService: JobService, private adminService: AdminService, private agencyService: AgencyService, 
    private objectService: ObjectService, private clientService: ClientService, private router:Router) { }

  ngOnInit(): void {
    this.adminService.getOne(sessionStorage.getItem("admin")).subscribe((adminDB: Admin) => {
      if(adminDB) this.admin = adminDB;
      this.jobService.getAll().subscribe((jobsDB: Job[]) => {
        if(jobsDB) this.job = jobsDB.filter(job => job.id.toString() == sessionStorage.getItem("job"))[0];
        this.objectService.getAll().subscribe((objectsDB: Obj[]) => {
          if(objectsDB) this.object = objectsDB.filter(obj => obj.id == this.job.object)[0];
          this.agencyService.getOne(this.job.agency).subscribe((agencyDB: Agency) => {
            if(agencyDB) this.jobAgency = agencyDB;
            this.clientService.getOne(this.job.client).subscribe((clientDB: Client) => {
              if(clientDB) this.jobClient = clientDB;
              this.ctx = this.canvasRef.nativeElement.getContext('2d');
              this.drawCanvas();
            });
          });
        });
      });
    });
  }

  admin: Admin;
  job: Job;
  object: Obj;
  jobClient: Client;
  jobAgency: Agency;

  ctx: CanvasRenderingContext2D;


  drawRoom(x: number, y: number, width: number, height: number, color: string, background: string) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = background;
    this.ctx.strokeRect(x, y, width, height);
    this.ctx.fillRect(x, y, width-2, height-2);
  }

  drawDoor(x: number, y: number, width: number, height: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawCanvas() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    
    this.object.rooms.forEach(room => {
      this.drawRoom(room.x, room.y, room.width, room.height, 'black', room.background);
    });

    this.object.doors.forEach(door => {
      this.drawDoor(door.x, door.y, door.width, door.height, 'brown');
    });
  }

  deleteJob(){
    this.jobService.deleteOne(this.job.id).subscribe((m) => {
      if(m['msg'] == "success"){
        alert("Job deleted");
        this.router.navigate(['admin/jobs']);
      }
    });
 
  }
}
